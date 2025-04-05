import { useState, useEffect } from "react";

function ContactForm({ existingContact, updateCallback }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (existingContact) {
      setName(existingContact.name || "");
      setEmail(existingContact.email || "");
    }
  }, [existingContact]);

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
      body: JSON.stringify({ name, email }),
    });

    updateCallback();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label><br />
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label><br />
        <input value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <button type="submit">{existingContact?.id ? "Update" : "Create"}</button>
    </form>
  );
}

export default ContactForm;
