/* Vercel Web Analytics Section & Subpage Tracking Module
   Tracks section pageviews (/palvelut, /meista, /yhteystiedot) and subpages (/valvonta, /)
   directly in the Vercel Analytics dashboard without any custom events. */

const _trackedPaths = new Set();

/**
 * Reports a pageview to Vercel Web Analytics once per session/view.
 * @param {string} path
 */
export function trackPageview(path) {
    const normalized = path === '/index.html' ? '/' : path;
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
    const initialPath = window.location.pathname.replace(/\/index\.html$/, '') || '/';
    trackPageview(initialPath);

    // If landing directly on a clean section route (e.g. /meista, /palvelut, /yhteystiedot),
    // smooth scroll to the target section after DOM is ready. Skipped when the URL
    // already carries a hash — e.g. index.html#hitsaus-ja-asennustyot — since that
    // hash may point at a different section than this route's own target (the '/'
    // route's target is 'hero'), and index.js's correctHashLanding already owns
    // getting hash-based landings to the right place.
    const landingRoute = !location.hash && routes.find((r) => r.path === initialPath && r.id);
    if (landingRoute) {
        window.addEventListener('DOMContentLoaded', () => {
            const target = document.getElementById(landingRoute.id);
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        });
    }

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const match = routes.find((r) => r.id === entry.target.id);
                    if (match) {
                        trackPageview(match.path);
                    }
                }
            }
        },
        { threshold: 0.35 }
    );

    for (const route of routes) {
        if (!route.id) continue;
        const el = document.getElementById(route.id);
        if (el) observer.observe(el);
    }
}
