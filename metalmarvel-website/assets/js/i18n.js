/* Finnish/English switching, shared by every page.

   The chosen language is remembered so it survives navigation between pages —
   without this, clicking through to another page silently reverted the visitor
   to Finnish. */

import { privacyDocument } from './privacy-content.js';

const STORAGE_KEY = 'mm-lang';
const LANGS = ['fi', 'en'];

/* Strings that appear in the nav and footer of every page. Page-specific strings
   are passed in by the page's own entry module and merged over these. */
const COMMON = {
    fi: {
        nav_home: 'ETUSIVU',
        nav_welding: 'PALVELUT',
        nav_supervision: 'VALVONTA',
        nav_about: 'MEISTÄ',
        nav_cta: 'PYYDÄ TARJOUS',
        footer_description: 'TEOLLISUUDEN JA RAKENTAMISEN KUMPPANI YLI 30 VUODEN KOKEMUKSELLA',
        footer_col1_title: 'HYÖDYLLISTÄ',
        footer_col3_title: 'YHTEYSTIEDOT',
        footer_copy: '© 2026 Metal Marvel Oy. Kaikki oikeudet pidätetään.',
        footer_y_tunnus: 'Y-tunnus: 3417840-5',
        footer_address: 'Tampereentie 2575, 66470 JUKAJA',
        footer_privacy: 'TIETOSUOJASELOSTE',
        privacy_title: 'TIETOSUOJASELOSTE',
        /* The full statement, swapped by the same toggle as everything else.
           Authored in privacy-content.js, which is why it is safe as innerHTML. */
        privacy_body: privacyDocument.fi
    },
    en: {
        nav_home: 'HOME',
        nav_welding: 'SERVICES',
        nav_supervision: 'SUPERVISION',
        nav_about: 'ABOUT US',
        nav_cta: 'REQUEST A QUOTE',
        footer_description: 'YOUR PARTNER IN INDUSTRY AND CONSTRUCTION WITH OVER 30 YEARS OF EXPERIENCE',
        footer_col1_title: 'USEFUL LINKS',
        footer_col3_title: 'CONTACT INFO',
        footer_copy: '© 2026 Metal Marvel Oy. All rights reserved.',
        footer_y_tunnus: 'Business ID: 3417840-5',
        footer_address: 'Tampereentie 2575, 66470 JUKAJA, Finland',
        footer_privacy: 'PRIVACY POLICY',
        privacy_title: 'PRIVACY POLICY',
        privacy_body: privacyDocument.en
    }
};

/* Storage contents are attacker-controllable in principle, so the stored value is
   validated against the known set rather than used directly. */
function readStoredLang() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return LANGS.includes(stored) ? stored : null;
    } catch {
        return null;
    }
}

function storeLang(lang) {
    try {
        localStorage.setItem(STORAGE_KEY, lang);
    } catch {
        /* Private browsing or storage disabled — the toggle still works for this
           page view, it just will not be remembered. */
    }
}

/**
 * @param {{ strings: {fi: object, en: object}, titles: {fi: string, en: string} }} config
 */
export function initI18n({ strings, titles }) {
    const dict = {
        fi: { ...COMMON.fi, ...strings.fi },
        en: { ...COMMON.en, ...strings.en }
    };

    const toggle = document.getElementById('lang-toggle');
    let current = readStoredLang() ?? 'fi';

    function apply(lang) {
        current = lang;
        document.documentElement.lang = lang;
        document.title = titles[lang];

        for (const el of document.querySelectorAll('[data-key]')) {
            const value = dict[lang][el.dataset.key];
            if (value === undefined) continue;
            /* These strings are authored in this file, not supplied by anyone, so
               the few that carry markup (<br>, <span>) are written as HTML. Plain
               strings go through textContent so the HTML sink stays as narrow as
               possible. */
            if (value.includes('<')) el.innerHTML = value;
            else el.textContent = value;
        }

        for (const el of document.querySelectorAll('[data-key-alt]')) {
            const value = dict[lang][el.dataset.keyAlt];
            if (value !== undefined) el.alt = value;
        }

        if (toggle) {
            toggle.textContent = lang === 'fi' ? 'EN' : 'FI';
            toggle.setAttribute(
                'aria-label',
                lang === 'fi' ? 'Switch language to English' : 'Vaihda kieleksi suomi'
            );
        }
    }

    apply(current);

    toggle?.addEventListener('click', () => {
        const next = current === 'fi' ? 'en' : 'fi';
        apply(next);
        /* Written only on an explicit click. A visitor who never touches the
           toggle leaves nothing in storage at all. */
        storeLang(next);
    });
}
