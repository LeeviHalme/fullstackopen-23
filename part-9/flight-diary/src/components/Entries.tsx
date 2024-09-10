import { useQuery } from "react-query";
import { DiaryEntry } from "../types";

const diaryQuery = async (): Promise<DiaryEntry[]> => {
  const response = await fetch("http://localhost:3000/api/diaries");
  return response.json();
};

const Entries = () => {
  const query = useQuery(["diaries"], diaryQuery);

  if (query.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Diary entries</h2>
      <ul>
        {query.data?.map(entry => (
          <li key={entry.id}>
            <b>{entry.date}</b>
            <p>Weather: {entry.weather}</p>
            <p>Visibility: {entry.visibility}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Entries;
