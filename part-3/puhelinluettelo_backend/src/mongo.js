const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.mvu4whg.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length !== 5) {
  Person.find({}).then(people => {
    console.log("phonebook:");
    people.forEach(p => console.log(p.name, p.number));
    // console.log(people);
    mongoose.connection.close();
  });
} else {
  const name = process.argv[3];
  const number = process.argv[4];
  const person = new Person({ name, number });

  person.save().then(() => {
    console.log("person saved!");
    mongoose.connection.close();
  });
}
