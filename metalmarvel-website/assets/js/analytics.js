/* Vercel Web Analytics & Section Routing Module
   Provides deduplicated section-level and subpage pageview tracking
   as well as conversion event tracking (phone clicks, emails, CTA requests). */

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
 * Reports a custom event to Vercel Web Analytics.
 * @param {string} name
 * @param {object} [data]
 */
export function trackEvent(name, data = {}) {
    if (typeof window.va === 'function') {
        window.va('event', { name, ...data });
    }
}

/**
 * Attaches scroll-based section tracking for single-page sections.
 * @param {Array<{path: string, id: string}>} routes
 */
export function initSectionTracking(routes) {
    const initialPath = window.location.pathname.replace(/\/index\.html$/, '') || '/';
    trackPageview(initialPath);

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
        { threshold: 0.3 }
    );

    for (const route of routes) {
        if (!route.id) continue;
        const el = document.getElementById(route.id);
        if (el) observer.observe(el);
    }
}

/**
 * Attaches conversion listeners (phone calls, email clicks, CTA submissions).
 */
export function initConversionTracking() {
    document.addEventListener('click', (event) => {
        const target = event.target.closest('a, button');
        if (!target) return;

        const href = target.getAttribute('href') || '';

        if (href.startsWith('tel:')) {
            trackEvent('click_phone', { phone: href.replace('tel:', '') });
        } else if (href.startsWith('mailto:')) {
            trackEvent('click_email', { email: href.replace('mailto:', '') });
        } else if (
            target.classList.contains('nav-cta') ||
            target.classList.contains('card-cta') ||
            target.classList.contains('btn-primary')
        ) {
            trackEvent('click_quote_cta', { text: target.textContent.trim(), href });
        } else if (target.classList.contains('fb-icon')) {
            trackEvent('click_social_facebook');
        } else if (target.classList.contains('ig-icon')) {
            trackEvent('click_social_instagram');
        }
    }, { passive: true });
}
