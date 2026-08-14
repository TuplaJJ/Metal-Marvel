/* Valvonta (supervision) page entry module. */

import { initI18n } from './i18n.js';
import { initNav, initReveal } from './ui.js';
import { initGlobe } from './globe.js';
import { initSectionTracking } from './analytics.js';

const strings = {
    fi: {
        valvonta_hero_title: 'ASENNUS- JA TYÖNJOHTO',
        valvonta_hero_desc: 'Tarjoamme asennusvalvontaa, työnjohtoa sekä projektien koordinointia mekaanisissa asennuksissa, kunnossapidossa ja projektitoteutuksissa. Lisäksi huolehdimme hitsauksen laadunvarmistuksesta sekä projektien edellyttämästä dokumentoinnista.<br><br>Työnjohtomme on HSE-peruskoulutettu, ja turvallinen työskentely on olennainen osa jokaisen projektin toteutusta.',
        valvonta_content_title: 'VALVONTATYÖT POHJANMAALTA KÄSIN YMPÄRI MAAILMAA',
        valvonta_p1: 'Metal Marvel Oy on asennus- ja hitsaustöiden valvontaan sekä hitsaustöiden laadunvalvontaan erikoistunut yritys. Toimimme alueella Vaasa, Alajärvi, Kauhava, Seinäjoki, Kurikka, Ähtäri, Alavus, Lapua, Pietarsaari, Uusikaarlepyy, Kristiinankaupunki, Kaskinen sekä koko Suomi ja ulkomaat. Kohteitamme ulkomailla on ollut seuraavissa valtioissa: Alankomaat, Arabiemiirikunnat, Argentiina, Bahama, Barbados, El Salvador, Englanti, Etelä-Afrikka, Irlanti, Italia, Meksiko, Mosambik, Nigeria, Norja, Panama, Ranska, Ruotsi, Saksa, Tanska, Togo sekä Venäjä.',
        valvonta_cta_title: 'Valvonnan tarpeessa?',
        valvonta_cta_desc: 'Palvelumme räätälöidään aina asiakkaan tarpeiden mukaan. Ota rohkeasti yhteyttä – autamme löytämään projektiisi toimivan ratkaisun.',
        services_cta_button: 'Kysy yrittäjiltä'
    },
    en: {
        valvonta_hero_title: 'INSTALLATION & SITE MANAGEMENT',
        valvonta_hero_desc: 'We provide installation supervision, site management, and project coordination for mechanical installations, maintenance, and project delivery. In addition, we handle welding quality assurance and all documentation required by the project.<br><br>Our site supervisors have completed basic HSE training, and safe working practices are an integral part of every project we deliver.',
        valvonta_content_title: 'SUPERVISION WORK FROM OSTROBOTHNIA TO SITES AROUND THE WORLD',
        valvonta_p1: 'Metal Marvel Oy specialises in the supervision of installation and welding work, as well as in welding quality control. Our service area covers Vaasa, Alajärvi, Kauhava, Seinäjoki, Kurikka, Ähtäri, Alavus, Lapua, Pietarsaari, Uusikaarlepyy, Kristiinankaupunki, and Kaskinen, as well as the whole of Finland and sites abroad. We have carried out projects in the following countries: Argentina, the Bahamas, Barbados, Denmark, El Salvador, England, France, Germany, Ireland, Italy, Mexico, Mozambique, the Netherlands, Nigeria, Norway, Panama, Russia, South Africa, Sweden, Togo, and the United Arab Emirates.',
        valvonta_cta_title: 'Need supervision for your project?',
        valvonta_cta_desc: 'Our services are always tailored to customer needs. Please get in touch – we will help you find a solution that works for your project.',
        services_cta_button: 'Request more information'
    }
};

initI18n({
    strings,
    titles: {
        fi: 'Valvonta | Metal Marvel Oy',
        en: 'Project Supervision | Metal Marvel Oy'
    }
});

initNav();
initReveal();
initGlobe();

initSectionTracking([
    { path: '/valvonta', id: 'main' }
]);

/* The contact CTA navigates to a different page (index.html#contact), so a plain
   anchor jump lands instantly with no animation. Hand the target off via
   sessionStorage and let index.js perform the smooth scroll once it has loaded. */
const contactCta = document.getElementById('valvonta-contact-cta');
contactCta?.addEventListener('click', (event) => {
    event.preventDefault();
    try {
        sessionStorage.setItem('mm-smooth-scroll-target', 'contact');
    } catch {
        /* Storage unavailable (e.g. private browsing) — fall back to a normal jump. */
    }
    window.location.href = 'index.html';
});
