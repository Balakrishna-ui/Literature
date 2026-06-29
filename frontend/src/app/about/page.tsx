'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Globe } from 'lucide-react';

const content = {
  en: {
    title: "Dr. Lakshmi Narayan Reddy",
    subtitle: "Indian poet, novelist, and playwright (1932–2018)",
    contents: "Contents",
    nav: { 
      biography: "Biography", earlyLife: "Early Life", education: "Education", 
      career: "Career", awards: "Awards", legacy: "Legacy" 
    },
    intro: <span><strong>Dr. Lakshmi Narayan Reddy (1932–2018)</strong> was an Indian poet, novelist, and playwright who wrote primarily in Telugu. Widely regarded as one of the most influential literary voices of modern India, his works spanned six decades and earned him the Jnanpith Award, India's highest literary honor. His magnum opus, <em>Aaru Velu</em> (1978), is considered a landmark in Telugu literature.</span>,
    bio1: "Dr. Lakshmi Narayan Reddy (1932–2018) was one of the most celebrated literary voices of modern India. Over a career spanning six decades, he published more than twenty works of poetry, fiction, and drama that earned him a place among the nation's most respected authors.",
    bio2: "Born in the village of Konaseema in the East Godavari district of Andhra Pradesh, Reddy grew up surrounded by the rich oral traditions of Telugu storytelling. His father was a Sanskrit scholar and his mother a gifted singer of classical devotional poetry — influences that would shape his entire creative life.",
    bio3: "After completing his education at Andhra University and later at Osmania University, Reddy began his career as a lecturer in Telugu literature. It was during these years that he started writing seriously, first poetry and then the novels and plays that would bring him national acclaim.",
    bio4: "His writing was distinguished by its lyrical beauty, deep humanism, and unflinching engagement with the struggles of ordinary people. Whether writing about rural poverty, the dignity of labor, or the complexities of human relationships, he brought to every subject a rare combination of artistic rigor and moral passion.",
    bio5: "In addition to his literary work, Reddy was a tireless advocate for the preservation of regional languages and cultural heritage. He served as president of the Telugu Academy and was a member of the Sahitya Akademi's governing board for many years.",
    early1: "Lakshmi Narayan Reddy was born on March 15, 1932, in the village of Amalapuram, East Godavari district. His early years were spent in a household where learning was prized above all else.",
    early2: "His father, Venkata Ratnam Reddy, was a respected Sanskrit pandit who ran a small school in the village. His mother, Subbalakshmi, was known throughout the region for her renditions of Annamacharya sankeertanas.",
    early3: "From an early age, Reddy showed a remarkable gift for language. By the age of ten, he had memorized large portions of the Bhagavad Gita and the works of the Telugu poet Nannaya. His first published poem appeared in a local magazine when he was just sixteen.",
    eduHeaders: ["Institution", "Degree", "Year"],
    eduRows: [
      { inst: "Andhra University", deg: "B.A. in Telugu Literature", year: "1952" },
      { inst: "Osmania University", deg: "M.A. in Telugu Literature", year: "1954" },
      { inst: "University of Madras", deg: "Ph.D. in Comparative Literature", year: "1962" }
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
      { award: 'Jnanpith Award', year: '2002', org: 'Bharatiya Jnanpith' },
      { award: 'Sahitya Akademi Award', year: '1965', org: 'Sahitya Akademi' },
      { award: 'Padma Bhushan', year: '1995', org: 'Government of India' },
      { award: 'Andhra Pradesh Sahitya Akademi Award', year: '1960', org: 'AP Sahitya Akademi' },
      { award: 'Sangeet Natak Akademi Award', year: '1980', org: 'Sangeet Natak Akademi' },
      { award: 'Raja-Lakshmi Award', year: '1988', org: 'Sri Raja-Lakshmi Foundation' },
      { award: 'Sahitya Akademi Fellowship', year: '2005', org: 'Sahitya Akademi' },
      { award: 'Padma Shri', year: '1982', org: 'Government of India' }
    ],
    legacy1: "Dr. Lakshmi Narayan Reddy's influence on Indian literature extends far beyond his published works. Through his teaching, mentorship, and institutional leadership, he shaped two generations of Telugu writers.",
    legacy2: "The Lakshmi Narayan Reddy Foundation, established in 2015, continues his mission of promoting regional language literature through scholarships, translation programs, and literary festivals.",
    legacy3: <span>His novels have been translated into more than twelve languages, including English, Hindi, Bengali, Tamil, and German. <em>Aaru Velu</em> remains a staple of university literature courses across India.</span>,
    legacy4: <span>In the world of theater, <em>Raktakshi</em> is still performed by amateur and professional companies, its power undiminished by the passage of time. The play's influence can be seen in the socially engaged theater movement that emerged in South India during the 1980s.</span>,
    legacy5: "Perhaps his most enduring legacy is the example he set: a life devoted entirely to literature, lived with integrity, humility, and an unwavering belief in the power of words to change the world.",
    sidebarDesc: "Indian poet, novelist & playwright",
    sidebarCaption: "Dr. Reddy in his study",
    infoBorn: "Born",
    infoBornVal: "15 March 1932\nAmalapuram, Andhra Pradesh, India",
    infoDied: "Died",
    infoDiedVal: "12 May 2018 (aged 86)\nHyderabad, Telangana, India",
    infoOcc: "Occupation",
    infoOccVal: "Poet, Novelist, Playwright",
    infoLang: "Language",
    infoLangVal: "Telugu",
    infoAlma: "Alma mater",
    infoAlmaVal: "Andhra University\nOsmania University\nUniversity of Madras",
    infoWorks: "Notable works",
    infoWorksVal: "Aaru Velu, Nadhi Theeram, Raktakshi, Sapta Sagaralu",
    infoAwards: "Notable awards",
    infoAwardsVal: "Jnanpith Award (2002)\nSahitya Akademi Award (1965)\nPadma Bhushan (1995)"
  },
  te: {
    title: "డా. లక్ష్మీ నారాయణ రెడ్డి",
    subtitle: "భారతీయ కవి, నవలా రచయిత, మరియు నాటక రచయిత (1932–2018)",
    contents: "విషయసూచిక",
    nav: { 
      biography: "జీవిత చరిత్ర", earlyLife: "బాల్యం", education: "విద్యాభ్యాసం", 
      career: "వృత్తి", awards: "పురస్కారాలు", legacy: "వారసత్వం" 
    },
    intro: <span><strong>డా. లక్ష్మీ నారాయణ రెడ్డి (1932–2018)</strong> ప్రధానంగా తెలుగులో రచనలు చేసిన ఒక భారతీయ కవి, నవలా రచయిత, నాటక రచయిత. ఆధునిక భారతదేశ అత్యంత ప్రభావవంతమైన సాహిత్య స్వరాలలో ఒకరిగా ఆయన విస్తృతంగా పరిగణించబడతారు. ఆరు దశాబ్దాల పాటు సాగిన ఆయన రచనలు, భారతదేశ అత్యున్నత సాహిత్య పురస్కారమైన జ్ఞానపీఠ్ అవార్డును పొందాయి. ఆయన మహాకావ్యం <em>ఆరు వేలు</em> (1978) తెలుగు సాహిత్యంలో ఒక మైలురాయిగా పరిగణించబడుతుంది.</span>,
    bio1: "డా. లక్ష్మీ నారాయణ రెడ్డి (1932–2018) ఆధునిక భారతదేశం యొక్క అత్యంత ప్రసిద్ధ సాహిత్య స్వరాలలో ఒకరు. ఆరు దశాబ్దాల సుదీర్ఘ కెరీర్లో, ఆయన కవిత్వం, కల్పన మరియు నాటకాలకు సంబంధించి ఇరవైకి పైగా రచనలను ప్రచురించారు, ఇవి దేశంలోని అత్యంత గౌరవనీయమైన రచయితలలో ఆయనకు ఒక స్థానాన్ని సంపాదించిపెట్టాయి.",
    bio2: "ఆంధ్రప్రదేశ్ తూర్పు గోదావరి జిల్లాలోని కోనసీమ గ్రామంలో జన్మించిన రెడ్డి గారు, తెలుగు కథన సంప్రదాయాల మధ్య పెరిగారు. ఆయన తండ్రి సంస్కృత పండితుడు మరియు తల్లి క్లాసికల్ భక్తి కవిత్వంలో నిష్ణాతురాలైన గాయని — ఈ ప్రభావాలు ఆయన సృజనాత్మక జీవితాన్ని రూపొందించాయి.",
    bio3: "ఆంధ్రా విశ్వవిద్యాలయం మరియు తరువాత ఉస్మానియా విశ్వవిద్యాలయంలో తన విద్యను పూర్తి చేసిన తరువాత, రెడ్డి గారు తెలుగు సాహిత్యంలో అధ్యాపకుడిగా తన వృత్తిని ప్రారంభించారు. ఈ సంవత్సరాల్లోనే ఆయన తీవ్రంగా రాయడం ప్రారంభించారు. మొదట కవిత్వం, ఆ తరువాత జాతీయ ఖ్యాతి తెచ్చిన నవలలు మరియు నాటకాలు రాశారు.",
    bio4: "ఆయన రచనలు భావకవిత్వం, లోతైన మానవత్వం మరియు సామాన్య ప్రజల పోరాటాలతో ఎనలేని నిబద్ధతతో ప్రత్యేకంగా నిలిచాయి. గ్రామీణ పేదరికం, కార్మికుల గౌరవం లేదా మానవ సంబంధాల సంక్లిష్టతల గురించి రాసినా, ఆయన ప్రతి అంశానికి కళాత్మకత మరియు నైతిక అభిరుచి కలగలిపారు.",
    bio5: "తన సాహిత్య పనులతో పాటు, ప్రాంతీయ భాషలు మరియు సాంస్కృతిక వారసత్వ పరిరక్షణ కోసం రెడ్డి గారు అవిశ్రాంతంగా పోరాడారు. ఆయన తెలుగు అకాడమీ అధ్యక్షుడిగా పనిచేశారు మరియు అనేక సంవత్సరాలు సాహిత్య అకాడమీ పాలక మండలి సభ్యుడిగా ఉన్నారు.",
    early1: "లక్ష్మీ నారాయణ రెడ్డి 1932 మార్చి 15న తూర్పు గోదావరి జిల్లా అమలాపురం గ్రామంలో జన్మించారు. ఆయన బాల్యం చదువుకు ఎంతో ప్రాధాన్యతనిచ్చే ఇంట్లో గడిచింది.",
    early2: "ఆయన తండ్రి వెంకట రత్నం రెడ్డి ఆ ఊరిలో చిన్న పాఠశాలను నడుపుతున్న గౌరవనీయ సంస్కృత పండితుడు. ఆయన తల్లి సుబ్బలక్ష్మి, అన్నమాచార్య సంకీర్తనలు పాడటంలో ఆ ప్రాంతమంతా ప్రసిద్ధి చెందింది.",
    early3: "చిన్న వయస్సు నుండే, రెడ్డి గారు భాష పట్ల అసాధారణమైన ప్రతిభ కనబరిచారు. పదేళ్ల వయసులో భగవద్గీత, నన్నయ రచనల్లోని పెద్ద భాగాలను కంఠస్థం చేశారు. ఆయనకు పదహారేళ్ల వయసులో ఆయన మొదటి కవిత స్థానిక పత్రికలో ప్రచురితమైంది.",
    eduHeaders: ["సంస్థ", "డిగ్రీ", "సంవత్సరం"],
    eduRows: [
      { inst: "ఆంధ్రా యూనివర్సిటీ", deg: "బి.ఎ. (తెలుగు సాహిత్యం)", year: "1952" },
      { inst: "ఉస్మానియా యూనివర్సిటీ", deg: "ఎం.ఎ. (తెలుగు సాహిత్యం)", year: "1954" },
      { inst: "మద్రాస్ యూనివర్సిటీ", deg: "పిహెచ్.డి. (తులనాత్మక సాహిత్యం)", year: "1962" }
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
      { award: 'జ్ఞానపీఠ్ అవార్డు', year: '2002', org: 'భారతీయ జ్ఞానపీఠ్' },
      { award: 'సాహిత్య అకాడమీ అవార్డు', year: '1965', org: 'సాహిత్య అకాడమీ' },
      { award: 'పద్మ భూషణ్', year: '1995', org: 'భారత ప్రభుత్వం' },
      { award: 'ఏపీ సాహిత్య అకాడమీ అవార్డు', year: '1960', org: 'ఏపీ సాహిత్య అకాడమీ' },
      { award: 'సంగీత నాటక అకాడమీ అవార్డు', year: '1980', org: 'సంగీత నాటక అకాడమీ' },
      { award: 'రాజాలక్ష్మి అవార్డు', year: '1988', org: 'శ్రీ రాజాలక్ష్మి ఫౌండేషన్' },
      { award: 'సాహిత్య అకాడమీ ఫెలోషిప్', year: '2005', org: 'సాహిత్య అకాడమీ' },
      { award: 'పద్మశ్రీ', year: '1982', org: 'భారత ప్రభుత్వం' }
    ],
    legacy1: "భారతీయ సాహిత్యంపై డాక్టర్ లక్ష్మీ నారాయణ రెడ్డి ప్రభావం ఆయన ప్రచురించిన రచనలకు మించి విస్తరించింది. ఆయన తన బోధన మరియు మార్గదర్శకత్వం ద్వారా, రెండు తరాల తెలుగు రచయితలను తీర్చిదిద్దారు.",
    legacy2: "2015లో స్థాపించబడిన లక్ష్మీ నారాయణ రెడ్డి ఫౌండేషన్, స్కాలర్‌షిప్‌లు, అనువాద కార్యక్రమాలు మరియు సాహిత్య ఉత్సవాల ద్వారా ప్రాంతీయ భాషా సాహిత్యాన్ని ప్రోత్సహించే ఆయన లక్ష్యాన్ని కొనసాగిస్తోంది.",
    legacy3: <span>ఆయన నవలలు ఆంగ్లం, హిందీ, బెంగాలీ, తమిళం మరియు జర్మన్ భాషలతో సహా పన్నెండుకు పైగా భాషల్లోకి అనువదించబడ్డాయి. <em>ఆరు వేలు</em> భారతదేశవ్యాప్తంగా యూనివర్సిటీ సాహిత్య కోర్సుల్లో ఒక ప్రధాన అంశంగా మిగిలిపోయింది.</span>,
    legacy4: <span>నాటక ప్రపంచంలో, <em>రక్తాక్షి</em> ఇప్పటికీ అనేక సంస్థలచే ప్రదర్శించబడుతుంది. 1980లలో దక్షిణ భారతదేశంలో ఉద్భవించిన సామాజిక నాటక ఉద్యమంలో ఈ నాటకం యొక్క ప్రభావాన్ని చూడవచ్చు.</span>,
    legacy5: "బహుశా ఆయన మిగిల్చిన అత్యంత శాశ్వతమైన వారసత్వం ఆయన నెలకొల్పిన ఉదాహరణ: సాహిత్యం కోసం పూర్తిగా అంకితమైన జీవితం, సమగ్రత, వినయం మరియు ప్రపంచాన్ని మార్చగల పదాల శక్తిపై అచంచలమైన విశ్వాసంతో జీవించిన జీవితం.",
    sidebarDesc: "భారతీయ కవి, నవలా రచయిత & నాటక రచయిత",
    sidebarCaption: "డా. రెడ్డి తన స్టడీ రూమ్ లో",
    infoBorn: "జననం",
    infoBornVal: "15 మార్చి 1932\nఅమలాపురం, ఆంధ్రప్రదేశ్, ఇండియా",
    infoDied: "మరణం",
    infoDiedVal: "12 మే 2018 (వయస్సు 86)\nహైదరాబాద్, తెలంగాణ, ఇండియా",
    infoOcc: "వృత్తి",
    infoOccVal: "కవి, నవలా రచయిత, నాటక రచయిత",
    infoLang: "భాష",
    infoLangVal: "తెలుగు",
    infoAlma: "విద్యా సంస్థలు",
    infoAlmaVal: "ఆంధ్రా యూనివర్సిటీ\nఉస్మానియా యూనివర్సిటీ\nమద్రాస్ యూనివర్సిటీ",
    infoWorks: "ప్రముఖ రచనలు",
    infoWorksVal: "ఆరు వేలు, నదీ తీరం, రక్తాక్షి, సప్త సాగరాలు",
    infoAwards: "ప్రముఖ పురస్కారాలు",
    infoAwardsVal: "జ్ఞానపీఠ్ అవార్డు (2002)\nసాహిత్య అకాడమీ అవార్డు (1965)\nపద్మ భూషణ్ (1995)"
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
              <tr className="border-t border-[#d8d3c5]">
                <th className="py-2 pr-2 font-bold text-gray-600 align-top">{t.infoDied}</th>
                <td className="py-2 align-top">
                  {t.infoDiedVal.split('\n').map((line, i) => (
                     <div key={i} className={i === 1 ? "text-gray-600" : ""}>{line}</div>
                  ))}
                </td>
              </tr>
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
