/* The tietosuojaseloste / privacy policy, in both site languages.

   Kept apart from privacy.js (which owns the panel behaviour) and from i18n.js
   (which owns the string table) purely for bulk: this is a legal text that is
   revised on its own schedule, and neither of those files should have to be
   opened to update it.

   i18n.js merges these two into the shared string table under `privacy_body`, so
   the panel follows the FI/EN toggle like every other translated block on the
   site. Both are authored here in full — no part is derived from user input —
   which is what lets i18n.js assign them to innerHTML. */

const fi = `
<p class="privacy-meta">
    Metal Marvel Oy<br>
    Y-tunnus: 3417840-5<br>
    Päivitetty 17.8.2026
</p>

<p>Tässä tietosuojaselosteessa kuvataan, miten Metal Marvel Oy kerää, käsittelee, säilyttää ja suojaa henkilötietoja liiketoiminnassaan sekä verkkosivustollaan.</p>
<p>Metal Marvel Oy käsittelee henkilötietoja EU:n yleisen tietosuoja-asetuksen (EU) 2016/679 (GDPR), Suomen tietosuojalain (1050/2018), työelämän tietosuojalainsäädännön sekä muun soveltuvan lainsäädännön mukaisesti.</p>

<h3>1. Rekisterinpitäjä</h3>
<p>
    Metal Marvel Oy<br>
    Y-tunnus: 3417840-5<br>
    Tampereentie 2575<br>
    66470 Jukaja<br>
    Suomi<br>
    Verkkosivusto: <a href="https://www.metalmarvel.fi">www.metalmarvel.fi</a>
</p>
<p>Tietosuojaa ja henkilötietojen käsittelyä koskevissa asioissa yhteydenotot voidaan osoittaa Metal Marvel Oy:lle verkkosivustolla ilmoitettujen yhteystietojen kautta.</p>

<h3>2. Keiden henkilötietoja käsittelemme?</h3>
<p>Metal Marvel Oy voi käsitellä henkilötietoja, jotka koskevat esimerkiksi:</p>
<ul>
    <li>nykyisiä ja potentiaalisia asiakkaita sekä heidän yhteyshenkilöitään</li>
    <li>yhteistyökumppaneita ja heidän yhteyshenkilöitään</li>
    <li>toimittajia ja alihankkijoita</li>
    <li>työntekijöitä ja muita Metal Marvel Oy:n toimeksiannosta työskenteleviä henkilöitä</li>
    <li>työnhakijoita</li>
    <li>harjoittelijoita ja opiskelijoita</li>
    <li>projektien ja työmaiden yhteyshenkilöitä</li>
    <li>verkkosivuston kautta yhteyttä ottavia henkilöitä</li>
    <li>muita henkilöitä, joiden tietojen käsittely on tarpeellista Metal Marvel Oy:n liiketoiminnan harjoittamiseksi.</li>
</ul>

<h3>3. Käsiteltävät henkilötiedot</h3>
<p>Käsiteltävät henkilötiedot riippuvat henkilön suhteesta Metal Marvel Oy:hyn.</p>

<h4>Asiakkaat, yhteistyökumppanit, toimittajat ja alihankkijat</h4>
<p>Voimme käsitellä esimerkiksi:</p>
<ul>
    <li>nimeä</li>
    <li>yritystä ja tehtävänimikettä</li>
    <li>puhelinnumeroa</li>
    <li>sähköpostiosoitetta</li>
    <li>yrityksen osoite- ja laskutustietoja</li>
    <li>tarjouspyyntöihin, tarjouksiin ja tilauksiin liittyviä tietoja</li>
    <li>sopimus- ja projektitietoja</li>
    <li>työmaihin ja projektiorganisaatioihin liittyviä tietoja</li>
    <li>laskutukseen ja maksuliikenteeseen liittyviä tietoja</li>
    <li>yhteydenpitoon ja asiakassuhteen hoitamiseen liittyviä tietoja.</li>
</ul>

<h4>Työntekijät ja muut yrityksen toimeksiannosta työskentelevät henkilöt</h4>
<p>Työsuhteen tai toimeksiannon hoitamiseksi voimme käsitellä esimerkiksi:</p>
<ul>
    <li>nimi- ja yhteystietoja</li>
    <li>henkilön yksilöimiseksi tarvittavia tietoja</li>
    <li>työsuhteeseen ja työsopimukseen liittyviä tietoja</li>
    <li>palkka- ja työaikatietoja</li>
    <li>verotukseen ja palkanmaksuun tarvittavia tietoja</li>
    <li>pankki- ja maksutietoja</li>
    <li>koulutus-, pätevyys- ja ammattitietoja</li>
    <li>työturvallisuuteen liittyviä koulutus- ja pätevyystietoja</li>
    <li>työmaiden kulkuoikeuksiin ja perehdytyksiin liittyviä tietoja</li>
    <li>työtehtäviin ja projektien toteuttamiseen liittyviä tietoja</li>
    <li>muita työnantajan lakisääteisten velvollisuuksien toteuttamiseksi tarpeellisia tietoja.</li>
</ul>
<p>Erityisiin henkilötietoryhmiin kuuluvia tietoja, kuten terveydentilaa koskevia tietoja, käsitellään ainoastaan silloin, kun käsittelylle on laissa säädetty peruste ja tieto on työ- tai toimeksiantosuhteen hoitamisen kannalta tarpeellinen.</p>
<p>Tällaisten tietojen käsittely rajataan henkilöihin, joilla on työtehtäviensä perusteella oikeus niiden käsittelyyn.</p>

<h4>Työnhakijat</h4>
<p>Rekrytoinnin yhteydessä voimme käsitellä esimerkiksi:</p>
<ul>
    <li>nimeä ja yhteystietoja</li>
    <li>työhakemusta ja ansioluetteloa</li>
    <li>koulutus- ja työhistoriaa</li>
    <li>ammattipätevyyksiä ja sertifikaatteja</li>
    <li>työnhakijan itse toimittamia suosittelijatietoja</li>
    <li>muita rekrytointiprosessin kannalta tarpeellisia tietoja.</li>
</ul>

<h3>4. Henkilötietojen käsittelyn tarkoitukset</h3>
<p>Henkilötietoja voidaan käsitellä muun muassa seuraaviin tarkoituksiin:</p>
<ul>
    <li>asiakas- ja yhteistyökumppanisuhteiden hoitamiseen</li>
    <li>tarjouspyyntöjen käsittelyyn ja tarjousten laatimiseen</li>
    <li>sopimusten, tilausten ja projektien toteuttamiseen</li>
    <li>projektien johtamiseen, valvontaan ja dokumentointiin</li>
    <li>laskutukseen ja taloushallintoon</li>
    <li>asiakaspalveluun ja yhteydenpitoon</li>
    <li>toimittaja- ja alihankkijasuhteiden hallintaan</li>
    <li>henkilöstöhallintoon</li>
    <li>palkanmaksuun ja työajanseurantaan</li>
    <li>työntekijöiden pätevyyksien, koulutusten ja työmaavaatimusten hallintaan</li>
    <li>työturvallisuusvelvoitteiden toteuttamiseen</li>
    <li>rekrytointiin</li>
    <li>lakisääteisten työnantajavelvoitteiden toteuttamiseen</li>
    <li>kirjanpitoon ja viranomaisvelvoitteiden täyttämiseen</li>
    <li>sopimusvelvoitteiden ja oikeudellisten vaatimusten hoitamiseen</li>
    <li>yrityksen toiminnan, tietoturvan ja turvallisuuden varmistamiseen</li>
    <li>verkkosivuston ylläpitämiseen ja kehittämiseen.</li>
</ul>

<h3>5. Henkilötietojen käsittelyn oikeusperuste</h3>
<p>Henkilötietojen käsittely perustuu tilanteesta riippuen:</p>
<p>Sopimukseen tai sopimuksen tekemistä edeltäviin toimenpiteisiin, kun henkilötietojen käsittely on tarpeellista esimerkiksi työsuhteen, asiakassuhteen, toimeksiannon tai muun sopimussuhteen toteuttamiseksi.</p>
<p>Lakisääteiseen velvoitteeseen, kun henkilötietoja käsitellään esimerkiksi kirjanpitoa, verotusta, palkanmaksua, työnantajavelvoitteita tai työturvallisuutta koskevien lakisääteisten velvollisuuksien toteuttamiseksi.</p>
<p>Metal Marvel Oy:n oikeutettuun etuun, kun käsittely on tarpeellista esimerkiksi asiakas- ja yhteistyökumppanisuhteiden hoitamiseksi, liiketoiminnan toteuttamiseksi, yrityksen omaisuuden tai tietojärjestelmien suojaamiseksi tai oikeudellisten vaatimusten käsittelemiseksi.</p>
<p>Suostumukseen, kun henkilötietojen käsittely edellyttää rekisteröidyn suostumusta.</p>
<p>Suostumukseen perustuvan käsittelyn suostumuksen voi peruuttaa milloin tahansa.</p>

<h3>6. Henkilötietojen lähteet</h3>
<p>Henkilötietoja saadaan ensisijaisesti rekisteröidyltä itseltään esimerkiksi:</p>
<ul>
    <li>verkkosivuston kautta</li>
    <li>sähköpostitse</li>
    <li>puhelimitse</li>
    <li>tarjouspyyntöjen ja tilausten yhteydessä</li>
    <li>sopimussuhteen aikana</li>
    <li>työsuhteen aikana</li>
    <li>työnhaun ja rekrytoinnin yhteydessä.</li>
</ul>
<p>Tietoja voidaan saada myös asiakkaalta, pääurakoitsijalta, yhteistyökumppanilta tai muulta projektissa toimivalta taholta silloin, kun tietojen käsittely on tarpeellista projektin tai sopimuksen toteuttamiseksi.</p>
<p>Lisäksi tietoja voidaan saada viranomaisilta, julkisista rekistereistä sekä julkisesti saatavilla olevista yritys- ja yhteystietolähteistä soveltuvan lainsäädännön sallimissa rajoissa.</p>

<h3>7. Henkilötietojen luovuttaminen ja käsittelijät</h3>
<p>Metal Marvel Oy ei myy henkilötietoja kolmansille osapuolille.</p>
<p>Henkilötietoja voidaan luovuttaa tai antaa käsiteltäväksi silloin, kun se on tarpeellista liiketoiminnan, sopimuksen tai lakisääteisen velvoitteen toteuttamiseksi.</p>
<p>Tietoja voivat käsitellä esimerkiksi:</p>
<ul>
    <li>tilitoimisto ja muut taloushallinnon palveluntarjoajat</li>
    <li>palkanlaskennan palveluntarjoajat</li>
    <li>IT- ja tietojärjestelmäpalvelujen tarjoajat</li>
    <li>sähköposti-, pilvi- ja tiedostopalvelujen tarjoajat</li>
    <li>verkkosivuston ylläpito- ja hosting-palveluntarjoajat</li>
    <li>vakuutusyhtiöt</li>
    <li>työterveyshuollon palveluntarjoajat soveltuvan lainsäädännön mukaisesti</li>
    <li>asiakkaat ja pääurakoitsijat siltä osin kuin projektin tai työmaan toteuttaminen sitä edellyttää</li>
    <li>viranomaiset silloin, kun tietojen luovuttamiseen on lakisääteinen velvollisuus.</li>
</ul>
<p>Metal Marvel Oy edellyttää henkilötietoja puolestaan käsitteleviltä palveluntarjoajilta asianmukaista tietosuojaa ja tietoturvaa.</p>

<h3>8. Henkilötietojen siirtäminen EU:n tai ETA-alueen ulkopuolelle</h3>
<p>Metal Marvel Oy pyrkii käyttämään palveluita, joissa henkilötiedot käsitellään EU:n tai Euroopan talousalueen sisällä.</p>
<p>Mikäli käyttämämme palveluntarjoaja käsittelee tai siirtää henkilötietoja EU:n tai ETA-alueen ulkopuolelle, tietojen siirrot toteutetaan sovellettavan tietosuojalainsäädännön mukaisesti käyttäen asianmukaisia siirtoperusteita ja suojatoimia.</p>

<h3>9. Henkilötietojen säilyttäminen</h3>
<p>Henkilötietoja säilytetään vain niin kauan kuin se on tarpeellista niiden käyttötarkoituksen, sopimusvelvoitteiden tai lakisääteisten velvollisuuksien toteuttamiseksi.</p>
<p>Säilytysajat määräytyvät tietoryhmän ja käyttötarkoituksen mukaan.</p>
<p>Esimerkiksi kirjanpito-, palkka-, sopimus- ja projektitietoja voidaan säilyttää lainsäädännön edellyttämän ajan sekä sen jälkeen siinä laajuudessa kuin se on tarpeellista sopimusvastuiden tai oikeudellisten vaatimusten vuoksi.</p>
<p>Työnhakijoiden henkilötietoja säilytetään rekrytointiprosessin ajan ja sen jälkeen vain niin kauan kuin niiden säilyttämiselle on perusteltu ja lainmukainen tarve.</p>
<p>Tarpeettomat ja vanhentuneet henkilötiedot poistetaan tai anonymisoidaan asianmukaisesti.</p>

<h3>10. Henkilötietojen suojaaminen</h3>
<p>Metal Marvel Oy suojaa henkilötietoja asianmukaisin teknisin ja organisatorisin toimenpitein.</p>
<p>Suojaustoimenpiteitä voivat olla esimerkiksi:</p>
<ul>
    <li>henkilökohtaiset käyttäjätunnukset ja salasanat</li>
    <li>käyttöoikeuksien rajaaminen</li>
    <li>tietojärjestelmien tekninen suojaaminen</li>
    <li>laitteiden ja tietoliikenneyhteyksien suojaaminen</li>
    <li>tietojen varmuuskopiointi</li>
    <li>henkilötietoja sisältävien asiakirjojen asianmukainen säilyttäminen</li>
    <li>henkilötietojen käsittelyn rajaaminen henkilöihin, joiden työtehtävät edellyttävät tietojen käyttöä.</li>
</ul>
<p>Henkilötietoja käsittelevillä henkilöillä on velvollisuus käsitellä tietoja luottamuksellisesti.</p>

<h3>11. Verkkosivusto, evästeet ja tekniset tiedot</h3>
<p>Metal Marvel Oy:n verkkosivusto voi käyttää sivuston teknisen toiminnan kannalta välttämättömiä evästeitä ja vastaavia teknologioita.</p>
<p>Verkkosivuston käytön yhteydessä voidaan käsitellä esimerkiksi:</p>
<ul>
    <li>IP-osoitetta</li>
    <li>selaimen ja laitteen teknisiä tietoja</li>
    <li>vierailun ajankohtaa</li>
    <li>sivuston teknisiä lokitietoja</li>
    <li>käyttäjän itse yhteydenoton yhteydessä toimittamia tietoja.</li>
</ul>
<p>Mikäli verkkosivustolla käytetään analytiikka-, markkinointi- tai muita ei-välttämättömiä evästeitä, niiden käyttöön pyydetään tarvittaessa käyttäjän suostumus sovellettavan lainsäädännön mukaisesti.</p>

<h3>12. Rekisteröidyn oikeudet</h3>
<p>Rekisteröidyllä on soveltuvan tietosuojalainsäädännön mukaisesti oikeus:</p>
<ul>
    <li>saada tietoa henkilötietojensa käsittelystä</li>
    <li>tarkastaa itseään koskevat henkilötiedot</li>
    <li>pyytää virheellisten tai puutteellisten henkilötietojen oikaisemista</li>
    <li>pyytää henkilötietojen poistamista silloin, kun niiden käsittelylle ei enää ole lainmukaista perustetta</li>
    <li>pyytää henkilötietojen käsittelyn rajoittamista</li>
    <li>vastustaa oikeutettuun etuun perustuvaa henkilötietojen käsittelyä</li>
    <li>peruuttaa antamansa suostumus</li>
    <li>saada tietyissä tilanteissa itse toimittamansa henkilötiedot siirretyksi järjestelmästä toiseen</li>
    <li>tehdä valitus toimivaltaiselle tietosuojaviranomaiselle.</li>
</ul>
<p>Kaikki edellä mainitut oikeudet eivät sovellu kaikkiin henkilötietojen käsittelytilanteisiin. Esimerkiksi lakisääteisen velvoitteen perusteella säilytettäviä tietoja ei voida poistaa rekisteröidyn pyynnöstä ennen lakisääteisen säilytysajan päättymistä.</p>

<h3>13. Rekisteröidyn oikeuksien käyttäminen</h3>
<p>Henkilötietojen käsittelyä tai rekisteröidyn oikeuksien käyttämistä koskevat pyynnöt tulee toimittaa Metal Marvel Oy:lle kohdassa 1 ilmoitettujen yhteystietojen kautta.</p>
<p>Metal Marvel Oy voi tarvittaessa pyytää lisätietoja pyynnön esittäjän henkilöllisyyden varmistamiseksi.</p>
<p>Pyynnöt käsitellään ilman aiheetonta viivytystä ja sovellettavan tietosuojalainsäädännön mukaisessa määräajassa.</p>

<h3>14. Oikeus tehdä valitus valvontaviranomaiselle</h3>
<p>Jos rekisteröity katsoo, että hänen henkilötietojaan on käsitelty tietosuojalainsäädännön vastaisesti, hänellä on oikeus saattaa asia toimivaltaisen valvontaviranomaisen käsiteltäväksi.</p>
<p>Suomessa tietosuojan valvontaviranomaisena toimii Tietosuojavaltuutetun toimisto.</p>

<h3>15. Tietosuojaselosteen päivittäminen</h3>
<p>Metal Marvel Oy voi päivittää tätä tietosuojaselostetta toiminnan, henkilötietojen käsittelyn, käytettävien järjestelmien tai lainsäädännön muuttuessa.</p>
<p>Ajantasainen tietosuojaseloste julkaistaan Metal Marvel Oy:n verkkosivustolla.</p>

<p class="privacy-signoff">
    Metal Marvel Oy<br>
    Y-tunnus: 3417840-5<br>
    Tampereentie 2575<br>
    66470 Jukaja<br>
    <a href="https://www.metalmarvel.fi">www.metalmarvel.fi</a>
</p>
`;

const en = `
<p class="privacy-meta">
    Metal Marvel Oy<br>
    Business ID: 3417840-5<br>
    Last updated: 17 August 2026
</p>

<p>This Privacy Policy describes how Metal Marvel Oy collects, processes, stores and protects personal data in connection with its business operations and website.</p>
<p>Metal Marvel Oy processes personal data in accordance with the EU General Data Protection Regulation (EU) 2016/679 (GDPR), the Finnish Data Protection Act (1050/2018), applicable legislation concerning privacy in working life, and other applicable legislation.</p>

<h3>1. Data Controller</h3>
<p>
    Metal Marvel Oy<br>
    Business ID: 3417840-5<br>
    Tampereentie 2575<br>
    66470 Jukaja<br>
    Finland<br>
    Website: <a href="https://www.metalmarvel.fi">www.metalmarvel.fi</a>
</p>
<p>For questions concerning privacy or the processing of personal data, please contact Metal Marvel Oy using the contact details provided on our website.</p>

<h3>2. Whose Personal Data Do We Process?</h3>
<p>Metal Marvel Oy may process personal data relating to, for example:</p>
<ul>
    <li>current and potential customers and their representatives</li>
    <li>business partners and their representatives</li>
    <li>suppliers and subcontractors</li>
    <li>employees and other persons working on behalf of Metal Marvel Oy</li>
    <li>job applicants</li>
    <li>trainees and students</li>
    <li>contact persons involved in projects and worksites</li>
    <li>persons contacting us through our website</li>
    <li>other persons whose personal data must be processed for the purposes of Metal Marvel Oy&rsquo;s business operations.</li>
</ul>

<h3>3. Personal Data We Process</h3>
<p>The personal data processed depends on the individual&rsquo;s relationship with Metal Marvel Oy.</p>

<h4>Customers, Business Partners, Suppliers and Subcontractors</h4>
<p>We may process information such as:</p>
<ul>
    <li>name</li>
    <li>company and job title</li>
    <li>telephone number</li>
    <li>email address</li>
    <li>company address and invoicing details</li>
    <li>information relating to requests for quotation, quotations and orders</li>
    <li>contractual and project information</li>
    <li>information relating to worksites and project organisations</li>
    <li>invoicing and payment information</li>
    <li>information relating to communications and management of the business relationship.</li>
</ul>

<h4>Employees and Other Persons Working on Behalf of the Company</h4>
<p>For the purposes of managing an employment relationship or assignment, we may process information such as:</p>
<ul>
    <li>name and contact details</li>
    <li>information necessary for identifying the individual</li>
    <li>employment and employment contract information</li>
    <li>salary and working time information</li>
    <li>information required for taxation and payroll purposes</li>
    <li>bank and payment details</li>
    <li>education, qualifications and professional competence information</li>
    <li>occupational safety training and qualification information</li>
    <li>information relating to worksite access rights and inductions</li>
    <li>information relating to work assignments and project execution</li>
    <li>other information necessary for fulfilling the employer&rsquo;s statutory obligations.</li>
</ul>
<p>Special categories of personal data, such as health-related information, are processed only where there is a legal basis for such processing and where the information is necessary for the management of the employment or contractual relationship.</p>
<p>Access to such information is restricted to persons who are authorised to process it as part of their duties.</p>

<h4>Job Applicants</h4>
<p>In connection with recruitment, we may process information such as:</p>
<ul>
    <li>name and contact details</li>
    <li>job application and curriculum vitae</li>
    <li>educational and employment history</li>
    <li>professional qualifications and certificates</li>
    <li>references voluntarily provided by the applicant</li>
    <li>other information necessary for the recruitment process.</li>
</ul>

<h3>4. Purposes of Processing Personal Data</h3>
<p>Personal data may be processed for purposes including:</p>
<ul>
    <li>managing customer and business partner relationships</li>
    <li>processing requests for quotation and preparing quotations</li>
    <li>performing contracts, orders and projects</li>
    <li>project management, supervision and documentation</li>
    <li>invoicing and financial administration</li>
    <li>customer service and communications</li>
    <li>managing supplier and subcontractor relationships</li>
    <li>human resources administration</li>
    <li>payroll and working time management</li>
    <li>managing employee qualifications, training and worksite requirements</li>
    <li>fulfilling occupational health and safety obligations</li>
    <li>recruitment</li>
    <li>fulfilling statutory employer obligations</li>
    <li>accounting and compliance with regulatory requirements</li>
    <li>managing contractual obligations and legal claims</li>
    <li>ensuring the security of the company&rsquo;s operations, property and information systems</li>
    <li>maintaining and developing the website.</li>
</ul>

<h3>5. Legal Basis for Processing Personal Data</h3>
<p>Depending on the circumstances, the processing of personal data is based on:</p>
<p>Performance of a contract or steps taken prior to entering into a contract, where processing is necessary, for example, for the performance of an employment relationship, customer relationship, assignment or other contractual relationship.</p>
<p>Compliance with a legal obligation, where personal data is processed, for example, to comply with statutory obligations relating to accounting, taxation, payroll, employer responsibilities or occupational safety.</p>
<p>Metal Marvel Oy&rsquo;s legitimate interests, where processing is necessary, for example, for managing customer and business partner relationships, conducting business operations, protecting the company&rsquo;s property or information systems, or establishing, exercising or defending legal claims.</p>
<p>Consent, where the processing of personal data requires the consent of the data subject.</p>
<p>Where processing is based on consent, the data subject may withdraw their consent at any time.</p>

<h3>6. Sources of Personal Data</h3>
<p>Personal data is primarily obtained directly from the data subject, for example:</p>
<ul>
    <li>through the website</li>
    <li>by email</li>
    <li>by telephone</li>
    <li>in connection with requests for quotation and orders</li>
    <li>during a contractual relationship</li>
    <li>during an employment relationship</li>
    <li>in connection with recruitment and job applications.</li>
</ul>
<p>Personal data may also be obtained from customers, main contractors, business partners or other parties involved in a project where processing is necessary for the performance of a project or contract.</p>
<p>Information may also be obtained from authorities, public registers and publicly available business and contact information sources within the limits permitted by applicable legislation.</p>

<h3>7. Disclosure of Personal Data and Data Processors</h3>
<p>Metal Marvel Oy does not sell personal data to third parties.</p>
<p>Personal data may be disclosed or made available for processing where necessary for conducting business operations, performing contractual obligations or complying with statutory requirements.</p>
<p>Personal data may be processed by or disclosed to, for example:</p>
<ul>
    <li>accounting firms and other financial administration service providers</li>
    <li>payroll service providers</li>
    <li>IT and information system service providers</li>
    <li>email, cloud storage and file management service providers</li>
    <li>website maintenance and hosting service providers</li>
    <li>insurance companies</li>
    <li>occupational healthcare service providers in accordance with applicable legislation</li>
    <li>customers and main contractors to the extent necessary for carrying out a project or worksite activities</li>
    <li>public authorities where disclosure is required by law.</li>
</ul>
<p>Metal Marvel Oy requires service providers processing personal data on its behalf to maintain appropriate standards of data protection and information security.</p>

<h3>8. Transfers of Personal Data Outside the EU or EEA</h3>
<p>Metal Marvel Oy aims to use services where personal data is processed within the European Union or European Economic Area.</p>
<p>If a service provider used by Metal Marvel Oy processes or transfers personal data outside the EU or EEA, such transfers will be carried out in accordance with applicable data protection legislation and using appropriate transfer mechanisms and safeguards.</p>

<h3>9. Retention of Personal Data</h3>
<p>Personal data is retained only for as long as necessary for the purposes for which it was collected or as required to fulfil contractual or statutory obligations.</p>
<p>Retention periods vary depending on the category of personal data and the purpose of processing.</p>
<p>For example, accounting, payroll, contractual and project-related information may be retained for the period required by applicable legislation and, where necessary, thereafter for the purposes of contractual liability or the establishment, exercise or defence of legal claims.</p>
<p>Personal data relating to job applicants is retained for the duration of the recruitment process and thereafter only for as long as there is a justified and lawful reason for retaining it.</p>
<p>Personal data that is no longer necessary or has become obsolete will be appropriately deleted or anonymised.</p>

<h3>10. Protection of Personal Data</h3>
<p>Metal Marvel Oy protects personal data using appropriate technical and organisational measures.</p>
<p>Such measures may include:</p>
<ul>
    <li>personal user accounts and passwords</li>
    <li>restricted access rights</li>
    <li>technical protection of information systems</li>
    <li>protection of devices and communications</li>
    <li>data backups</li>
    <li>appropriate storage of documents containing personal data</li>
    <li>restricting access to personal data to persons whose duties require such access.</li>
</ul>
<p>Persons processing personal data are required to handle such information confidentially.</p>

<h3>11. Website, Cookies and Technical Data</h3>
<p>Metal Marvel Oy&rsquo;s website may use cookies and similar technologies that are necessary for the technical operation of the website.</p>
<p>When using the website, we may process information such as:</p>
<ul>
    <li>IP address</li>
    <li>technical information concerning the browser and device</li>
    <li>date and time of the visit</li>
    <li>technical website log data</li>
    <li>information voluntarily provided by the user when contacting us.</li>
</ul>
<p>If the website uses analytics, marketing or other non-essential cookies, the user&rsquo;s consent will be requested where required by applicable legislation.</p>

<h3>12. Rights of the Data Subject</h3>
<p>Under applicable data protection legislation, the data subject may have the right to:</p>
<ul>
    <li>receive information about the processing of their personal data</li>
    <li>access personal data concerning them</li>
    <li>request the rectification of inaccurate or incomplete personal data</li>
    <li>request the deletion of personal data where there is no longer a lawful basis for processing it</li>
    <li>request restriction of the processing of personal data</li>
    <li>object to processing based on legitimate interests</li>
    <li>withdraw previously given consent</li>
    <li>receive, in certain circumstances, personal data they have provided in a structured and transferable format</li>
    <li>lodge a complaint with the competent data protection supervisory authority.</li>
</ul>
<p>Not all of these rights apply in every situation. For example, personal data that Metal Marvel Oy is legally required to retain cannot be deleted at the request of the data subject before the applicable statutory retention period has expired.</p>

<h3>13. Exercising Data Subject Rights</h3>
<p>Requests concerning the processing of personal data or the exercise of data subject rights should be submitted to Metal Marvel Oy using the contact details provided in Section 1.</p>
<p>Metal Marvel Oy may request additional information where necessary to verify the identity of the person making the request.</p>
<p>Requests will be processed without undue delay and within the time limits prescribed by applicable data protection legislation.</p>

<h3>14. Right to Lodge a Complaint with a Supervisory Authority</h3>
<p>If a data subject considers that their personal data has been processed in violation of applicable data protection legislation, they have the right to lodge a complaint with the competent supervisory authority.</p>
<p>In Finland, the competent supervisory authority is the Office of the Data Protection Ombudsman (Tietosuojavaltuutetun toimisto).</p>

<h3>15. Changes to This Privacy Policy</h3>
<p>Metal Marvel Oy may update this Privacy Policy as a result of changes to its operations, personal data processing activities, information systems or applicable legislation.</p>
<p>The current version of this Privacy Policy will be published on Metal Marvel Oy&rsquo;s website.</p>

<p class="privacy-signoff">
    Metal Marvel Oy<br>
    Business ID: 3417840-5<br>
    Tampereentie 2575<br>
    66470 Jukaja<br>
    Finland<br>
    <a href="https://www.metalmarvel.fi">www.metalmarvel.fi</a>
</p>
`;

export const privacyDocument = { fi, en };
