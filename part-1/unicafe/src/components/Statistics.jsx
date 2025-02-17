import StatisticLine from "./StatisticsLine";

const Statistics = ({ good, bad, neutral }) => {
  const sum = (good, neutral, bad) => good + neutral + bad;

  const average = (good, neutral, b) => {
    const total = sum(good, neutral, b);
    const bad = -b;

    if (total === 0) return 0;

    return (good + bad) / total;
  };

  const positive = (good, total) => {
    if (total === 0) return 0;

    return (good / total) * 100;
  };

  return (
    <table>
      <tbody>
        <StatisticLine name="Good" value={good} />
        <StatisticLine name="Neutral" value={good} />
        <StatisticLine name="Bad" value={good} />
        <StatisticLine name="All" value={sum(good, neutral, bad)} />
        <StatisticLine name="Average" value={average(good, neutral, bad)} />
        <StatisticLine
          name="Positive"
          value={positive(good, sum(good, neutral, bad))}
        />
      </tbody>
    </table>
  );
};
export default Statistics;
