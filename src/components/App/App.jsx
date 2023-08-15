import css from './app.module.css';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

export const App = () => {
  return (
    <div className={css.phonebook}>
      <div className={css.section}>
        <h2>Phonebook</h2>
        <ContactForm />
      </div>
      <div className={`${css.section} ${css.contactSection}`}>
        <h2>Contacts</h2>
        <Filter />
        <ContactList />
      </div>
    </div>
  );
};
