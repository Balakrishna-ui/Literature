'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Globe } from 'lucide-react';

const content = {
  en: {
    title: "Sri Duppalli Sri Ramulu",
    subtitle: "Actor, Director, Playwright, and Mentor",
    contents: "Contents",
    nav: { 
      biography: "Biography", earlyLife: "Early Life", education: "Education & Impact", 
      career: "Career", awards: "Awards", legacy: "Legacy" 
    },
    intro: <span><strong>Sri Duppalli Sri Ramulu</strong> is a celebrated actor, playwright, director, and mentor in Telugu theatre. Deeply inspired by the life and ideals of Ballari Raghava, he dedicated himself to preserving the dignity and literary excellence of Telugu theatre.</span>,
    bio1: "Over the years, he emerged not only as a celebrated actor but also as a playwright, director, and mentor. He wrote and directed several mythological and socially relevant dramas, including Bhakta Prahlada and Markandeya.",
    bio2: "A perfectionist by nature, Sri Ramulu strongly opposed excessive harmonium accompaniment, prolonged ragalapana, inaccurate pronunciation of padyams, poor literary standards, and inappropriate stage costumes. He firmly believed that the greatness of Telugu theatre lay in disciplined performance, meaningful literature, and artistic authenticity.",
    bio3: "His dedication earned the respect and friendship of many distinguished personalities, including Jamuna, Kantha Rao, Gummadi Venkateswara Rao, Peesapati Narasimha Murthy, Burra Subrahmanya Shastri, Kapilavayi Lingamurthy, Vallapureddy Bucha Reddy, and Gadiyaram Ramakrishna Sharma.",
    bio4: "With the support of cultural organizations such as Swaralahari Cultural Academy, his productions were staged at prestigious venues, including Mahathi Auditorium, Tirupati, where Halikudu was selected for performance.",
    bio5: "In the later phase of his life, Sri Ramulu devoted himself to nurturing the next generation of theatre artists. He served as the Chief of the Nataka Vibhaga at Sri Saraswathi Vidyapeetam Shikshana Varga, training nearly 100–200 students and teachers every year.",
    early1: "Duppalli Sri Ramulu was born in 1942 in Duppalli village, Mahabubnagar District, Telangana. His childhood was marked by hardship. He lost his father at the age of three, had no siblings, and was lovingly raised by his grandmother. Owing to severe financial constraints, he had to discontinue his education in 1952.",
    early2: "His lifelong association with Telugu theatre began in childhood after witnessing the renowned Gayopakhyanam play in his village in 1948. Recognizing his exceptional singing talent, Sri Balija Pedabuchayya Garu and Sri Asupally Seetharam Reddy Garu offered him his first stage opportunity as Kusa in the Lavakusha drama in 1950.",
    early3: "One of his school teachers further encouraged his talent after hearing him recite Telugu padyams, strengthening his passion for drama. In 1967, he married Smt. Govindamma, and the couple was blessed with three children—two sons and a daughter.",
    eduHeaders: ["Institution / Activity", "Role / Details", "Impact"],
    eduRows: [
      { inst: "450+ Government Schools in Mahabubnagar", deg: "Lecturer on Telugu Theatre & Samayasphoorthy", year: "Countless students inspired" },
      { inst: "Sri Saraswathi Vidyapeetam Shikshana Varga", deg: "Chief of Nataka Vibhaga", year: "100–200 trained annually" },
      { inst: "Various Shishu Mandirs", deg: "Drama Training Programs", year: "Cultural education for youth" }
    ],
    careerDesc: "Over a career spanning six decades, Reddy published more than twenty works across poetry, novels, drama, and short stories. Below is a summary of his major works and milestones:",
        careerHeaders: ["Year", "Play / Program", "Role", "Place / Details"],
    careerDesc: "Over a career spanning six decades, he has been extensively involved in theater as an actor, director, and organizer. Below is a detailed record of his theatrical journey:",
    careerRows: [
      { year: "1950", work: "Lava Kusa", role: "Kusudu", desc: "Dummala, First ever performance" },
      { year: "1954", work: "Sahukaru", role: "Sahukaru", desc: "Dummala" },
      { year: "1954", work: "Palnati Yuddham", role: "Mallanayudu", desc: "Dummala" },
      { year: "1962", work: "Pandavodyogam", role: "Sahadevudu", desc: "Dummala" },
      { year: "1968", work: "Monologue (Eka Patrabhinayam)", role: "Duryodhana", desc: "Praja Arts Association, Kurnool" },
      { year: "1970", work: "Monologue (Eka Patrabhinayam)", role: "Duryodhana", desc: "Amalapuram, Received appreciations from Padmashri Chittor V. Nagaiah" },
      { year: "1970", work: "Harikatha - Sri Ganesha Mahatmyam", role: "Storyteller", desc: "In many villages. Trained by Sri Deekshitulu Ekkirala Sastry." },
      { year: "1972", work: "Kurukshetram", role: "Duryodhana", desc: "Dummala" },
      { year: "1975", work: "Sri Krishna Rayabaram", role: "Duryodhana", desc: "Amalapuram, Gudur, Tirumalapuram, and other villages" },
      { year: "1976", work: "Kurukshetram", role: "Duryodhana", desc: "Navodaya Natyamandali, Amalapuram" },
      { year: "1977", work: "Sri Venkateswara Mahatmyam", role: "Srinivasudu, Erukulasani", desc: "In many regions, especially during Sri Venkateswara Swamy Brahmotsavams in Thumukunta. First time directing." },
      { year: "1978", work: "Sri Venkateswara Mahatmyam", role: "Srinivasudu, Erukulasani", desc: "Marikal, Moolamalla, Mummudala, and other villages. Introduced Smt. Rajanibai to the theater stage." },
      { year: "1978", work: "Kurukshetram", role: "Dronacharya", desc: "Kalbalug, Kurnool. Acted alongside Sri Pinapati Narasimha Murthy and Sri Burra Subrahmanya Sastry." },
      { year: "1980", work: "Sri Krishna Rayabaram", role: "Duryodhana", desc: "Shadnagar Laxmi Talkies. Under the musical direction of Sri Enuganti Bheemaiah." },
      { year: "1981", work: "District Cultural Council Drama Competitions", role: "Duryodhana", desc: "Tatipamula. First prize, received from District Collector Sri Muralidhar." },
      { year: "1982", work: "Kurukshetram", role: "Vikarna, Abhimanyu, Duryodhana", desc: "Wanaparthy, Adoni, Gangavathi, Tadipatri, Atmakur. Acted alongside eminent theater personalities." },
      { year: "1983", work: "Kurukshetram", role: "Dronacharya", desc: "Dummala. Sri Burra Subrahmanya Sastry acted as Draupadi. Honored Sri Pinapati Narasimha Murthy." },
      { year: "1984", work: "Chintamani", role: "Bilvamangaludu", desc: "Atmakur. Sri Burra Subrahmanya Sastry acted as Chintamani." },
      { year: "1990", work: "Kurukshetram", role: "Kaurava Pakshamu", desc: "Wanaparthy Lakshmi Venkateswara Natyamandali." },
      { year: "1995", work: "Sri Ramanjaneya Yuddham", role: "Duryodhana", desc: "Bala Ramanjaneya Natyamandali (Exclusive monologue performance)" },
      { year: "1996", work: "Aswatthama", role: "Duryodhana", desc: "Kodangal. Won Best Villain and Best Director awards." },
      { year: "1996", work: "Directors Workshop", role: "Director", desc: "District Literacy Council, Palamuru" },
      { year: "1996", work: "Akshara Kiranam, Bheemapally", role: "Drama Division Director", desc: "District Literacy Council, Palamuru" },
      { year: "1996", work: "Akshara Kiranam - Boosar", role: "Drama Division Director", desc: "District Literacy Council, Palamuru" },
      { year: "1996", work: "Aswatthama", role: "Duryodhana Nirakruthi", desc: "All India Radio, Hyderabad" },
      { year: "1997", work: "Bhuvana Vijayam", role: "Bhattu Murthy", desc: "Mahabubnagar Town Hall" },
      { year: "1998", work: "Bhuvana Vijayam", role: "Bhattu Murthy", desc: "Jadcherla" },
      { year: "1999", work: "Cultural Drama Seminar", role: "-", desc: "Palem Oriental College" },
      { year: "2000", work: "Bellary Raghava Drama Association", role: "Founder", desc: "Founded a drama association in Jadcherla named after Bellary Raghava." },
      { year: "2002", work: "Numerous Children's Drama Performances", role: "Organizer", desc: "Indira Priyadarshini Auditorium, Public Gardens, Jawahar Bal Bhavan" },
      { year: "2003", work: "Presence of Mind on Stage", role: "Lecturer", desc: "Taught in approximately 400+ schools across the district." },
      { year: "2006", work: "Harikathas", role: "-", desc: "Tirupati, Mahati Auditorium Performance" },
      { year: "2012", work: "Tallapaka Annamacharya", role: "Director", desc: "Sri Ekambareswara Swamy Temple, Palamuru" },
      { year: "2012", work: "Jagadguru Sankaracharya", role: "Director", desc: "Sri Ekambareswara Swamy Temple, Palamuru" },
      { year: "2012", work: "Vivekanandam", role: "First Performance", desc: "Performed at Palamuru Town Hall. Written by Sri Burra Subrahmanya Sastry." },
      { year: "2012", work: "Vivekanandam", role: "Nearly 20 performances", desc: "Ramakrishna Math, Salar Jung Museum, Vanasthalipuram, and other locations." }
    ],

    awardsHeaders: ["Award", "Year", "Organization"],
    awardsTitle: "Awards and Recognition",
    awardsRows: [
      { award: 'Paidi Lakshmaiah Keerthi Puraskaram', year: '2004', org: 'Potti Sreeramulu Telugu University' },
      { award: 'First Prize - Mono-acting (Mayasabha Duryodhana)', year: '1968', org: 'Presented by Adurthi Subba Rao' },
      { award: '450+ Appreciation Certificates', year: 'Various', org: 'Government Schools, Mahabubnagar' }
    ],
    legacy1: "With decades of experience on stage as an actor, director, playwright, and mentor, his passion gradually expanded to literary writing. Determined to preserve the knowledge and heritage of Telugu theatre, he authored several books on drama, literature, and culture.",
    legacy2: "To date, nine books have been published, while three more manuscripts are awaiting publication.",
    legacy3: <span>Sri Ramulu's lifelong service to Telugu theatre has been recognized by numerous government bodies and cultural organizations, most notably the Paidi Lakshmaiah Keerthi Puraskaram.</span>,
    legacy4: <span>His journey stands as a remarkable example of how dedication, discipline, and an unwavering commitment to art can transform a humble village boy into one of the respected torchbearers of Telugu theatre.</span>,
    legacy5: "Through more than six decades of unwavering dedication, Duppalli Sri Ramulu has remained a respected actor, director, playwright, mentor, and cultural ambassador whose life continues to inspire generations of Telugu theatre enthusiasts.",
    sidebarDesc: "Actor, Director, Playwright, and Mentor",
    sidebarCaption: "Sri Duppalli Sri Ramulu",
    infoBorn: "Born",
    infoBornVal: "1942\nDuppalli, Mahabubnagar District, Telangana",
    infoDied: "",
    infoDiedVal: "",
    infoOcc: "Occupation",
    infoOccVal: "Actor, Playwright, Director",
    infoLang: "Language",
    infoLangVal: "Telugu",
    infoAlma: "Alma mater",
    infoAlmaVal: "Self-taught / Stage Experience",
    infoWorks: "Notable Plays",
    infoWorksVal: "Sri Venkateswara Mahatmyam, Kurukshetram, Ashwathama, Halikudu (Pothana)",
    infoAwards: "Notable awards",
    infoAwardsVal: "Paidi Lakshmaiah Keerthi Puraskaram (2004)"
  },
  te: {
    title: "శ్రీ దుప్పల్లి శ్రీరాములు",
    subtitle: "నటుడు, దర్శకుడు, నాటక రచయిత మరియు గురువు",
    contents: "విషయసూచిక",
    nav: { 
      biography: "జీవిత చరిత్ర", earlyLife: "బాల్యం", education: "విద్యాభ్యాసం & ప్రభావం", 
      career: "వృత్తి", awards: "పురస్కారాలు", legacy: "వారసత్వం" 
    },
    intro: <span><strong>శ్రీ దుప్పల్లి శ్రీరాములు</strong> గారు తెలుగు నాటకరంగంలో ప్రసిద్ధ నటుడు, నాటక రచయిత, దర్శకుడు మరియు మార్గదర్శకుడు. బళ్ళారి రాఘవ జీవితం మరియు ఆదర్శాలచే తీవ్రంగా ప్రభావితమైన ఆయన, తెలుగు నాటకరంగం యొక్క గౌరవాన్ని మరియు సాహిత్యపరమైన ఔన్నత్యాన్ని కాపాడటానికి తనను తాను అంకితం చేసుకున్నారు.</span>,
    bio1: "గడచిన సంవత్సరాల్లో, ఆయన ప్రసిద్ధ నటుడిగానే కాకుండా నాటక రచయితగా, దర్శకుడిగా మరియు గురువుగా ఎదిగారు. భక్త ప్రహ్లాద మరియు మార్కండేయతో సహా అనేక పౌరాణిక మరియు సామాజిక సంబంధిత నాటకాలను ఆయన రాసి, దర్శకత్వం వహించారు.",
    bio2: "ఆయన స్వతహాగా పరిపూర్ణత కోరుకునేవారు (perfectionist). నాటకాలలో మితిమీరిన హార్మోనియం వాడకం, సుదీర్ఘమైన రాగాలాపన, పద్యాల తప్పు ఉచ్చారణ, పేలవమైన సాహిత్య ప్రమాణాలు మరియు తగని వేషధారణలను ఆయన తీవ్రంగా వ్యతిరేకించారు. క్రమశిక్షణతో కూడిన నటన, అర్థవంతమైన సాహిత్యం, మరియు ప్రామాణికమైన కళలోనే తెలుగు నాటకరంగ గొప్పతనం ఉందని ఆయన దృఢంగా విశ్వసించారు.",
    bio3: "ఆయన అంకితభావం జమున, కాంతారావు, గుమ్మడి వెంకటేశ్వర రావు, పీసపాటి నరసింహ మూర్తి, బుర్రా సుబ్రహ్మణ్య శాస్త్రి, కపిలవాయి లింగమూర్తి, వల్లపురెడ్డి బుచ్చా రెడ్డి మరియు గడియారం రామకృష్ణ శర్మ వంటి అనేక మంది ప్రముఖుల గౌరవాన్ని మరియు స్నేహాన్ని సంపాదించిపెట్టింది.",
    bio4: "స్వరలహరి కల్చరల్ అకాడమీ వంటి సాంస్కృతిక సంస్థల మద్దతుతో, ఆయన నిర్మించిన నాటకాలు తిరుపతిలోని మహతి ఆడిటోరియంతో సహా అనేక ప్రతిష్టాత్మక వేదికల వద్ద ప్రదర్శించబడ్డాయి, అక్కడ హాలికుడు నాటకం ప్రదర్శనకు ఎంపిక చేయబడింది.",
    bio5: "తన జీవితపు మలిదశలో, తదుపరి తరం నాటక కళాకారులను తీర్చిదిద్దడానికి శ్రీరాములు తనను తాను అంకితం చేసుకున్నారు. ఆయన శ్రీ సరస్వతీ విద్యాపీఠం శిక్షణా వర్గంలో నాటక విభాగానికి అధ్యక్షుడిగా పనిచేశారు, ప్రతి సంవత్సరం దాదాపు 100-200 మంది విద్యార్థులు మరియు ఉపాధ్యాయులకు శిక్షణ ఇచ్చారు.",
    early1: "దుప్పల్లి శ్రీరాములు గారు తెలంగాణలోని మహబూబ్ నగర్ జిల్లా దుప్పల్లి గ్రామంలో 1942లో జన్మించారు. ఆయన బాల్యం కష్టాలతో ముడిపడి ఉంది. మూడేళ్ల వయసులోనే తండ్రిని కోల్పోయారు. తోబుట్టువులు ఎవరూ లేకపోవడంతో తన నానమ్మ వద్ద అల్లారుముద్దుగా పెరిగారు. తీవ్రమైన ఆర్థిక ఇబ్బందుల కారణంగా, ఆయన 1952లో తన చదువును ఆపేయవలసి వచ్చింది.",
    early2: "తెలుగు నాటకరంగంతో ఆయనకు ఉన్న సుదీర్ఘ అనుబంధం చిన్నతనంలోనే అంటే 1948లో తన గ్రామంలో ప్రసిద్ధ గయోపాఖ్యానం నాటకం చూసిన తర్వాత మొదలైంది. ఆయనలోని అసాధారణమైన గాన ప్రతిభను గుర్తించిన శ్రీ బలిజ పెదబుచ్చయ్య గారు మరియు శ్రీ ఆసుపల్లి సీతారాం రెడ్డి గారు, 1950లో లవకుశ నాటకంలో కుశుడిగా ఆయనకు మొట్టమొదటి రంగస్థల అవకాశాన్ని అందించారు.",
    early3: "ఆయన తెలుగు పద్యాలు పాడటం విన్న పాఠశాల ఉపాధ్యాయులలో ఒకరు ఆయన ప్రతిభను మరింత ప్రోత్సహించారు, నాటకాలపై ఆయనకున్న మక్కువను బలోపేతం చేశారు. 1967లో, ఆయన శ్రీమతి గోవిందమ్మ గారిని వివాహం చేసుకున్నారు, వీరికి ముగ్గురు పిల్లలు—ఇద్దరు కుమారులు మరియు ఒక కుమార్తె ఉన్నారు.",
    eduHeaders: ["సంస్థ / కార్యక్రమం", "పాత్ర / వివరాలు", "ప్రభావం"],
    eduRows: [
      { inst: "మహబూబ్ నగర్ లోని 450+ ప్రభుత్వ పాఠశాలలు", deg: "తెలుగు నాటకరంగం & సమయస్ఫూర్తిపై ఉపన్యాసకుడు", year: "ఎంతో మంది విద్యార్థులకు స్ఫూర్తి" },
      { inst: "శ్రీ సరస్వతీ విద్యాపీఠం శిక్షణా వర్గం", deg: "నాటక విభాగ అధ్యక్షుడు", year: "ఏటా 100-200 మందికి శిక్షణ" },
      { inst: "వివిధ శిశు మందిరాలు", deg: "నాటక శిక్షణా కార్యక్రమాలు", year: "యువతకు సాంస్కృతిక విద్య" }
    ],
    careerDesc: "ఆరు దశాబ్దాల తన వృత్తి జీవితంలో, రెడ్డి గారు కవిత్వం, నవలలు, నాటకాలు మరియు చిన్న కథలలో ఇరవైకి పైగా రచనలను ప్రచురించారు. ఆయన ప్రధాన రచనలు మరియు మైలురాళ్ల సారాంశం క్రింద ఉంది:",
        careerHeaders: ["సంవత్సరం", "నాటకం / కార్యక్రమం", "పాత్ర", "స్థలం / విశేషం"],
    careerDesc: "ఆరు దశాబ్దాల సుదీర్ఘ వృత్తి జీవితంలో, ఆయన నటుడిగా, దర్శకుడిగా మరియు నిర్వాహకుడిగా నాటకరంగంలో విస్తృతంగా పాలుపంచుకున్నారు. ఆయన నాటక ప్రస్థానం వివరాలు ఇక్కడ ఉన్నాయి:",
    careerRows: [
      { year: "1950", work: "లవకుశ", role: "కుశుడు", desc: "దుమ్మల, మొట్ట మొదటి ప్రదర్శన" },
      { year: "1954", work: "సాహుకార్", role: "సాహుకార్", desc: "దుమ్మల" },
      { year: "1954", work: "పల్నాటి యుద్ధం", role: "మల్లనాయుడు", desc: "దుమ్మల" },
      { year: "1962", work: "పాండవోద్యోగం", role: "సహదేవుడు", desc: "దుమ్మల" },
      { year: "1968", work: "ఏకపాత్రాభినయం", role: "దుర్యోధనుడు", desc: "ప్రజా ఆర్ట్స్ అసోసియేషన్, కర్నూల్" },
      { year: "1970", work: "ఏకపాత్రాభినయం", role: "దుర్యోధనుడు", desc: "అమలాపురం, పద్మశ్రీ చిత్తూరు నాగయ్య గారి అభినందనలు అందుకోవడం" },
      { year: "1970", work: "హరికథ - శ్రీ గణేశ మహాత్మ్యం", role: "కథకుడు", desc: "చాలా గ్రామాలలో. శ్రీ దీక్షితులు ఎక్కిరాల శాస్త్రి గారు నేర్పించారు." },
      { year: "1972", work: "కురుక్షేత్రం", role: "దుర్యోధనుడు", desc: "దుమ్మల" },
      { year: "1975", work: "శ్రీకృష్ణ రాయబారం", role: "దుర్యోధనుడు", desc: "అమలాపురం, గూడూరు, తిరుమలాపురం, ఇతర గ్రామాలలో" },
      { year: "1976", work: "కురుక్షేత్రం", role: "దుర్యోధనుడు", desc: "నవోదయ నాట్యమండలి, అమలాపురం" },
      { year: "1977", work: "శ్రీ వేంకటేశ్వర మహాత్మ్యం", role: "శ్రీనివాసుడు, ఎరుకలసాని", desc: "చాలా ప్రాంతాలలో, ముఖ్యంగా తూముకుంటలో శ్రీ వేంకటేశ్వర స్వామి బ్రహ్మోత్సవాలలో. మొదటగా దర్శకత్వం వహించుట." },
      { year: "1978", work: "శ్రీ వేంకటేశ్వర మహాత్మ్యం", role: "శ్రీనివాసుడు, ఎరుకలసాని", desc: "మరికల్, మూలమల్ల, ముమ్మడల మరియు ఇతర గ్రామాలలో. కొత్తగా శ్రీమతి రజనిబాయి గారిని నాటక వేదికకు పరిచయం చేయడం." },
      { year: "1978", work: "కురుక్షేత్రం", role: "ద్రోణాచార్యుడు", desc: "కాల్బలుగ్, కర్నూల్. శ్రీ పినపాటి నరసింహమూర్తి గారు మరియు శ్రీ బుర్రా సుబ్రహ్మణ్య శాస్త్రి గారి సరసన నటించుట." },
      { year: "1980", work: "శ్రీకృష్ణ రాయబారం", role: "దుర్యోధనుడు", desc: "షాద్ నగర్ లక్ష్మి టాకీస్. శ్రీ ఏనుగంటి భీమయ్యగారి సంగీత సారథ్యంలో." },
      { year: "1981", work: "జిల్లా సాంస్కృతిక మండలి నాటక పోటీలు", role: "దుర్యోధనుడు", desc: "తాటిపాముల. ప్రథమ బహుమతి, జిల్లా కలెక్టర్ శ్రీ మురళీధర్ గారిచే అందుకోవడం." },
      { year: "1982", work: "కురుక్షేత్రం", role: "వికర్ణుడు, అభిమన్యుడు, దుర్యోధనుడు", desc: "వనపర్తి, ఆదోని, గంగావతి, తాడపత్రి, ఆత్మకూరు. ప్రముఖ నాటక ప్రముఖుల సరసన నటించుట." },
      { year: "1983", work: "కురుక్షేత్రం", role: "ద్రోణాచార్యుడు", desc: "దుమ్మల. శ్రీ బుర్రా సుబ్రహ్మణ్య శాస్త్రి గారు ద్రౌపదిగా నటించుట." },
      { year: "1984", work: "చింతామణి", role: "బిల్వమంగళుడు", desc: "ఆత్మకూరు. శ్రీ బుర్రా సుబ్రహ్మణ్య శాస్త్రి గారు చింతామణిగా నటించుట." },
      { year: "1990", work: "కురుక్షేత్రం", role: "కౌరవపక్షము", desc: "వనపర్తి లక్ష్మీ వేంకటేశ్వర నాట్యమండలి." },
      { year: "1995", work: "శ్రీ రామాంజనేయ యుద్ధం", role: "దుర్యోధన ఏకపాత్ర", desc: "బాల వికాసాంజనేయ నాట్యమండలి (ఏకపాత్రాభినయం ప్రదర్శన)" },
      { year: "1996", work: "అశ్వత్థామ", role: "దుర్యోధనుడు", desc: "కొడంగల్ ఉత్తమ ప్రతినాయకుడు, ఉత్తమ దర్శకుడిగా బహుమతి అందుకోవడం." },
      { year: "1996", work: "డైరెక్టర్స్ వర్క్ షాప్", role: "డైరెక్టర్", desc: "జిల్లా అక్షరాస్యతా సమితి, పాలమూరు" },
      { year: "1996", work: "అక్షర కిరణం, భీమపల్లి", role: "నాటక విభాగ డైరెక్టర్", desc: "జిల్లా అక్షరాస్యతా సమితి, పాలమూరు" },
      { year: "1996", work: "అక్షర కిరణం - బూసార్", role: "నాటక విభాగ డైరెక్టర్", desc: "జిల్లా అక్షరాస్యతా సమితి, పాలమూరు" },
      { year: "1996", work: "అశ్వత్థామ", role: "దుర్యోధన నిరాకృతి", desc: "All India Radio, హైదరాబాద్" },
      { year: "1997", work: "భువన విజయం", role: "భట్టుమూర్తి", desc: "మహబూబ్ నగర్ టౌన్ హాల్" },
      { year: "1998", work: "భువన విజయం", role: "భట్టుమూర్తి", desc: "జడ్చర్ల" },
      { year: "1999", work: "సంస్కృతి నాటక సదస్సు / సెమినార్", role: "-", desc: "పాలెం ఓరియంటల్ కళాశాల" },
      { year: "2000", work: "బళ్ళారి రాఘవ నాటక సంస్థ", role: "వ్యవస్థాపకుడు", desc: "జడ్చర్లలో బళ్ళారి రాఘవ పేరుతో నాటక సంస్థ స్థాపన" },
      { year: "2002", work: "అనేక బాలల నాటక ప్రదర్శనలు", role: "నిర్వాహకుడు", desc: "ఇందిరా ప్రియదర్శిని ఆడిటోరియం, పబ్లిక్ గార్డెన్స్, జవహర్ బాల భవన్" },
      { year: "2003", work: "రంగస్థలంపై సమయస్ఫూర్తి (ప్రాక్టికల్ ప్రచారం)", role: "ఉపన్యాసకుడు", desc: "జిల్లా వ్యాప్తంగా సుమారు 400+ పాఠశాలల్లో బోధన." },
      { year: "2006", work: "హరికథలు", role: "పాత్ర", desc: "తిరుపతి, మహతి ఆడిటోరియంలో ప్రదర్శన" },
      { year: "2012", work: "తాళ్ళపాక అన్నమాచార్య", role: "దర్శకుడు", desc: "శ్రీ ఏకాంబరేశ్వర స్వామి దేవస్థానం, పాలమూరు" },
      { year: "2012", work: "జగద్గురు శంకరాచార్య - చిన్న పిల్లలతో", role: "దర్శకుడు", desc: "శ్రీ ఏకాంబరేశ్వర స్వామి దేవస్థానం, పాలమూరు" },
      { year: "2012", work: "వివేకానందం", role: "మొదటి ప్రదర్శన", desc: "పాలమూరు టౌన్ హాల్‌లో ప్రదర్శన. శ్రీ బుర్రా సుబ్రహ్మణ్య శాస్త్రి గారి రచన." },
      { year: "2012", work: "వివేకానందం", role: "దాదాపుగా 20 ప్రదర్శనలు", desc: "రామకృష్ణ మఠం, సాలార్జంగ్ మ్యూజియం, వనస్థలిపురం, ఇతర ప్రాంతాలు" }
    ],

    awardsHeaders: ["పురస్కారం", "సంవత్సరం", "సంస్థ"],
    awardsTitle: "పురస్కారాలు మరియు గుర్తింపు",
    awardsRows: [
      { award: 'పైడి లక్ష్మయ్య కీర్తి పురస్కారం', year: '2004', org: 'పొట్టి శ్రీరాములు తెలుగు విశ్వవిద్యాలయం' },
      { award: 'ప్రథమ బహుమతి - ఏకపాత్రాభినయం (మాయాసభ దుర్యోధన)', year: '1968', org: 'ఆదుర్తి సుబ్బా రావు గారిచే ప్రదానం' },
      { award: '450+ ప్రశంసా పత్రాలు', year: 'వివిధ సంవత్సరాలు', org: 'ప్రభుత్వ పాఠశాలలు, మహబూబ్ నగర్' }
    ],
    legacy1: "నటుడిగా, దర్శకుడిగా, నాటక రచయితగా మరియు గురువుగా వేదికపై దశాబ్దాల అనుభవంతో, ఆయన అభిరుచి క్రమంగా సాహిత్య రచన వైపు విస్తరించింది. తెలుగు నాటకరంగ వారసత్వాన్ని మరియు జ్ఞానాన్ని భవిష్యత్ తరాలకు అందించాలనే ఉద్దేశ్యంతో, ఆయన నాటకం, సాహిత్యం మరియు సంస్కృతిపై అనేక పుస్తకాలను రచించారు.",
    legacy2: "ఇప్పటి వరకు తొమ్మిది పుస్తకాలు ప్రచురితమయ్యాయి, మరో మూడు ప్రచురణకు సిద్ధంగా ఉన్నాయి.",
    legacy3: <span>తెలుగు నాటకరంగానికి శ్రీరాములు గారు చేసిన జీవితకాల సేవలను అనేక ప్రభుత్వ సంస్థలు మరియు సాంస్కృతిక సంస్థలు గుర్తించాయి. ముఖ్యంగా ఆయన పొందిన పైడి లక్ష్మయ్య కీర్తి పురస్కారం దీంట్లో ఎంతో ప్రతిష్టాత్మకమైనది.</span>,
    legacy4: <span>కళ పట్ల అంకితభావం, క్రమశిక్షణ మరియు చెక్కుచెదరని నిబద్ధత ఒక సాధారణ గ్రామపు బాలుడిని తెలుగు నాటకరంగంలో అత్యంత గౌరవనీయమైన మార్గదర్శకులలో ఒకరిగా ఎలా మార్చగలదో ఆయన జీవన ప్రయాణం ఒక అద్భుతమైన ఉదాహరణగా నిలుస్తుంది.</span>,
    legacy5: "ఆరు దశాబ్దాలకు పైగా ఎనలేని అంకితభావంతో, దుప్పల్లి శ్రీరాములు గారు గౌరవనీయమైన నటుడిగా, దర్శకుడిగా, నాటక రచయితగా, గురువుగా మరియు సాంస్కృతిక రాయబారిగా మిగిలిపోయారు. ఆయన జీవితం తెలుగు నాటక అభిమానుల తరాలకు స్ఫూర్తినిస్తూనే ఉంటుంది.",
    sidebarDesc: "నటుడు, దర్శకుడు, నాటక రచయిత మరియు గురువు",
    sidebarCaption: "శ్రీ దుప్పల్లి శ్రీరాములు",
    infoBorn: "జననం",
    infoBornVal: "1942\nదుప్పల్లి, మహబూబ్ నగర్ జిల్లా, తెలంగాణ",
    infoDied: "",
    infoDiedVal: "",
    infoOcc: "వృత్తి",
    infoOccVal: "నటుడు, నాటక రచయిత, దర్శకుడు",
    infoLang: "భాష",
    infoLangVal: "తెలుగు",
    infoAlma: "విద్యా సంస్థలు",
    infoAlmaVal: "స్వీయ-అభ్యాసం / రంగస్థల అనుభవం",
    infoWorks: "ప్రముఖ నాటకాలు",
    infoWorksVal: "శ్రీ వేంకటేశ్వర మహాత్మ్యం, కురుక్షేత్రం, అశ్వత్థామ, హాలికుడు (పోతన)",
    infoAwards: "ప్రముఖ పురస్కారాలు",
    infoAwardsVal: "పైడి లక్ష్మయ్య కీర్తి పురస్కారం (2004)"
  }
};

export default function AboutPage() {
  const [lang, setLang] = useState<'en' | 'te'>('en');
  const t = content[lang];

  return (
    <main className="min-h-screen bg-[#fcfaf5] font-sans text-gray-800">
      <Navbar />

      <div className="max-w-[1100px] mx-auto px-6 py-12 lg:grid lg:grid-cols-[1fr_320px] gap-10 items-start">
        {/* Main Content Column */}
        <div className="space-y-8">
          
          {/* Header */}
          <header className="border-b border-gray-300 pb-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-2">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900">
                {t.title}
              </h1>
              
              {/* Translation Toggle */}
              <button 
                onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
                className="flex items-center gap-2 bg-[#a82b2b] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#8a2222] transition-colors whitespace-nowrap self-start"
              >
                <Globe size={16} />
                {lang === 'en' ? 'Translate to తెలుగు' : 'View in English'}
              </button>
            </div>
            
            <p className="text-gray-600 italic text-sm">
              {t.subtitle}
            </p>
          </header>

          {/* Intro Paragraph & TOC Mobile (moves above intro) */}
          <div className="bg-[#f0ece1] border border-gray-300 p-4 mb-6 w-max min-w-[250px]">
            <div className="font-bold text-sm mb-2 text-center border-b border-gray-300 pb-1">{t.contents}</div>
            <ul className="text-[13px] space-y-1">
              <li><a href="#biography" className="text-[#a82b2b] hover:underline">{t.nav.biography}</a></li>
              <li><a href="#early-life" className="text-gray-700 hover:underline">{t.nav.earlyLife}</a></li>
              <li><a href="#education" className="text-gray-700 hover:underline">{t.nav.education}</a></li>
              <li><a href="#career" className="text-gray-700 hover:underline">{t.nav.career}</a></li>
              <li><a href="#awards" className="text-gray-700 hover:underline">{t.nav.awards}</a></li>
              <li><a href="#legacy" className="text-gray-700 hover:underline">{t.nav.legacy}</a></li>
            </ul>
          </div>

          <p className="leading-relaxed">
            {t.intro}
          </p>

          {/* Section: Biography */}
          <section id="biography">
            <h2 className="font-serif text-2xl font-bold border-b border-gray-300 pb-1 mb-4 text-gray-900 mt-10">{t.nav.biography}</h2>
            <div className="space-y-4 leading-relaxed text-[15px] text-gray-800">
              <p>{t.bio1}</p>
              <p>{t.bio2}</p>
              <p>{t.bio3}</p>
              <p>{t.bio4}</p>
              <p>{t.bio5}</p>
            </div>
          </section>

          {/* Section: Early Life */}
          <section id="early-life">
            <h2 className="font-serif text-2xl font-bold border-b border-gray-300 pb-1 mb-4 text-gray-900 mt-10">{t.nav.earlyLife}</h2>
            <div className="space-y-4 leading-relaxed text-[15px] text-gray-800">
              <p>{t.early1}</p>
              <p>{t.early2}</p>
              <p>{t.early3}</p>
            </div>
          </section>

          {/* Section: Education */}
          <section id="education">
            <h2 className="font-serif text-2xl font-bold border-b border-gray-300 pb-1 mb-4 text-gray-900 mt-10">{t.nav.education}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14px] border border-gray-300 mt-4 mb-6">
                <thead className="bg-[#e8e4d8] border-b border-gray-300">
                  <tr>
                    <th className="p-3 border-r border-gray-300 font-bold w-1/3">{t.eduHeaders[0]}</th>
                    <th className="p-3 border-r border-gray-300 font-bold w-1/2">{t.eduHeaders[1]}</th>
                    <th className="p-3 font-bold w-1/6 text-center">{t.eduHeaders[2]}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.eduRows.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50/50">
                      <td className="p-3 border-r border-gray-200">{row.inst}</td>
                      <td className="p-3 border-r border-gray-200">{row.deg}</td>
                      <td className="p-3 text-center">{row.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Career */}
          <section id="career">
            <h2 className="font-serif text-2xl font-bold border-b border-gray-300 pb-1 mb-4 text-gray-900 mt-10">{t.nav.career}</h2>
            <p className="mb-4 text-[15px] leading-relaxed">
              {t.careerDesc}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14px] border border-gray-300 mb-6">
                <thead className="bg-[#e8e4d8] border-b border-gray-300">
                  <tr>
                    <th className="p-3 border-r border-gray-300 font-bold w-16 text-center">{t.careerHeaders[0]}</th>
                    <th className="p-3 border-r border-gray-300 font-bold w-[180px]">{t.careerHeaders[1]}</th>
                    <th className="p-3 border-r border-gray-300 font-bold w-[120px]">{t.careerHeaders[2]}</th>
                    <th className="p-3 font-bold">{t.careerHeaders[3]}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.careerRows.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50/50">
                      <td className="p-3 border-r border-gray-200 text-center font-semibold">{row.year}</td>
                      <td className="p-3 border-r border-gray-200 text-gray-800 font-medium">{row.work || (row as any).play}</td>
                      <td className="p-3 border-r border-gray-200 text-gray-700">{row.role}</td>
                      <td className="p-3 text-gray-800 leading-relaxed">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Awards */}
          <section id="awards">
            <h2 className="font-serif text-2xl font-bold border-b border-gray-300 pb-1 mb-4 text-gray-900 mt-10">{t.awardsTitle}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14px] border border-gray-300 mt-4 mb-6">
                <thead className="bg-[#e8e4d8] border-b border-gray-300">
                  <tr>
                    <th className="p-3 border-r border-gray-300 font-bold">{t.awardsHeaders[0]}</th>
                    <th className="p-3 border-r border-gray-300 font-bold text-center w-24">{t.awardsHeaders[1]}</th>
                    <th className="p-3 font-bold">{t.awardsHeaders[2]}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.awardsRows.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50/50">
                      <td className="p-3 border-r border-gray-200 text-gray-900 font-medium">{row.award}</td>
                      <td className="p-3 border-r border-gray-200 text-center">{row.year}</td>
                      <td className="p-3 text-gray-600">{row.org}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Legacy */}
          <section id="legacy">
            <h2 className="font-serif text-2xl font-bold border-b border-gray-300 pb-1 mb-4 text-gray-900 mt-10">{t.nav.legacy}</h2>
            <div className="space-y-4 leading-relaxed text-[15px] text-gray-800 mb-10">
              <p>{t.legacy1}</p>
              <p>{t.legacy2}</p>
              <p>{t.legacy3}</p>
              <p>{t.legacy4}</p>
              <p>{t.legacy5}</p>
            </div>
          </section>

        </div>

        {/* Right Column: Infobox */}
        <aside className="bg-[#f0ece1] border border-[#d8d3c5] p-4 text-[13px] text-gray-800 shadow-sm mt-8 lg:mt-0">
          <div className="text-center font-serif text-lg font-bold mb-1 leading-tight text-gray-900">{t.title}</div>
          <div className="text-center text-[11px] mb-3 text-gray-600">{t.sidebarDesc}</div>
          
          <div className="w-full mb-2 border border-[#d8d3c5] bg-white p-1">
            <img 
              src="/images/pro.jpeg" 
              alt="Dr. Lakshmi Narayan Reddy" 
              className="w-full h-auto object-cover"
            />
            <div className="text-center text-[11px] italic text-gray-500 mt-1 mb-1">
              {t.sidebarCaption}
            </div>
          </div>

          <table className="w-full text-left mt-3">
            <tbody>
              <tr className="border-t border-[#d8d3c5]">
                <th className="py-2 pr-2 font-bold text-gray-600 align-top w-[35%]">{t.infoBorn}</th>
                <td className="py-2 align-top">
                  {t.infoBornVal.split('\n').map((line, i) => (
                     <div key={i} className={i === 1 ? "text-gray-600" : ""}>{line}</div>
                  ))}
                </td>
              </tr>
              {t.infoDied && (
                <tr className="border-t border-[#d8d3c5]">
                  <th className="py-2 pr-2 font-bold text-gray-600 align-top">{t.infoDied}</th>
                  <td className="py-2 align-top">
                    {t.infoDiedVal.split('\n').map((line, i) => (
                       <div key={i} className={i === 1 ? "text-gray-600" : ""}>{line}</div>
                    ))}
                  </td>
                </tr>
              )}
              <tr className="border-t border-[#d8d3c5]">
                <th className="py-2 pr-2 font-bold text-gray-600 align-top">{t.infoOcc}</th>
                <td className="py-2 align-top">{t.infoOccVal}</td>
              </tr>
              <tr className="border-t border-[#d8d3c5]">
                <th className="py-2 pr-2 font-bold text-gray-600 align-top">{t.infoLang}</th>
                <td className="py-2 align-top">{t.infoLangVal}</td>
              </tr>
              <tr className="border-t border-[#d8d3c5]">
                <th className="py-2 pr-2 font-bold text-gray-600 align-top">{t.infoAlma}</th>
                <td className="py-2 align-top">
                  {t.infoAlmaVal.split('\n').map((line, i) => (
                     <div key={i}>{line}</div>
                  ))}
                </td>
              </tr>
              <tr className="border-t border-[#d8d3c5]">
                <th className="py-2 pr-2 font-bold text-gray-600 align-top">{t.infoWorks}</th>
                <td className="py-2 align-top italic">
                  {t.infoWorksVal}
                </td>
              </tr>
              <tr className="border-t border-[#d8d3c5]">
                <th className="py-2 pr-2 font-bold text-gray-600 align-top">{t.infoAwards}</th>
                <td className="py-2 align-top">
                  {t.infoAwardsVal.split('\n').map((line, i) => (
                     <div key={i}>{line}</div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </aside>

      </div>

      <Footer />
    </main>
  );
}
