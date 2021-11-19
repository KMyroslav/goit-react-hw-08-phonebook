import propTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { useGetContactsQuery } from "../../../redux/contactsSlice";
import actions from "../../../redux/actions";
import ContactListItem from "./ContactListItem";

function ContactList({ filter }) {
  const { data, isLoading: contactsIsLoading } = useGetContactsQuery();
  return (
    <div>
      {contactsIsLoading && (
        <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
      )}
      {data &&
        data
          .filter((obj) =>
            obj.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((el) => <ContactListItem key={el.id} el={el} />)}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (filter) => dispatch(actions.setFilter(filter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

ContactList.propTypes = {
  filter: propTypes.string.isRequired,
};
