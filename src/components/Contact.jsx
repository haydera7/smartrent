import React from "react";

function Contact() {
  return (
    <>
      <section className="form">
        <div className="title">
          <h1>Contact Us</h1>
        </div>
        <div className="formbox">
          <form method="post">
            <input type="text" name="name" placeholder="Your Name" />
            <input type="tel" name="phone" placeholder="Phone Number" />
            <input type="email" name="email" placeholder="Email" />
            <textarea name="message" placeholder="Your Message"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Contact;
