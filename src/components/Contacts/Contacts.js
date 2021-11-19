import Filter from "./Filter/Filter";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";

export default function Contacts() {
  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </>
  );
}
