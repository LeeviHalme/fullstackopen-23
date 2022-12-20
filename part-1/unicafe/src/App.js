import { useState } from "react";

// Components
import Buttons from "./components/Buttons";
import Statistics from "./components/Statistics";

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Buttons setGood={setGood} setNeutral={setNeutral} setBad={setBad} />
      {good + bad + neutral > 0 ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>no feedback given</p>
      )}
    </div>
  );
};

export default App;
