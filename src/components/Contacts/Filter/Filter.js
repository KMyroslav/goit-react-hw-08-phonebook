import shortid from "shortid";
import propTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../../../redux/actions";

function Filter({ filter, setFilter }) {
  const filterInputId = shortid.generate();
  return (
    <div>
      <label htmlFor={filterInputId}>Find contacts by name</label>
      <input
        id={filterInputId}
        type="text"
        name="filter"
        value={filter}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Casnumbermore d'Artagnan и т. п."
        onChange={(e) => setFilter(e.currentTarget.value)}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

Filter.propTypes = {
  filter: propTypes.string,
  setFilter: propTypes.func.isRequired,
};
