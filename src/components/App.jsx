import { useDispatch, useSelector } from 'react-redux/es/exports';
import Section from './Section';
import ContactList from './ContactList';
import Phonebook from './Phonebook';
import Filter from './Filter';
import s from './App.module.css';
import capitalize from 'utils/capitalize';
import actions from 'redux/actions';

const App = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const addContact = newContact => {
    let doesAlreadyExist = false;
    contacts.forEach(({ name }) => {
      doesAlreadyExist = name === newContact.name;
    });

    if (doesAlreadyExist) {
      alert(
        `${capitalize(
          newContact.name
        )}is already in contacts.`
      );
      return;
    }

    dispatch(actions.addContact({ newContact }));
    dispatch(actions.saveContacts());
  };

  const handleFilterInput = event => {
    dispatch(actions.changeFilter({ filter: event.target.value }));
    dispatch(actions.saveFilter());
  };

  const filterContacts = contacts => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = targetId => {
    dispatch(actions.deleteContact({ targetId }));
    dispatch(actions.saveContacts());
  };

  const handleDeleteContactBtnClick = event => {
    deleteContact(event.target.dataset.id);
  };

  return (
    <div className={s.container}>
      <div className={s.app}>
        <Section title="Phonebook">
          <Phonebook addContact={addContact} />
        </Section>
        <Section title="Contacts">
          <Filter name={filter} inputHandler={handleFilterInput} />
          <ContactList
            contacts={filterContacts(contacts)}
            deleteBtnHandler={handleDeleteContactBtnClick}
          />
        </Section>
      </div>
    </div>
  );
};

export default App;
