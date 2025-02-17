import { useMutation, useQueryClient } from "react-query";
import { NewDiaryEntry, Visibility, Weather } from "../types";
import { useState } from "react";

const addEntryMutation = async (newEntry: NewDiaryEntry) => {
  const response = await fetch("http://localhost:3000/api/diaries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEntry),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
};

const AddNewEntry = () => {
  const [error, setError] = useState<string>();
  const client = useQueryClient();

  const mutation = useMutation(addEntryMutation, {
    onSuccess: () => client.refetchQueries("diaries"),
    onError: (e: Error) => setError(e.toString()),
  });

  // when form is submitted
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);

    const values = new FormData(e.target as HTMLFormElement);
    const newEntry: NewDiaryEntry = {
      date: values.get("date") as string,
      visibility: values.get("visibility") as Visibility,
      weather: values.get("weather") as Weather,
      comment: values.get("comment") as string,
    };

    mutation.mutate(newEntry);
  };

  if (mutation.isLoading) {
    return <p>Adding new entry...</p>;
  }

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <p>
          <label>
            Date:
            <input type="date" id="date" name="date" />
          </label>
        </p>
        <p>
          <span>Visibility:</span>
          <input type="radio" value="great" id="great" name="visibility" />
          <label htmlFor="great">Great</label>
          <input type="radio" value="good" id="good" name="visibility" />
          <label htmlFor="good">Good</label>
          <input type="radio" value="ok" id="ok" name="visibility" />
          <label htmlFor="ok">Ok</label>
          <input type="radio" value="poor" id="poor" name="visibility" />
          <label htmlFor="poor">Poor</label>
        </p>
        <p>
          <span>Weather:</span>
          <input type="radio" value="sunny" id="sunny" name="weather" />
          <label htmlFor="sunny">Sunny</label>
          <input type="radio" value="rainy" id="rainy" name="weather" />
          <label htmlFor="rainy">Rainy</label>
          <input type="radio" value="cloudy" id="cloudy" name="weather" />
          <label htmlFor="cloudy">Cloudy</label>
          <input type="radio" value="stormy" id="stormy" name="weather" />
          <label htmlFor="stormy">Stormy</label>
          <input type="radio" value="windy" id="windy" name="weather" />
          <label htmlFor="windy">Windy</label>
        </p>
        <p>
          <label>
            Comment:
            <input type="text" id="comment" name="comment" />
          </label>
        </p>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddNewEntry;
