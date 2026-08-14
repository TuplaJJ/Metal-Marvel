/* Homepage entry module. */

import { initI18n } from './i18n.js';
import { initNav, initReveal, reducedMotion } from './ui.js';
import { initSectionTracking, initConversionTracking } from './analytics.js';

const strings = {
    fi: {
        hero_title: "KUN PROJEKTI VAATII OSAAMISTA <br><span class='accent'>EIKÄ PELKKIÄ TEKIJÖITÄ.</span>",
        hero_desc: 'Metal Marvel Oy:n taustalla on yli 30 vuoden kokemus vaativista teollisuuden putkisto-, teräsrakenne-, laiteasennus- ja kunnossapitoprojekteista. Toimimme Pohjanmaalta käsin kaikkialla Suomessa sekä kansainvälisissä projekteissa.',
        hero_cta: 'PYYDÄ TARJOUS',
        ref_title: 'LUOTETTAVAT KUMPPANIT & REFERENSSIT',
        services_title: 'Palvelumme',
        services_subtext: 'Tarjoamme joustavia ratkaisuja metallialan valmistukseen, asennuksiin, kunnossapitoon ja projektipalveluihin – asiakkaan tarpeiden mukaan.',
        service1_title: 'Putkistoasennukset',
        service1_desc: 'Toteutamme putkistoasennuksia erilaisiin prosessi-, tuotanto- ja työympäristöihin hiiliteräs-, ruostumattomille, haponkestäville ja duplex-putkistoille.',
        service2_title: 'Teräsrakenteet',
        service2_desc: 'Valmistamme, asennamme ja muokkaamme teräsrakenteita sekä toteutamme korjaus-, huolto- ja muutostöitä asiakkaan tarpeiden mukaisesti.',
        service3_title: 'Laiteasennukset',
        service3_desc: 'Asennamme koneita, laitteita ja tuotantolinjoja huolellisesti ja turvallisesti käyttöönottoon saakka.',
        service4_title: 'Kunnossapito',
        service4_desc: 'Huolehdimme ennakoivasta kunnossapidosta, huolloista, korjauksista ja muutostöistä tuotanto- ja työympäristöissä.',
        service5_title: 'Resurssipalvelut',
        service5_desc: 'Tarjoamme kokeneita metalli- ja teollisuusalan ammattilaisia asiakkaan käyttöön tunti- tai projektiperusteisesti. Resurssimme joustavat yksittäisestä tekijästä kokonaisiin työryhmiin.',
        service6_title: 'Asennus- ja työnjohto',
        service6_desc: 'Vastaamme työnjohdosta, työmaavalvonnasta ja projektien koordinoinnista sujuvan toteutuksen varmistamiseksi.',
        service7_title: 'Projektipalvelut',
        service7_desc: 'Osallistumme projektien suunnitteluun, koordinointiin ja toteutukseen varmistaen laadukkaan lopputuloksen sekä aikataulujen hallinnan.',
        service8_title: 'Metallituotteiden valmistus',
        service8_desc: 'Valmistamme mittatilaustyönä metallituotteita, rakenteita ja erikoisratkaisuja yrityksille sekä yksityisasiakkaille – yksittäiskappaleista pieniin sarjoihin.',
        services_cta_title: 'Etkö löytänyt etsimääsi palvelua?',
        services_cta_desc: 'Palvelumme räätälöidään aina asiakkaan tarpeiden mukaan. Ota rohkeasti yhteyttä – autamme löytämään projektiisi toimivan ratkaisun.',
        services_cta_button: 'Kysy yrittäjiltä',
        card_cta: 'Pyydä tarjous',
        about_title: 'MEISTÄ',
        about_desc: 'Olemme yrittäjäveljekset Pohjanmaalta ja meille on kertynyt teräsrakennetekniikan alalta kokemusta varsin monipuolisesti yli 30 vuoden ajalta telakoilta, siltaprojekteista, teollisuuden kunnossapidosta, öljyteollisuuden vaativista putkistohitsauksista, vesivoima-, höyryvoima- sekä teollisuusmoottorivoimalaitoksista kautta maailman. Toimimme vaativissakin olosuhteissa asiakkaan laatuvaatimuksiin sekä tarpeisiin vastaten turvallisuudesta tinkimättä.',
        about_stat1_label: 'Vuotta kokemusta',
        about_stat2_label: 'Maata palveltu',
        about_stat3_label: 'Tehtyä asennustuntia',
        promises_title: 'Lupauksemme.',
        promises_intro: 'Jokainen projekti on meille lupaus asiakkaalle. Siksi toimintamme perustuu neljään periaatteeseen:',
        promise1_title: 'Laatu',
        promise1_desc: 'Huolellinen työnjälki, turvallinen työskentely ja vastuullinen toimintatapa.',
        promise2_title: 'Ratkaisukeskeisyys',
        promise2_desc: 'Löydämme toimivan ratkaisun myös haastaviin tilanteisiin.',
        promise3_title: 'Luotettavuus',
        promise3_desc: 'Pidämme kiinni sovituista aikatauluista ja lupaamistamme asioista.',
        promise4_title: 'Joustavuus',
        promise4_desc: 'Tarjoamme asiakkaan tarpeisiin mukautuvat ja joustavat toteutukset.',
        contact_title: 'Pyydä tarjous tai kysy yrittäjiltä lisätietoja.',
        contact_extra_title: 'Palvelemme myös yrityksiä ja yksityisasiakkaita',
        contact_extra_p1: 'Vaativien teollisuusprojektien lisäksi valmistamme, korjaamme ja huollamme metallituotteita myös yrityksille ja yksityishenkilöille.',
        contact_extra_p2: 'Oli kyseessä yksittäinen metallituote, korjaus tai mittatilaustyö, ota rohkeasti yhteyttä – autamme löytämään toimivan ratkaisun.',
        contact_address_label: 'KÄYNTIOSOITE',
        social_title: 'Seuraa meitä somessa'
    },
    en: {
        hero_title: "WHEN A PROJECT REQUIRES EXPERTISE, <br><span class='accent'>NOT JUST HANDS.</span>",
        hero_desc: 'Metal Marvel Oy is backed by over 30 years of experience in demanding industrial piping, structural steel, equipment installation, and maintenance projects. Based in Ostrobothnia, we work throughout Finland and on international projects.',
        hero_cta: 'REQUEST A QUOTE',
        ref_title: 'TRUSTED PARTNERS & REFERENCES',
        services_title: 'Our Services',
        services_subtext: "We offer flexible solutions for metal fabrication, installations, maintenance, and project services – tailored to each customer's needs.",
        service1_title: 'Piping Installations',
        service1_desc: 'We carry out piping installations in a wide range of process, production, and work environments, covering carbon steel, stainless and acid-resistant grades, and duplex piping.',
        service2_title: 'Steel Structures',
        service2_desc: 'We fabricate, install, and modify steel structures, and carry out repair, maintenance, and alteration work according to customer needs.',
        service3_title: 'Equipment Installations',
        service3_desc: 'We install machinery, equipment, and production lines carefully and safely through to commissioning.',
        service4_title: 'Maintenance',
        service4_desc: 'We take care of preventive maintenance, servicing, repairs, and modifications in production and work environments.',
        service5_title: 'Resource Services',
        service5_desc: 'We provide experienced metalworking and industrial professionals on an hourly or project basis. Our resourcing scales from individual specialists to complete work crews.',
        service6_title: 'Installation and Site Management',
        service6_desc: 'We take charge of site management, supervision, and project coordination to ensure execution runs smoothly.',
        service7_title: 'Project Services',
        service7_desc: 'We support project planning, coordination, and execution, ensuring high quality and reliable schedule management.',
        service8_title: 'Metal Product Manufacturing',
        service8_desc: 'We manufacture custom metal products, structures, and special solutions for businesses and private clients – from one-off pieces to small batches.',
        services_cta_title: "Didn't find the service you were looking for?",
        services_cta_desc: 'Our services are always tailored to customer needs. Please get in touch – we will help you find a solution that works for your project.',
        services_cta_button: 'Request more information',
        card_cta: 'Request a quote',
        about_title: 'ABOUT US',
        about_desc: 'We are two brothers from Ostrobothnia who run the company together. Across more than 30 years we have built broad experience in structural steel engineering – from shipyards and bridge projects to industrial maintenance, demanding process piping welding in the oil industry, and hydro, steam, and engine power plants around the world. We work in the most demanding conditions and meet our customers’ quality requirements without ever compromising on safety.',
        about_stat1_label: 'Years of experience',
        about_stat2_label: 'Countries served',
        about_stat3_label: 'Installation hours completed',
        promises_title: 'Our Promise.',
        promises_intro: 'Every project is a promise to the customer. That is why our operations are based on four principles:',
        promise1_title: 'Quality',
        promise1_desc: 'Meticulous workmanship, safe working practices, and a responsible approach.',
        promise2_title: 'Solution Focus',
        promise2_desc: 'We find solutions that work, even in challenging situations.',
        promise3_title: 'Reliability',
        promise3_desc: 'We keep to agreed schedules and honour our commitments.',
        promise4_title: 'Flexibility',
        promise4_desc: "We adapt our way of working to suit each customer's needs.",
        contact_title: 'Request a quote or contact the owners directly for more information.',
        contact_extra_title: 'We also serve businesses and private customers',
        contact_extra_p1: 'In addition to demanding industrial projects, we manufacture, repair, and maintain metal products for businesses and private individuals.',
        contact_extra_p2: 'Whether it is a single metal product, a repair, or custom fabrication, please get in touch – we will help you find a solution that works.',
        contact_address_label: 'STREET ADDRESS',
        social_title: 'Follow us on social media'
    }
};

initI18n({
    strings,
    titles: {
        fi: 'Metal Marvel Oy | Hitsaus- ja asennustyöt',
        en: 'Metal Marvel Oy | Welding & Installation'
    }
});

initNav();
initReveal();

// Track section pageviews and conversions with Vercel Web Analytics
initSectionTracking([
    { path: '/', id: 'hero' },
    { path: '/palvelut', id: 'hitsaus-ja-asennustyot' },
    { path: '/meista', id: 'meista' },
    { path: '/yhteystiedot', id: 'contact' }
]);
initConversionTracking();

/* --- Animated stat counters --- */

function formatNumber(value) {
    /* fi-FI groups with a non-breaking space; normalise it so the glyph is
       predictable across platforms. */
    return value.toLocaleString('fi-FI').replace(/\s/g, ' ');
}

function animateCounters(counters) {
    for (const counter of counters) {
        const target = Number(counter.dataset.target);
        if (!Number.isFinite(target)) continue;

        // Large numbers run longer, so the three counters land in a staggered order.
        const duration = target > 1000 ? 3200 : 1600;
        let startTime = null;

        function step(timestamp) {
            startTime ??= timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Cubic ease-out: fast at first, decelerating onto the exact final value.
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = formatNumber(Math.round(eased * target));

            if (progress < 1) requestAnimationFrame(step);
            else counter.textContent = formatNumber(target);
        }

        requestAnimationFrame(step);
    }
}

function initCounters() {
    const statsSection = document.querySelector('.about-stats');
    const counters = document.querySelectorAll('.counter');
    if (!statsSection || counters.length === 0) return;

    /* CSS cannot switch off a requestAnimationFrame loop, so reduced-motion is
       handled here: show the final figures immediately and never animate. */
    if (reducedMotion.matches) {
        for (const counter of counters) {
            counter.textContent = formatNumber(Number(counter.dataset.target));
        }
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                animateCounters(counters);
                observer.disconnect();
            }
        },
        { threshold: 0.2 }
    );

    observer.observe(statsSection);
}

initCounters();

/* --- Re-apply the URL hash once everything has loaded ---
   Below-the-fold images are lazy, so arriving at e.g. index.html#contact can land
   short of the target as later images settle. Correcting after 'load' puts the
   visitor on the right section. Skipped if they have already scrolled. */
(function correctHashLanding() {
    if (!location.hash) return;

    let target;
    try {
        target = document.querySelector(location.hash);
    } catch {
        return; // Not a valid selector — nothing to correct.
    }
    if (!target) return;

    let userScrolled = false;
    const markScrolled = () => { userScrolled = true; };
    const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];

    window.addEventListener('wheel', markScrolled, { passive: true, once: true });
    window.addEventListener('touchmove', markScrolled, { passive: true, once: true });
    window.addEventListener('keydown', (event) => {
        if (scrollKeys.includes(event.key)) markScrolled();
    }, { once: true });

    const settle = () => {
        if (userScrolled) return;
        // 'instant', not 'auto' — 'auto' defers to the global scroll-behavior:
        // smooth, which would animate the correction.
        target.scrollIntoView({ behavior: 'instant', block: 'start' });
    };

    window.addEventListener('load', () => {
        // Deliberately not requestAnimationFrame: rAF is paused while the tab is
        // hidden, so a page opened in a background tab would never get corrected.
        settle();
        setTimeout(settle, 0);
    });
})();
