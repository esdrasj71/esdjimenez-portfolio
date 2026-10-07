import { useState, useEffect } from "react";
import emailjs from "emailjs-com";
 
export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  useEffect(() => {
    const formCard = document.querySelector("#contact .contact-form-card");
    if (!formCard) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        formCard.classList.add("is-visible");
        observer.unobserve(formCard);
      }
    }, { threshold: 0.15 });

    observer.observe(formCard);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all fields before sending your message.");
      return;
    }

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS environment variables are missing", {
        serviceId,
        templateId,
        publicKey,
      });
      alert("Email service is not configured correctly. Please check your env variables.");
      return;
    }

    emailjs
      .sendForm(serviceId, templateId, e.target, publicKey)
      .then(() => {
        alert("Message Sent!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => alert("Oops! Something went wrong. Please try again."));
  };

  return (
    <section
      id="contact"
      className="contact-section min-h-screen flex items-center justify-center section-ambient-section"
    >
      <div className="section-ambient" aria-hidden="true">
        <div className="section-ambient-gradient section-ambient-gradient--contact motion-safe:animate-ambient-contact" />
        <div className="section-ambient-noise bg-noise bg-repeat" />
      </div>
      <div className="contact-inner">
        <header className="contact-header chapter-header">
          <p className="chapter-eyebrow">05 — Contact</p>
          <h2>Get In Touch</h2>
          <div className="chapter-divider" aria-hidden="true" />
          <p className="contact-subtitle">Have a role, project, or question? I usually reply within a day.</p>
        </header>
        <div className="contact-form-card" style={{ "--card-index": 0 }}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                className="contact-input"
                placeholder="Name..."
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="contact-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                className="contact-input"
                placeholder="example@gmail.com"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="contact-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                className="contact-input contact-textarea"
                placeholder="Your Message..."
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="contact-submit"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};