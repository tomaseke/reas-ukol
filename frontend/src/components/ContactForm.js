import React from "react";

const ContactForm = ({ enteredInfo, setter }) => {
  function changeInfo(e) {
    setter({ ...enteredInfo, [`${e.target.id}`]: `${e.target.value}` });
  }

  return (
    <section className="contact-details">
      <h1>Zadejte kontaktní údaje</h1>
      <label htmlFor="name" className="contact-label">
        Celé jméno
        <input
          type="text"
          name="contact-details"
          id="name"
          onChange={changeInfo}
          className="contact-input"
          required
        />
      </label>
      <label htmlFor="phone" className="contact-label">
        Telefonní číslo
        <input
          type="text"
          name="contact-details"
          id="phone"
          onChange={changeInfo}
          className="contact-input"
          required
        />
      </label>
      <label htmlFor="email" className="contact-label">
        Email
        <input
          type="email"
          name="contact-details"
          id="email"
          onChange={changeInfo}
          className="contact-input"
          required
        />
      </label>
    </section>
  );
};

export default ContactForm;
