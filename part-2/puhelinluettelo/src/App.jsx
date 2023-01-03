import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";

// Components
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({ text: null, error: true });

  const onChange = e => setNewName(e.target.value);
  const numberOnChange = e => setNewNumber(e.target.value);
  const filterOnChange = e => setFilter(e.target.value);

  // When user is created (form is submitted)
  const onSubmit = async e => {
    e.preventDefault();
    const existing = persons.find(p => p.name === newName);

    if (existing) {
      // Ask user for permission to override data
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        try {
          const updatedPerson = { name: newName, number: newNumber };
          const response = await phonebookService.update(
            existing.id,
            updatedPerson
          );
          setPersons(state =>
            state.map(person => (person.id === existing.id ? response : person))
          );
          setMessage({ text: `Updated ${newName}`, error: false });
        } catch (error) {
          setMessage({
            text: `Information of ${newName} has already been removed from server`,
            error: true,
          });
        }
      }
    } else {
      try {
        const newPerson = { name: newName, number: newNumber };
        const response = await phonebookService.create(newPerson);
        setPersons(state => [...state, response]);
        setMessage({ text: `Added ${newName}`, error: false });
      } catch (error) {
        console.log("error while adding a person to phonebook", error);
        setMessage({ text: `Error: ${error.message}`, error: true });
      }
    }
  };

  // Initially, fetch data from server
  const fetchData = async () => {
    const response = await phonebookService.getAll();
    setPersons(response);
  };

  // Confirm user delete action
  const confirmDelete = async id => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      try {
        await phonebookService.remove(id);
        setPersons(state => state.filter(person => person.id !== id));
        setMessage({ text: `Removed ${person.name}`, error: false });
      } catch (error) {
        setMessage({
          text: `Information of ${person.name} has already been removed from server`,
          error: true,
        });
      }
    }
  };

  // componentDidMount
  useEffect(() => {
    // Fetch data
    fetchData();
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification {...message} />
      <Filter filter={filter} onChange={filterOnChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={onSubmit}
        onChange={onChange}
        numberOnChange={numberOnChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        confirmDelete={confirmDelete}
      />
    </div>
  );
};

export default App;
