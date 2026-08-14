/* Nav drawer and scroll reveals — shared by every page. */

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/**
 * Mobile nav drawer.
 *
 * The drawer is a fixed panel parked off-screen at right: -100%. CSS also gives
 * it visibility: hidden while closed, which is what actually keeps its links out
 * of the tab order — off-screen alone does not.
 */
export function initNav() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('nav-links');
    if (!toggle || !drawer) return;

    function setOpen(open) {
        toggle.setAttribute('aria-expanded', String(open));
        drawer.classList.toggle('active', open);
        document.body.classList.toggle('no-scroll', open);
    }

    setOpen(false);

    toggle.addEventListener('click', () => {
        setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    for (const link of drawer.querySelectorAll('a')) {
        link.addEventListener('click', () => setOpen(false));
    }

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        if (toggle.getAttribute('aria-expanded') !== 'true') return;
        setOpen(false);
        /* Send focus back to the control that opened the drawer, otherwise it is
           left on an element that is now visibility: hidden. */
        toggle.focus();
    });
}

/** Fades sections in as they scroll into view. */
export function initReveal() {
    const targets = document.querySelectorAll('.reveal');
    if (reducedMotion.matches) return;

    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    for (const el of targets) {
        const rect = el.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
            el.classList.add('reveal-init');
            observer.observe(el);
        }
    }
}
        { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    for (const el of targets) observer.observe(el);
}
