import { ArrowUpRight, ArrowUp } from "lucide-react";

const Contact = () => (
  <footer id="contact" className="contact-section" aria-labelledby="contact-title">
    <div className="container-shell">
      <div className="contact-main"><div><p className="eyebrow section-index">04 / What’s next</p><h2 id="contact-title">Let’s work on<br /><em>a good problem.</em></h2></div>
        <div className="contact-copy"><p>I’m looking for opportunities in Data Science and Software Engineering. If there’s a place for a curious, analytical builder on your team, let’s talk.</p><a className="email-link" href="mailto:mihirrpatel05@gmail.com">mihirrpatel05@gmail.com <ArrowUpRight size={21} aria-hidden="true" /></a></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Mihir Patel</span><div className="footer-socials"><a href="https://www.linkedin.com/in/mihir-patel-a9a19821a/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={15} aria-hidden="true" /></a><a href="https://github.com/mihir-patel-05" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={15} aria-hidden="true" /></a></div><a href="#top">Back to top <ArrowUp size={15} aria-hidden="true" /></a></div>
    </div>
  </footer>
);
export default Contact;
