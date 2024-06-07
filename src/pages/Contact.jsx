import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const form = useRef();
  const [showModal, setShowModal] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_wa0yd3l', 'template_qaj9wae', form.current, 'bXrP-CLR97T18YjRS')
      .then(
        () => {
          console.log('SUCCESS!');
          setShowModal(true);
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section>
      <div className='px-4 mx-auto max-w-screen-md'>
        <h2 className='heading text-center'>Contact Us</h2>
        <p className='mb-8 lg:mb-16 font-light text-center text__para'>
          Got a technical issue? Want to send feedback about a beta feature? Let us know!
        </p>
        <form ref={form} className='space-y-8' onSubmit={sendEmail}>
          <div>
            <label htmlFor="name" className='form__label'>Name</label>
            <input type="text" name="user_name" placeholder='Your name' className='form__input mt-1' required />
          </div>
          <div>
            <label htmlFor="email" className='form__label'>Email</label>
            <input type="email" name="user_email" placeholder='example@gmail.com' className='form__input mt-1' required />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className='form__label'>Your message</label>
            <textarea rows='6' name="message" placeholder='Leave a comment....' className='form__input mt-1' required />
          </div>
          <button type="submit" className="btn rounded sm:w-fit">Submit</button>
        </form>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg text-center">
              <p>Your message has been sent successfully!</p>
              <button className="mt-4 btn rounded" onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Contact;
