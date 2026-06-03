export default function QuoteBanner() {
  return (
    <section className="quote-banner page-section page-section--immersive" id="quote-banner">
      <div
        className="quote-banner__bg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&q=80&w=1600')",
        }}
      ></div>
      <div className="quote-banner__overlay"></div>
      <div className="quote-banner__content">
        <div className="quote-banner__line quote-banner__line--top"></div>
        <blockquote className="quote-banner__text">
          &ldquo;Every story I write is a conversation with humanity—a dialogue
          between the past we carry and the future we dream of creating.&rdquo;
        </blockquote>
        <div className="quote-banner__divider"></div>
        <cite className="quote-banner__author">— Dr. Rajesh Varma</cite>
        <div className="quote-banner__line quote-banner__line--bottom"></div>
      </div>
    </section>
  );
}
