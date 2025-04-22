import React from "react";

const ContactList = ({ contacts, updateContact, updateCallback }) => {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error(`Failed to delete contact with id ${id}`);
        return;
      }

      updateCallback();
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact.");
    }
  };

  return (
    <div className="contact-list">
      <h2>Contacts</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan="4">No contacts available.</td>
            </tr>
          ) : (
            contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.email}</td>
                <td>
                  <button onClick={() => updateContact(contact)}>Update</button>
                  <button onClick={() => handleDelete(contact.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
