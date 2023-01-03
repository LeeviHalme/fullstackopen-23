const Persons = ({ persons, filter, confirmDelete }) => {
  return persons
    .filter(e => e.name.toUpperCase().includes(filter.toUpperCase()))
    .map(person => (
      <p key={person.id}>
        {person.name} {person.number}{" "}
        <button onClick={() => confirmDelete(person.id)}>delete</button>
      </p>
    ));
};
export default Persons;
