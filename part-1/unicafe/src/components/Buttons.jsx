const Buttons = ({ setGood, setNeutral, setBad }) => {
  const increment = state => state + 1;

  return (
    <div>
      <button onClick={() => setGood(increment)}>good</button>
      <button onClick={() => setNeutral(increment)}>neutral</button>
      <button onClick={() => setBad(increment)}>bad</button>
    </div>
  );
};
export default Buttons;
