import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Contact | Dr. Lakshmi Narayan Reddy',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fcfaf5] font-sans">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-[#a82b2b] text-white pt-24 pb-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-[#eab308]"></span>
            <span className="text-[#eab308] text-xs font-bold tracking-widest uppercase">
              CONNECT
            </span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            Contact
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-lg">
            Reach out to the Lakshmi Narayan Reddy Foundation for inquiries, collaborations, or to share your thoughts.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Column: Form */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#eab308]"></span>
              <span className="text-[#eab308] text-xs font-bold tracking-widest uppercase">GET IN TOUCH</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">Send a Message</h2>
            <p className="text-gray-600 text-sm mb-6 pb-2 border-b border-[#eab308] inline-block">We would love to hear from you.</p>

            <form className="bg-[#f0ece1] p-8 border border-[#d8d3c5] space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-[13px] font-semibold text-gray-800">Name</label>
                  <input type="text" id="name" placeholder="Your full name" className="w-full bg-white border border-[#d8d3c5] px-4 py-3 text-sm focus:outline-none focus:border-[#a82b2b]" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-[13px] font-semibold text-gray-800">Email</label>
                  <input type="email" id="email" placeholder="your@email.com" className="w-full bg-white border border-[#d8d3c5] px-4 py-3 text-sm focus:outline-none focus:border-[#a82b2b]" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-[13px] font-semibold text-gray-800">Subject</label>
                <input type="text" id="subject" placeholder="What is this regarding?" className="w-full bg-white border border-[#d8d3c5] px-4 py-3 text-sm focus:outline-none focus:border-[#a82b2b]" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-[13px] font-semibold text-gray-800">Message</label>
                <textarea id="message" rows={6} placeholder="Write your message here..." className="w-full bg-white border border-[#d8d3c5] px-4 py-3 text-sm focus:outline-none focus:border-[#a82b2b] resize-none"></textarea>
              </div>
              <button type="button" className="bg-[#eab308] hover:bg-[#d9a307] text-gray-900 font-semibold text-sm px-6 py-3 flex items-center gap-2 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Send Message
              </button>
            </form>
          </div>

          {/* Right Column: Details */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#eab308]"></span>
              <span className="text-[#eab308] text-xs font-bold tracking-widest uppercase">DETAILS</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">Contact Information</h2>
            <p className="text-gray-600 text-sm mb-6 pb-2 border-b border-[#eab308] inline-block">Other ways to reach us.</p>

            <div className="space-y-6">
              {/* Email Card */}
              <div className="bg-[#f0ece1] p-6 border border-[#d8d3c5] flex gap-4 items-start relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#a82b2b]"></div>
                <div className="bg-[#a82b2b] p-3 text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-gray-900 mb-1 text-lg">Email</h3>
                  <p className="text-gray-600 text-[13px]">foundation@lakshminarayanreddy.org</p>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-[#f0ece1] p-6 border border-[#d8d3c5] flex gap-4 items-start relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#eab308]"></div>
                <div className="bg-[#eab308] p-3 text-gray-900">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-gray-900 mb-1 text-lg">Address</h3>
                  <p className="text-gray-600 text-[13px]">
                    Lakshmi Narayan Reddy Foundation, 12-4-87,<br />
                    Visakhapatnam, Andhra Pradesh, India
                  </p>
                </div>
              </div>

              {/* Follow Us */}
              <div className="bg-[#f0ece1] p-6 border border-[#d8d3c5] mt-8">
                <h3 className="font-serif font-bold text-gray-900 mb-4 text-lg">Follow Us</h3>
                <div className="flex flex-wrap gap-4">
                  <a href="#" className="border border-[#d8d3c5] bg-[#fcfaf5] px-6 py-2 text-[13px] text-gray-700 hover:bg-white transition-colors">Facebook</a>
                  <a href="#" className="border border-[#d8d3c5] bg-[#fcfaf5] px-6 py-2 text-[13px] text-gray-700 hover:bg-white transition-colors">Instagram</a>
                  <a href="#" className="border border-[#d8d3c5] bg-[#fcfaf5] px-6 py-2 text-[13px] text-gray-700 hover:bg-white transition-colors">Twitter</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
