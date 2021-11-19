import { useState, useRef } from "react";
import shortid from "shortid";
import Loader from "react-loader-spinner";
import { useAddContactMutation } from "../../../redux/contactsSlice";

function ContactForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const nameInputId = useRef(shortid.generate());
  const numberInputId = useRef(shortid.generate());
  const [addContact, { isLoading }] = useAddContactMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addContact({ name, number });
    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor={nameInputId}>Name</label>
        <input
          id={nameInputId}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Casnumbermore d'Artagnan и т. п."
          required
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
      </div>
      <div className="input-wrapper">
        {" "}
        <label htmlFor={numberInputId}>Number</label>
        <input
          id={numberInputId}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          onChange={(e) => {
            setNumber(e.currentTarget.value);
          }}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={20} width={85} />
        ) : (
          "Add contact"
        )}
      </button>
    </form>
  );
}

export default ContactForm;
