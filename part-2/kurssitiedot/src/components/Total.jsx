const Total = ({ course }) => {
  const total = course.parts.reduce((a, b) => a + b.exercises, 0);
  return <b>total of {total} exercises</b>;
};
export default Total;
