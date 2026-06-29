const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'about', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

const newEnCareerRows = `    careerHeaders: ["Year", "Play / Program", "Role", "Place / Details"],
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
    ],`;

const newTeCareerRows = `    careerHeaders: ["సంవత్సరం", "నాటకం / కార్యక్రమం", "పాత్ర", "స్థలం / విశేషం"],
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
    ],`;

const careerRegexEn = /careerHeaders:\s*\["Year",\s*"Work",\s*"Description"\],[\s\S]*?(?=\s+awardsHeaders:)/;
content = content.replace(careerRegexEn, newEnCareerRows + '\n');

const careerRegexTe = /careerHeaders:\s*\["సంవత్సరం",\s*"రచన",\s*"వివరణ"\],[\s\S]*?(?=\s+awardsHeaders:)/;
content = content.replace(careerRegexTe, newTeCareerRows + '\n');

// Update the JSX to render the 4 columns instead of 3
const oldJsx = `<table className="w-full text-left text-[14px] border border-gray-300 mb-6">
                <thead className="bg-[#e8e4d8] border-b border-gray-300">
                  <tr>
                    <th className="p-3 border-r border-gray-300 font-bold w-16 text-center">{t.careerHeaders[0]}</th>
                    <th className="p-3 border-r border-gray-300 font-bold w-[140px]">{t.careerHeaders[1]}</th>
                    <th className="p-3 font-bold">{t.careerHeaders[2]}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.careerRows.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50/50">
                      <td className="p-3 border-r border-gray-200 text-center font-semibold">{row.year}</td>
                      <td className="p-3 border-r border-gray-200 text-gray-700">{row.work}</td>
                      <td className="p-3 text-gray-800 leading-relaxed">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>`;

const newJsx = `<table className="w-full text-left text-[14px] border border-gray-300 mb-6">
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
              </table>`;

content = content.replace(oldJsx, newJsx);
fs.writeFileSync(filePath, content);
console.log('Update complete');
