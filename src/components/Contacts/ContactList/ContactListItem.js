import Loader from "react-loader-spinner";
import { useDeleteContactMutation } from "../../../redux/contactsSlice";

export default function ContactListItem({ el }) {
  const [deleteContact, { isLoading: deleteIsLoading }] =
    useDeleteContactMutation();
  return (
    <p>
      {el.name}: {el.phone}
      <button
        type="button"
        data-id={el.id}
        onClick={() => {
          deleteContact(el.id);
        }}
        disabled={deleteIsLoading}
      >
        {deleteIsLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={15} width={45} />
        ) : (
          "Delete"
        )}
      </button>
    </p>
  );
}
