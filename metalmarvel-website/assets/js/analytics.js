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
    // smooth scroll to the target section after DOM is ready. A URL that already
    // carries a hash (e.g. index.html#meista, used by the nav and footer links)
    // has its own scroll target and must be left alone — otherwise every hash
    // link would match the '/' route and get dragged back to the hero section.
    const landingRoute = !window.location.hash && routes.find((r) => r.path === initialPath && r.id);
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
