import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fcfaf5] font-sans text-gray-800">
      <Navbar />

      <div className="max-w-[1100px] mx-auto px-6 py-12 lg:grid lg:grid-cols-[1fr_320px] gap-10 items-start">
        {/* Main Content Column */}
        <div className="space-y-8">
          
          {/* Header */}
          <header className="border-b border-gray-300 pb-4 mb-6">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Dr. Lakshmi Narayan Reddy
            </h1>
            <p className="text-gray-600 italic text-sm">
              Indian poet, novelist, and playwright (1932–2018)
            </p>
          </header>

          {/* Intro Paragraph & TOC Mobile (moves above intro) */}
          <div className="bg-[#f0ece1] border border-gray-300 p-4 mb-6 w-max min-w-[250px]">
            <div className="font-bold text-sm mb-2 text-center border-b border-gray-300 pb-1">Contents</div>
            <ul className="text-[13px] space-y-1">
              <li><a href="#biography" className="text-[#a82b2b] hover:underline">Biography</a></li>
              <li><a href="#early-life" className="text-gray-700 hover:underline">Early Life</a></li>
              <li><a href="#education" className="text-gray-700 hover:underline">Education</a></li>
              <li><a href="#career" className="text-gray-700 hover:underline">Career</a></li>
              <li><a href="#awards" className="text-gray-700 hover:underline">Awards</a></li>
              <li><a href="#legacy" className="text-gray-700 hover:underline">Legacy</a></li>
            </ul>
          </div>

          <p className="leading-relaxed">
            <strong>Dr. Lakshmi Narayan Reddy (1932–2018)</strong> was an Indian poet, novelist, and playwright who wrote primarily in Telugu. Widely regarded as one of the most influential literary voices of modern India, his works spanned six decades and earned him the Jnanpith Award, India's highest literary honor. His magnum opus, <em>Aaru Velu</em> (1978), is considered a landmark in Telugu literature.
          </p>

          {/* Section: Biography */}
          <section id="biography">
            <h2 className="font-serif text-2xl font-bold border-b border-gray-300 pb-1 mb-4 text-gray-900 mt-10">Biography</h2>
            <div className="space-y-4 leading-relaxed text-[15px] text-gray-800">
              <p>Dr. Lakshmi Narayan Reddy (1932–2018) was one of the most celebrated literary voices of modern India. Over a career spanning six decades, he published more than twenty works of poetry, fiction, and drama that earned him a place among the nation's most respected authors.</p>
              <p>Born in the village of Konaseema in the East Godavari district of Andhra Pradesh, Reddy grew up surrounded by the rich oral traditions of Telugu storytelling. His father was a Sanskrit scholar and his mother a gifted singer of classical devotional poetry — influences that would shape his entire creative life.</p>
              <p>After completing his education at Andhra University and later at Osmania University, Reddy began his career as a lecturer in Telugu literature. It was during these years that he started writing seriously, first poetry and then the novels and plays that would bring him national acclaim.</p>
              <p>His writing was distinguished by its lyrical beauty, deep humanism, and unflinching engagement with the struggles of ordinary people. Whether writing about rural poverty, the dignity of labor, or the complexities of human relationships, he brought to every subject a rare combination of artistic rigor and moral passion.</p>
              <p>In addition to his literary work, Reddy was a tireless advocate for the preservation of regional languages and cultural heritage. He served as president of the Telugu Academy and was a member of the Sahitya Akademi's governing board for many years.</p>
            </div>
          </section>

          {/* Section: Early Life */}
          <section id="early-life">
            <h2 className="font-serif text-2xl font-bold border-b border-gray-300 pb-1 mb-4 text-gray-900 mt-10">Early Life</h2>
            <div className="space-y-4 leading-relaxed text-[15px] text-gray-800">
              <p>Lakshmi Narayan Reddy was born on March 15, 1932, in the village of Amalapuram, East Godavari district. His early years were spent in a household where learning was prized above all else.</p>
              <p>His father, Venkata Ratnam Reddy, was a respected Sanskrit pandit who ran a small school in the village. His mother, Subbalakshmi, was known throughout the region for her renditions of Annamacharya sankeertanas.</p>
              <p>From an early age, Reddy showed a remarkable gift for language. By the age of ten, he had memorized large portions of the Bhagavad Gita and the works of the Telugu poet Nannaya. His first published poem appeared in a local magazine when he was just sixteen.</p>
            </div>
          </section>

          {/* Section: Education */}
          <section id="education">
            <h2 className="font-serif text-2xl font-bold border-b border-gray-300 pb-1 mb-4 text-gray-900 mt-10">Education</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14px] border border-gray-300 mt-4 mb-6">
                <thead className="bg-[#e8e4d8] border-b border-gray-300">
                  <tr>
                    <th className="p-3 border-r border-gray-300 font-bold w-1/3">Institution</th>
                    <th className="p-3 border-r border-gray-300 font-bold w-1/2">Degree</th>
                    <th className="p-3 font-bold w-1/6 text-center">Year</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50/50">
                    <td className="p-3 border-r border-gray-200">Andhra University</td>
                    <td className="p-3 border-r border-gray-200">B.A. in Telugu Literature</td>
                    <td className="p-3 text-center">1952</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50/50">
                    <td className="p-3 border-r border-gray-200">Osmania University</td>
                    <td className="p-3 border-r border-gray-200">M.A. in Telugu Literature</td>
                    <td className="p-3 text-center">1954</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-3 border-r border-gray-200">University of Madras</td>
                    <td className="p-3 border-r border-gray-200">Ph.D. in Comparative Literature</td>
                    <td className="p-3 text-center">1962</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Career */}
          <section id="career">
            <h2 className="font-serif text-2xl font-bold border-b border-gray-300 pb-1 mb-4 text-gray-900 mt-10">Career</h2>
            <p className="mb-4 text-[15px] leading-relaxed">
              Over a career spanning six decades, Reddy published more than twenty works across poetry, novels, drama, and short stories. Below is a summary of his major works and milestones:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14px] border border-gray-300 mb-6">
                <thead className="bg-[#e8e4d8] border-b border-gray-300">
                  <tr>
                    <th className="p-3 border-r border-gray-300 font-bold w-16 text-center">Year</th>
                    <th className="p-3 border-r border-gray-300 font-bold w-[140px]">Work</th>
                    <th className="p-3 font-bold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { year: '1956', work: 'First Poetry Collection', desc: 'Published Prabhata Ragalu (Morning Melodies), his debut collection of poems that immediately established him as a major new voice in Telugu poetry.' },
                    { year: '1960', work: 'First Novel', desc: 'Released Varanasi Ghat, a sweeping novel set against the backdrop of the freedom movement, which won the Andhra Pradesh Sahitya Akademi Award.' },
                    { year: '1965', work: 'National Recognition', desc: 'Awarded the Sahitya Akademi Award for his poetry collection Nadhi Theeram (Riverbank), marking his arrival on the national literary stage.' },
                    { year: '1972', work: 'Stage Play Debut', desc: 'Wrote and directed Raktakshi, a powerful stage play exploring the lives of marginalized laborers, which premiered at the National School of Drama.' },
                    { year: '1978', work: 'Landmark Novel', desc: 'Published Aaru Velu (Six Bows), considered his magnum opus, a multigenerational saga that redefined the Telugu novel.' },
                    { year: '1985', work: 'International Stage', desc: "Invited as a visiting fellow to the University of Iowa's International Writing Program, where he collaborated with writers from across the world." },
                    { year: '1992', work: 'Literary Institution', desc: 'Elected President of the Telugu Academy, where he spearheaded initiatives to digitize classical Telugu manuscripts.' },
                    { year: '2002', work: 'Lifetime Achievement', desc: "Received the Jnanpith Award, India's highest literary honor, for his outstanding contribution to Indian literature." },
                    { year: '2010', work: 'Final Works', desc: 'Published Sapta Sagaralu (Seven Oceans), a luminous collection of late poems reflecting on mortality, memory, and the eternal power of words.' }
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50/50">
                      <td className="p-3 border-r border-gray-200 text-center font-semibold">{row.year}</td>
                      <td className="p-3 border-r border-gray-200 text-gray-700">{row.work}</td>
                      <td className="p-3 text-gray-800 leading-relaxed">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Awards */}
          <section id="awards">
            <h2 className="font-serif text-2xl font-bold border-b border-gray-300 pb-1 mb-4 text-gray-900 mt-10">Awards and Recognition</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14px] border border-gray-300 mt-4 mb-6">
                <thead className="bg-[#e8e4d8] border-b border-gray-300">
                  <tr>
                    <th className="p-3 border-r border-gray-300 font-bold">Award</th>
                    <th className="p-3 border-r border-gray-300 font-bold text-center w-24">Year</th>
                    <th className="p-3 font-bold">Organization</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { award: 'Jnanpith Award', year: '2002', org: 'Bharatiya Jnanpith' },
                    { award: 'Sahitya Akademi Award', year: '1965', org: 'Sahitya Akademi' },
                    { award: 'Padma Bhushan', year: '1995', org: 'Government of India' },
                    { award: 'Andhra Pradesh Sahitya Akademi Award', year: '1960', org: 'AP Sahitya Akademi' },
                    { award: 'Sangeet Natak Akademi Award', year: '1980', org: 'Sangeet Natak Akademi' },
                    { award: 'Raja-Lakshmi Award', year: '1988', org: 'Sri Raja-Lakshmi Foundation' },
                    { award: 'Sahitya Akademi Fellowship', year: '2005', org: 'Sahitya Akademi' },
                    { award: 'Padma Shri', year: '1982', org: 'Government of India' }
                  ].map((row, idx) => (
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
            <h2 className="font-serif text-2xl font-bold border-b border-gray-300 pb-1 mb-4 text-gray-900 mt-10">Legacy</h2>
            <div className="space-y-4 leading-relaxed text-[15px] text-gray-800 mb-10">
              <p>Dr. Lakshmi Narayan Reddy's influence on Indian literature extends far beyond his published works. Through his teaching, mentorship, and institutional leadership, he shaped two generations of Telugu writers.</p>
              <p>The Lakshmi Narayan Reddy Foundation, established in 2015, continues his mission of promoting regional language literature through scholarships, translation programs, and literary festivals.</p>
              <p>His novels have been translated into more than twelve languages, including English, Hindi, Bengali, Tamil, and German. <em>Aaru Velu</em> remains a staple of university literature courses across India.</p>
              <p>In the world of theater, <em>Raktakshi</em> is still performed by amateur and professional companies, its power undiminished by the passage of time. The play's influence can be seen in the socially engaged theater movement that emerged in South India during the 1980s.</p>
              <p>Perhaps his most enduring legacy is the example he set: a life devoted entirely to literature, lived with integrity, humility, and an unwavering belief in the power of words to change the world.</p>
            </div>
          </section>

        </div>

        {/* Right Column: Infobox */}
        <aside className="bg-[#f0ece1] border border-[#d8d3c5] p-4 text-[13px] text-gray-800 shadow-sm mt-8 lg:mt-0">
          <div className="text-center font-serif text-lg font-bold mb-1 leading-tight text-gray-900">Dr. Lakshmi Narayan Reddy</div>
          <div className="text-center text-[11px] mb-3 text-gray-600">Indian poet, novelist & playwright</div>
          
          <div className="w-full mb-2 border border-[#d8d3c5] bg-white p-1">
            <img 
              src="/images/pro.jpeg" 
              alt="Dr. Lakshmi Narayan Reddy" 
              className="w-full h-auto object-cover"
            />
            <div className="text-center text-[11px] italic text-gray-500 mt-1 mb-1">
              Dr. Reddy in his study
            </div>
          </div>

          <table className="w-full text-left mt-3">
            <tbody>
              <tr className="border-t border-[#d8d3c5]">
                <th className="py-2 pr-2 font-bold text-gray-600 align-top w-[35%]">Born</th>
                <td className="py-2 align-top">
                  <div>15 March 1932</div>
                  <div className="text-gray-600">Amalapuram, Andhra Pradesh, India</div>
                </td>
              </tr>
              <tr className="border-t border-[#d8d3c5]">
                <th className="py-2 pr-2 font-bold text-gray-600 align-top">Died</th>
                <td className="py-2 align-top">
                  <div>12 May 2018 (aged 86)</div>
                  <div className="text-gray-600">Hyderabad, Telangana, India</div>
                </td>
              </tr>
              <tr className="border-t border-[#d8d3c5]">
                <th className="py-2 pr-2 font-bold text-gray-600 align-top">Occupation</th>
                <td className="py-2 align-top">Poet, Novelist, Playwright</td>
              </tr>
              <tr className="border-t border-[#d8d3c5]">
                <th className="py-2 pr-2 font-bold text-gray-600 align-top">Language</th>
                <td className="py-2 align-top">Telugu</td>
              </tr>
              <tr className="border-t border-[#d8d3c5]">
                <th className="py-2 pr-2 font-bold text-gray-600 align-top">Alma mater</th>
                <td className="py-2 align-top">
                  <div>Andhra University</div>
                  <div>Osmania University</div>
                  <div>University of Madras</div>
                </td>
              </tr>
              <tr className="border-t border-[#d8d3c5]">
                <th className="py-2 pr-2 font-bold text-gray-600 align-top">Notable works</th>
                <td className="py-2 align-top italic">
                  Aaru Velu, Nadhi Theeram, Raktakshi, Sapta Sagaralu
                </td>
              </tr>
              <tr className="border-t border-[#d8d3c5]">
                <th className="py-2 pr-2 font-bold text-gray-600 align-top">Notable awards</th>
                <td className="py-2 align-top">
                  <div>Jnanpith Award (2002)</div>
                  <div>Sahitya Akademi Award (1965)</div>
                  <div>Padma Bhushan (1995)</div>
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
