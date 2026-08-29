/* Vercel Web Analytics Section & Subpage Tracking Module
   Tracks section pageviews (/palvelut, /meista, /yhteystiedot) and subpages (/valvonta, /)
   directly in the Vercel Analytics dashboard without any custom events.

   This module owns EVERY pageview the site reports, including the one for the
   landing path. That only holds because the insights script is loaded with
   data-disable-auto-track="1" in index.html and valvonta.html — drop that
   attribute and the script counts the landing view a second time, which makes
   every session at least two pageviews and reports the bounce rate as 0%. */

const _trackedPaths = new Set();

/**
 * Reduces a URL path to the single canonical form used in the dashboard.
 *
 * The site is served with cleanUrls, so the canonical path never carries a
 * .html extension. Normalising only '/index.html' was not enough: a landing on
 * /valvonta.html reported '/valvonta.html' while the section observer reported
 * '/valvonta', so one visit counted as two pageviews under two separate rows —
 * and, being two, could never be counted as a bounce.
 * @param {string} raw
 * @returns {string}
 */
function normalizePath(raw) {
    let path = raw.replace(/\.html$/, '');
    if (path.endsWith('/index')) path = path.slice(0, -'index'.length);
    if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
    return path || '/';
}

/**
 * Reports a pageview to Vercel Web Analytics once per session/view.
 * @param {string} path
 */
export function trackPageview(path) {
    const normalized = normalizePath(path);
    if (_trackedPaths.has(normalized)) return;
    _trackedPaths.add(normalized);
    if (typeof window.va === 'function') {
        window.va('pageview', { path: normalized });
    }
}

/**
 * Attaches scroll-based section tracking for single-page sections.
 * @param {Array<{path: string, id: string}>} routes
 */
export function initSectionTracking(routes) {
    const initialPath = normalizePath(window.location.pathname);
    trackPageview(initialPath);

    // If landing directly on a clean section route (e.g. /meista, /palvelut, /yhteystiedot),
    // smooth scroll to the target section after DOM is ready. Skipped when the URL
    // already carries a hash — e.g. index.html#hitsaus-ja-asennustyot — since that
    // hash may point at a different section than this route's own target (the '/'
    // route's target is 'hero'), and index.js's correctHashLanding already owns
    // getting hash-based landings to the right place.
    const landingRoute = !location.hash && routes.find((r) => r.path === initialPath && r.id);
    let landingScrollSettled = Promise.resolve();
    if (landingRoute) {
        landingScrollSettled = new Promise((settled) => {
            window.addEventListener('DOMContentLoaded', () => {
                const target = document.getElementById(landingRoute.id);
                if (!target) {
                    settled();
                    return;
                }
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth' });
                    /* scrollend is the precise signal but is not in Safari yet,
                       so a timer backs it up; whichever lands first wins. */
                    const done = () => settled();
                    window.addEventListener('scrollend', done, { once: true });
                    setTimeout(done, 1500);
                }, 100);
            });
        });
    }

    if (!('IntersectionObserver' in window)) return;

    /* A section counts only once the visitor has settled on it for DWELL_MS.
       Both the landing hand-off above and an ordinary nav click animate a smooth
       scroll that sweeps the band across every section in between, and each one
       reported a pageview on the way past: landing on /yhteystiedot also
       reported '/', '/palvelut' and '/meista'. Those credit sections nobody
       stopped to read, and they leave no visit with fewer than two pageviews,
       so the bounce rate cannot recover. A fly-past holds the band for a few
       tens of milliseconds and is discarded; a section being read holds it
       indefinitely. This also covers nav clicks, which scroll natively via CSS
       scroll-behavior and so expose no JS hook to suppress. */
    const DWELL_MS = 400;
    const pending = new Map();

    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                const match = routes.find((r) => r.id === entry.target.id);
                if (!match) continue;

                if (entry.isIntersecting) {
                    if (pending.has(match.path)) continue;
                    pending.set(
                        match.path,
                        setTimeout(() => {
                            pending.delete(match.path);
                            trackPageview(match.path);
                        }, DWELL_MS)
                    );
                } else {
                    clearTimeout(pending.get(match.path));
                    pending.delete(match.path);
                }
            }
        },
        /* A ratio threshold is measured against the TARGET's area, not the
           viewport's, so it is unreachable for any section taller than the
           viewport by more than 1/threshold. #hitsaus-ja-asennustyot is ~4500px
           against a 900px viewport — it peaked at ratio 0.20 and never once
           reported /palvelut. Instead, collapse the viewport to a thin band
           across its middle and fire when a section crosses that band: the
           trigger is then a function of scroll position alone and behaves
           identically for a short section and a very tall one. The band is left
           a few percent tall rather than collapsed to exactly 0: a zero-height
           root rect makes every intersection zero-area, which browsers do not
           agree on reporting as an intersection at all. */
        { rootMargin: '-48% 0px -48% 0px', threshold: 0 }
    );

    /* Observation waits out the landing scroll above. The hero sits in the band
       for the whole DOMContentLoaded + 100ms delay before that scroll even
       starts, which is long enough to clear DWELL_MS on a slow load — so a
       visitor arriving on /palvelut was credited a '/' pageview they never
       asked for, and got two pageviews for a single-section visit. Nothing is
       observed until the page has come to rest on the section that was actually
       requested; that section's own pageview is already reported above. */
    landingScrollSettled.then(() => {
        for (const route of routes) {
            if (!route.id) continue;
            const el = document.getElementById(route.id);
            if (el) observer.observe(el);
        }
    });
}
