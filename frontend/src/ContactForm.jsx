import { useState, useEffect } from "react";

function ContactForm({ existingContact, updateCallback }) {
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    if (existingContact) {
      setForm({
        name: existingContact.name || "",
        email: existingContact.email || "",
      });
    } else {
      setForm({ name: "", email: "" });
    }
  }, [existingContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = existingContact?.id ? "PUT" : "POST";
    const url = existingContact?.id
      ? `http://127.0.0.1:5000/contacts/${existingContact.id}`
      : `http://127.0.0.1:5000/contacts`;

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    updateCallback();
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label><br />
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label><br />
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">
        {existingContact?.id ? "Update" : "Create"}
      </button>
    </form>
  );
}

export default ContactForm;
