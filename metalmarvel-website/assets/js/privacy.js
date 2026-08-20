/* Tietosuojaseloste / privacy policy panel — shared by every page.

   The panel is built here rather than written into index.html and valvonta.html
   because it is a legal text: two hand-maintained copies would eventually drift
   apart. The document itself lives in privacy-content.js, and i18n.js swaps the
   FI and EN versions through the normal data-key mechanism.

   It is a native <dialog> opened with showModal(). That buys three things a
   hand-rolled overlay would have to reimplement: it renders in the top layer, so
   it clears the fixed nav (z-index 1000) and the mobile drawer (1050) without
   joining that arms race; focus is contained inside it while open and handed
   back to the trigger on close; and Escape is wired up by the UA.

   The slide-down is driven by an .active class rather than by [open], because
   the UA toggles `display` with [open] and an element going straight from
   display: none to display: flex cannot transition. .active is added one frame
   after opening and removed one transition before closing. */

import { privacyDocument } from './privacy-content.js';

function buildPanel() {
    const dialog = document.createElement('dialog');
    dialog.id = 'privacy-panel';
    dialog.className = 'privacy-dialog';
    dialog.setAttribute('aria-labelledby', 'privacy-panel-title');

    dialog.innerHTML = `
        <div class="privacy-head">
            <h2 class="privacy-title" id="privacy-panel-title" data-key="privacy_title">TIETOSUOJASELOSTE</h2>
            <button type="button" class="privacy-close" aria-label="Sulje tietosuojaseloste">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true">
                    <line x1="6" y1="6" x2="18" y2="18"/>
                    <line x1="18" y1="6" x2="6" y2="18"/>
                </svg>
            </button>
        </div>
        <div class="privacy-body">
            <div class="privacy-content" data-key="privacy_body"></div>
        </div>
    `;

    /* Seeded with the Finnish text so the panel is never empty, even if i18n
       fails to run; initI18n() replaces this on the very next line of the page's
       entry module, and again on every language toggle. */
    dialog.querySelector('.privacy-content').innerHTML = privacyDocument.fi;

    document.body.appendChild(dialog);
    return dialog;
}

/**
 * Wires up the footer trigger(s) and appends the panel to the document.
 *
 * Call this before initI18n() — the panel carries [data-key] nodes of its own,
 * and i18n only translates what is already in the DOM when it runs.
 */
export function initPrivacyPanel() {
    const triggers = document.querySelectorAll('[data-privacy-open]');
    if (triggers.length === 0) return;

    const dialog = buildPanel();
    const closeBtn = dialog.querySelector('.privacy-close');
    const body = dialog.querySelector('.privacy-body');

    /* The panel spends ~450ms sliding out while still [open], so "is it closing?"
       is a third state alongside open and closed. `closeToken` invalidates the
       watchers of a slide-out that a reopen has overtaken — without it, the
       pending dialog.close() would fire against the freshly reopened panel. */
    let closing = false;
    let closeToken = 0;
    let stopWatchingClose = null;

    function setTriggerState(expanded) {
        for (const trigger of triggers) {
            trigger.setAttribute('aria-expanded', String(expanded));
        }
    }

    setTriggerState(false);

    function abandonPendingClose() {
        closeToken += 1;
        stopWatchingClose?.();
        stopWatchingClose = null;
        closing = false;
    }

    function open() {
        abandonPendingClose();

        /* The nav drawer has no backdrop, so the footer trigger stays clickable
           while it is open. Closing it through its own toggle keeps the drawer's
           aria-expanded and body.no-scroll in step — both modules use that one
           class, and whichever closed last would otherwise clear it. */
        const navToggle = document.getElementById('mobile-menu-toggle');
        if (navToggle?.getAttribute('aria-expanded') === 'true') navToggle.click();

        if (!dialog.open) {
            dialog.showModal();
            body.scrollTop = 0;
        }
        document.body.classList.add('no-scroll');
        setTriggerState(true);

        /* showModal() flips display from none to flex. Reading a layout property
           forces that to be committed before .active lands, so the browser has a
           previous value to animate the transform away from. */
        void dialog.offsetHeight;
        dialog.classList.add('active');
    }

    function close() {
        if (!dialog.open || closing) return;
        closing = true;
        const token = ++closeToken;

        dialog.classList.remove('active');
        setTriggerState(false);
        document.body.classList.remove('no-scroll');

        /* Wait for the slide-up before dialog.close() takes the element out of
           the top layer, otherwise it vanishes instantly. The timer is a backstop
           for the cases where transitionend never arrives (a transition cancelled
           mid-flight, or a browser that ignores the transform entirely). */
        function finish() {
            if (token !== closeToken) return; // A reopen got here first.
            stopWatchingClose?.();
            stopWatchingClose = null;
            closing = false;
            if (dialog.open) dialog.close();
        }

        const onEnd = (event) => {
            if (event.target === dialog && event.propertyName === 'transform') finish();
        };
        const timer = setTimeout(finish, 600);

        stopWatchingClose = () => {
            dialog.removeEventListener('transitionend', onEnd);
            clearTimeout(timer);
        };
        dialog.addEventListener('transitionend', onEnd);
    }

    for (const trigger of triggers) {
        trigger.addEventListener('click', () => {
            /* Mid-slide-out the panel is still [open]; treat the trigger as a
               request to bring it back rather than as a second close. */
            if (dialog.open && !closing) close();
            else open();
        });
    }

    closeBtn.addEventListener('click', close);

    /* Clicks on ::backdrop are dispatched to the dialog itself; anything inside
       the panel is reported against one of its children. */
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) close();
    });

    /* Escape would close instantly and skip the animation, so take it over. */
    dialog.addEventListener('cancel', (event) => {
        event.preventDefault();
        close();
    });

    /* Belt and braces: if anything closes the dialog by another route, make sure
       the page is left scrollable and the trigger is not stuck on "expanded".

       dialog.close() fires this from a queued task rather than synchronously, so
       it can be delivered after the panel has been reopened. Acting on it then
       would strip .active off an open panel and leave it parked off-screen with
       nothing to bring it back. */
    dialog.addEventListener('close', () => {
        if (dialog.open) return;
        dialog.classList.remove('active');
        document.body.classList.remove('no-scroll');
        setTriggerState(false);
        closing = false;
    });
}
