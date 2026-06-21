'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

const biographiesEn = [
  {
    id: 'card-classic-literature',
    title: 'Kuvempu',
    subtitle: 'Classic Literature & Poetry',
    image: '/images/ins1.jpeg',
    bio1: 'Kuppali Venkatappa Puttappa (29 December 1904 – 11 November 1994), popularly known by his pen name Kuvempu, was an Indian poet, playwright, novelist, and critic. He is widely regarded as the greatest Kannada poet of the 20th century. Kuvempu was the first Kannada writer to receive the prestigious Jnanpith Award, the highest literary honor in India.',
    bio2: 'His literary works, which include the magnificent epic Ramayana Darshanam, are celebrated for their profound humanism, universal vision, and deep connection to nature. Kuvempu penned the State anthem of Karnataka, "Jaya Bharata Jananiya Tanujate," which encapsulates his love for his homeland and its rich cultural heritage.',
    bio3: 'Dr. Rajesh Varma often credits Kuvempu’s philosophy of "Vishwa Manava" (Universal Human) as the foundational bedrock of his own narrative style. By heavily drawing upon the themes of equality, harmony, and transcendence beyond caste and religion, Kuvempu\'s legacy profoundly shaped Dr. Varma\'s approach to writing literature that speaks to the shared human experience.',
    born: 'December 29, 1904',
    died: 'November 11, 1994',
    notableWork: 'Sri Ramayana Darshanam'
  },
  {
    id: 'card-libraries',
    title: 'S. R. Ranganathan',
    subtitle: 'Libraries & Archives',
    image: '/images/ins2.jpeg',
    bio1: 'Shiyali Ramamrita Ranganathan (9 August 1892 – 27 September 1972) was a mathematician and librarian from India, universally considered to be the father of library science, documentation, and information science in India. His lifelong dedication to the systematic organization of knowledge revolutionized how libraries operate globally.',
    bio2: 'His most notable contributions to the field were his "Five Laws of Library Science," which remain a fundamental pillar in the education of modern librarians, and the development of the colon classification, the first major analytico-synthetic classification system. Ranganathan\'s vision transformed libraries from mere storehouses of books into dynamic institutions of public learning and democratic education.',
    bio3: 'Dr. Varma\'s early years were spent exploring the quiet corridors of public libraries organized around Ranganathan\'s exact principles. The concept that "Every reader his book" resonated deeply with him, shaping Dr. Varma\'s core belief that literature must remain accessible, serving as a timeless repository of human thought, wisdom, and emotion.',
    born: 'August 9, 1892',
    died: 'September 27, 1972',
    notableWork: 'Five Laws of Library Science'
  },
  {
    id: 'card-writers',
    title: 'U. R. Ananthamurthy',
    subtitle: 'Writers & Thinkers',
    image: '/images/ins3.jpeg',
    bio1: 'Udupi Rajagopalacharya Ananthamurthy (21 December 1932 – 22 August 2014) was a preeminent Indian contemporary writer and critic in the Kannada language. He is considered one of the leading pioneers of the Navya (new) movement in Kannada literature, an era marked by a modernist and introspective approach to storytelling.',
    bio2: 'He was honored with the Jnanpith Award in 1994 and the Padma Bhushan in 1998 for his enormous contributions to Indian literature. Known for his unflinching critical views on caste, orthodoxy, and rigid social hierarchies, Ananthamurthy challenged traditional norms through literary masterpieces like "Samskara," which sparked widespread debate and cultural reflection.',
    bio3: 'This fearless approach to questioning the status quo provided Dr. Varma with the courage to tackle complex, often taboo social issues in his own fictional universes. Ananthamurthy\'s ability to blend philosophical inquiry with compelling human drama remains a guiding light in Dr. Varma\'s character development and thematic explorations.',
    born: 'December 21, 1932',
    died: 'August 22, 2014',
    notableWork: 'Samskara'
  },
  {
    id: 'card-cultural',
    title: 'Girish Karnad',
    subtitle: 'Cultural Heritage',
    image: '/images/ins4.jpeg',
    bio1: 'Girish Raghunath Karnad (19 May 1938 – 10 June 2019) was a multifaceted Indian actor, film director, Kannada writer, playwright, and Rhodes Scholar, who predominantly worked in South Indian cinema and Bollywood. He was a towering figure in the Indian cultural landscape for over half a century.',
    bio2: 'His rise as a playwright in the 1960s marked the coming of age of modern Indian playwriting. By brilliantly utilizing history and mythology to address contemporary political and existential issues, Karnad revived the folk traditions of India on the modern stage. His plays, such as "Tughlaq" and "Hayavadana," are considered masterpieces of modern theater.',
    bio3: 'This seamless blending of ancient folklore with modern existentialism deeply influenced Dr. Varma\'s approach to cultural heritage. Karnad’s work taught Dr. Varma how to weave traditional myths and historical allegories into modern narratives, ensuring that ancient voices continue to echo powerfully in contemporary literature.',
    born: 'May 19, 1938',
    died: 'June 10, 2019',
    notableWork: 'Tughlaq, Hayavadana'
  }
];

const biographiesTe = [
  {
    id: 'card-classic-literature',
    title: 'కువెంపు',
    subtitle: 'క్లాసిక్ సాహిత్యం & కవిత్వం',
    image: '/images/ins1.jpeg',
    bio1: 'కుప్పలి వెంకటప్ప పుట్టప్ప (29 డిసెంబర్ 1904 - 11 నవంబర్ 1994), తన కలం పేరు కువెంపుతో ప్రసిద్ధి చెందిన ఒక భారతీయ కవి, నాటక రచయిత, నవలా రచయిత మరియు విమర్శకుడు. ఆయన 20వ శతాబ్దపు గొప్ప కన్నడ కవిగా విస్తృతంగా పరిగణించబడ్డారు. ప్రతిష్టాత్మక జ్ఞానపీఠ్ అవార్డును అందుకున్న మొదటి కన్నడ రచయిత కువెంపు, ఇది భారతదేశంలో అత్యున్నత సాహిత్య పురస్కారం.',
    bio2: 'అద్భుతమైన ఇతిహాసం \'రామాయణ దర్శనం\'తో సహా ఆయన సాహిత్య రచనలు, వారి గాఢమైన మానవతావాదం, సార్వత్రిక దృష్టి మరియు ప్రకృతితో లోతైన అనుబంధానికి ప్రసిద్ధి చెందాయి. కువెంపు కర్ణాటక రాష్ట్ర గీతం \'జయ భారత జననియ తనుజాతే\'ను రచించారు, ఇది తన మాతృభూమి మరియు దాని గొప్ప సాంస్కృతిక వారసత్వం పట్ల ఆయనకు ఉన్న ప్రేమను ప్రతిబింబిస్తుంది.',
    bio3: 'డాక్టర్ రాజేష్ వర్మ తన సొంత కథన శైలికి పునాదిగా కువెంపు యొక్క \'విశ్వ మానవ\' (సార్వత్రిక మానవుడు) తత్వశాస్త్రాన్ని తరచుగా పేర్కొంటారు. సమానత్వం, సామరస్యం మరియు కులమతాలకు అతీతమైన ఇతివృత్తాలను ఎక్కువగా తీసుకోవడం ద్వారా, పంచుకున్న మానవ అనుభవాన్ని తెలియజేసే సాహిత్యాన్ని రాయడంలో డాక్టర్ వర్మ విధానాన్ని కువెంపు వారసత్వం తీవ్రంగా ప్రభావితం చేసింది.',
    born: 'డిసెంబర్ 29, 1904',
    died: 'నవంబర్ 11, 1994',
    notableWork: 'శ్రీ రామాయణ దర్శనం'
  },
  {
    id: 'card-libraries',
    title: 'ఎస్. ఆర్. రంగనాథన్',
    subtitle: 'గ్రంథాలయాలు & ఆర్కైవ్స్',
    image: '/images/ins2.jpeg',
    bio1: 'షియాలి రామామృత రంగనాథన్ (9 ఆగస్టు 1892 - 27 సెప్టెంబర్ 1972) భారతదేశానికి చెందిన గణిత శాస్త్రవేత్త మరియు లైబ్రేరియన్, భారతదేశంలో గ్రంథాలయ శాస్త్రం, డాక్యుమెంటేషన్ మరియు సమాచార శాస్త్ర పితామహుడిగా విశ్వవ్యాప్తంగా పరిగణించబడ్డారు. జ్ఞానం యొక్క క్రమబద్ధమైన సంస్థ పట్ల ఆయన జీవితకాల అంకితభావం ప్రపంచవ్యాప్తంగా గ్రంథాలయాలు పనిచేసే విధానాన్ని విప్లవాత్మకంగా మార్చింది.',
    bio2: 'ఈ రంగానికి ఆయన చేసిన అత్యంత ముఖ్యమైన రచనలు ఆయన \'ఫైవ్ లాస్ ఆఫ్ లైబ్రరీ సైన్స్\', ఇది ఆధునిక లైబ్రేరియన్ల విద్యలో ప్రాథమిక స్తంభంగా మిగిలిపోయింది, మరియు మొట్టమొదటి ప్రధాన విశ్లేషణాత్మక-సింథటిక్ వర్గీకరణ వ్యవస్థ అయిన కోలన్ వర్గీకరణ అభివృద్ధి. రంగనాథన్ దృష్టి గ్రంథాలయాలను కేవలం పుస్తకాల గిడ్డంగుల నుండి ప్రజల అభ్యాసం మరియు ప్రజాస్వామ్య విద్య యొక్క క్రియాశీలక సంస్థలుగా మార్చింది.',
    bio3: 'డాక్టర్ వర్మ తన ప్రారంభ సంవత్సరాలను రంగనాథన్ యొక్క ఖచ్చితమైన సూత్రాల చుట్టూ నిర్వహించబడిన పబ్లిక్ లైబ్రరీల నిశ్శబ్ద కారిడార్లను అన్వేషించడంలో గడిపారు. \'ప్రతి పాఠకుడికి అతని పుస్తకం\' అనే భావన ఆయనలో తీవ్రంగా ప్రతిధ్వనించింది, సాహిత్యం అందుబాటులో ఉండాలి, మానవ ఆలోచన, జ్ఞానం మరియు భావోద్వేగాల కలకాలం నిలిచి ఉండే భాండాగారంగా పనిచేయాలి అనే డాక్టర్ వర్మ యొక్క ప్రధాన నమ్మకాన్ని రూపొందించింది.',
    born: 'ఆగస్టు 9, 1892',
    died: 'సెప్టెంబర్ 27, 1972',
    notableWork: 'ఫైవ్ లాస్ ఆఫ్ లైబ్రరీ సైన్స్'
  },
  {
    id: 'card-writers',
    title: 'యు. ఆర్. అనంతమూర్తి',
    subtitle: 'రచయితలు & ఆలోచనాపరులు',
    image: '/images/ins3.jpeg',
    bio1: 'ఉడిపి రాజగోపాలాచార్య అనంతమూర్తి (21 డిసెంబర్ 1932 - 22 ఆగస్టు 2014) కన్నడ భాషలో ఒక ప్రముఖ భారతీయ సమకాలీన రచయిత మరియు విమర్శకుడు. అతను కన్నడ సాహిత్యంలో నవ్య (కొత్త) ఉద్యమానికి ప్రముఖ మార్గదర్శకులలో ఒకరిగా పరిగణించబడ్డాడు, ఇది కథల పట్ల ఆధునికవాద మరియు ఆత్మపరిశీలన విధానంతో గుర్తించబడిన యుగం.',
    bio2: 'భారతీయ సాహిత్యానికి ఆయన చేసిన విశేష కృషికి గాను 1994లో జ్ఞానపీఠ్ అవార్డు మరియు 1998లో పద్మ భూషణ్‌తో సత్కరించబడ్డారు. కులం, సనాతన ధర్మం మరియు దృఢమైన సామాజిక సోపానక్రమంపై అచంచలమైన విమర్శనాత్మక దృక్పథాలకు పేరుగాంచిన అనంతమూర్తి, \'సంస్కార\' వంటి సాహిత్య కళాఖండాల ద్వారా సాంప్రదాయ నిబంధనలను సవాలు చేశారు, ఇది విస్తృత చర్చను మరియు సాంస్కృతిక ప్రతిబింబాన్ని రేకెత్తించింది.',
    bio3: 'యథాతథ స్థితిని ప్రశ్నించే ఈ నిర్భయమైన విధానం డాక్టర్ వర్మకు తన స్వంత కల్పిత విశ్వాలలో సంక్లిష్టమైన, తరచుగా నిషిద్ధమైన సామాజిక సమస్యలను పరిష్కరించే ధైర్యాన్ని అందించింది. బలవంతపు మానవ నాటకంతో తాత్విక విచారణను మిళితం చేయగల అనంతమూర్తి సామర్థ్యం డాక్టర్ వర్మ పాత్రల అభివృద్ధి మరియు ఇతివృత్త అన్వేషణలలో మార్గదర్శక వెలుగుగా మిగిలిపోయింది.',
    born: 'డిసెంబర్ 21, 1932',
    died: 'ఆగస్టు 22, 2014',
    notableWork: 'సంస్కార'
  },
  {
    id: 'card-cultural',
    title: 'గిరీష్ కర్నాడ్',
    subtitle: 'సాంస్కృతిక వారసత్వం',
    image: '/images/ins4.jpeg',
    bio1: 'గిరీష్ రఘునాథ్ కర్నాడ్ (19 మే 1938 - 10 జూన్ 2019) బహుముఖ భారతీయ నటుడు, చలనచిత్ర దర్శకుడు, కన్నడ రచయిత, నాటక రచయిత మరియు రోడ్స్ స్కాలర్, వీరు ప్రధానంగా దక్షిణ భారత సినిమా మరియు బాలీవుడ్‌లో పనిచేశారు. అతను అర్ధ శతాబ్దానికి పైగా భారతీయ సాంస్కృతిక దృశ్యంలో అత్యున్నత వ్యక్తిగా నిలిచాడు.',
    bio2: '1960లలో నాటక రచయితగా ఆయన ఎదుగుదల ఆధునిక భారతీయ నాటక రచన యుగానికి నాంది పలికింది. సమకాలీన రాజకీయ మరియు అస్తిత్వ సమస్యలను పరిష్కరించడానికి చరిత్ర మరియు పురాణాలను అద్భుతంగా ఉపయోగించడం ద్వారా, కర్నాడ్ ఆధునిక వేదికపై భారతదేశ జానపద సంప్రదాయాలను పునరుద్ధరించాడు. అతని నాటకాలైన \'తుగ్లక్\' మరియు \'హయవదన\' ఆధునిక నాటకరంగ కళాఖండాలుగా పరిగణించబడతాయి.',
    bio3: 'ప్రాచీన జానపద కథలను ఆధునిక అస్తిత్వవాదంతో అతుకులు లేకుండా మిళితం చేయడం సాంస్కృతిక వారసత్వం పట్ల డాక్టర్ వర్మ విధానాన్ని తీవ్రంగా ప్రభావితం చేసింది. సమకాలీన సాహిత్యంలో ప్రాచీన స్వరాలు శక్తివంతంగా ప్రతిధ్వనించేలా, ఆధునిక కథనాలలో సాంప్రదాయ పురాణాలు మరియు చారిత్రక రూపకాలను ఎలా అల్లాలి అని కర్నాడ్ రచన డాక్టర్ వర్మకు నేర్పింది.',
    born: 'మే 19, 1938',
    died: 'జూన్ 10, 2019',
    notableWork: 'తుగ్లక్, హయవదన'
  }
];

const uiTranslations = {
  en: {
    eyebrow: 'The Foundations',
    title: 'Sources of Inspiration',
    desc: 'Explore the Wikipedia-style biographies of the literary giants, thinkers, and cultural milestones that have shaped the literary voice of Dr. Rajesh Varma.',
    bornLabel: 'Born',
    diedLabel: 'Died',
    workLabel: 'Notable Work',
    btnTranslate: 'తెలుగులో చదవండి (Translate to Telugu)'
  },
  te: {
    eyebrow: 'పునాదులు',
    title: 'స్ఫూర్తిదాయక మూలాలు',
    desc: 'డాక్టర్ రాజేష్ వర్మ యొక్క సాహిత్య స్వరాన్ని తీర్చిదిద్దిన సాహిత్య దిగ్గజాలు, ఆలోచనాపరులు మరియు సాంస్కృతిక మైలురాళ్ల యొక్క వికీపీడియా-శైలి జీవిత చరిత్రలను అన్వేషించండి.',
    bornLabel: 'జననం',
    diedLabel: 'మరణం',
    workLabel: 'గుర్తించదగిన పని',
    btnTranslate: 'Read in English'
  }
};

function InspiredContent({ lang, toggleLang }: { lang: 'en' | 'te', toggleLang: () => void }) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  
  const bios = lang === 'en' ? biographiesEn : biographiesTe;
  const ui = uiTranslations[lang];

  useEffect(() => {
    if (category) {
      const element = document.getElementById(category);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [category]);

  return (
    <>
      <div className="section-head">
        <span className="section-head__eyebrow">{ui.eyebrow}</span>
        <h1 className="section-head__title">{ui.title}</h1>
        <p className="section-head__desc">
          {ui.desc}
        </p>
        <button 
          onClick={toggleLang} 
          className="btn btn--primary" 
          style={{ marginTop: '20px', borderRadius: '30px', padding: '10px 24px' }}
        >
          {ui.btnTranslate}
        </button>
      </div>
      <div className="bio-container">
        {bios.map((bio) => (
          <article key={bio.id} id={bio.id} className="bio-card">
            <div className="bio-image-wrapper">
              <Image 
                src={bio.image} 
                alt={bio.title} 
                fill
                className="bio-image"
                sizes="(max-width: 900px) 100vw, 900px"
                priority={bio.id === category || bio.id === 'card-classic-literature'}
              />
            </div>
            <div className="bio-content">
              <h2 className="bio-title">{bio.title}</h2>
              <h3 className="bio-subtitle">{bio.subtitle}</h3>
              
              <p className="bio-text">{bio.bio1}</p>
              <p className="bio-text">{bio.bio2}</p>
              {bio.bio3 && <p className="bio-text">{bio.bio3}</p>}
              
              <div className="bio-meta-grid">
                <div className="bio-meta-item">
                  <strong>{ui.bornLabel}</strong>
                  <span>{bio.born}</span>
                </div>
                <div className="bio-meta-item">
                  <strong>{ui.diedLabel}</strong>
                  <span>{bio.died}</span>
                </div>
                <div className="bio-meta-item">
                  <strong>{ui.workLabel}</strong>
                  <span>{bio.notableWork}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export default function InspiredPage() {
  const [lang, setLang] = useState<'en' | 'te'>('en');

  const toggleLang = () => setLang(l => l === 'en' ? 'te' : 'en');

  return (
    <>
      <Navbar />
      <main className="page-section page-section--light" style={{ minHeight: '80vh', paddingTop: 'var(--space-xl)' }}>
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px' }}>Loading biographies...</div>}>
          <InspiredContent lang={lang} toggleLang={toggleLang} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
