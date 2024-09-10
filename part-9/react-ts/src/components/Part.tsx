import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const Part = (props: PartProps) => {
  const renderedItems: JSX.Element[] = [
    <p key="name">
      <b>
        {props.part.name} {props.part.exerciseCount}
      </b>
    </p>,
  ];

  switch (props.part.kind) {
    case "basic":
      renderedItems.push(<i key="description">{props.part.description}</i>);
      break;
    case "group":
      renderedItems.push(
        <p key="groupProjectCount">project exercises: {props.part.groupProjectCount}</p>
      );
      break;
    case "background":
      renderedItems.push(<i key="description">{props.part.description}</i>);
      renderedItems.push(
        <p key="backgroundMaterial">submit to: {props.part.backgroundMaterial}</p>
      );
      break;
    case "special":
      renderedItems.push(<i key="description">{props.part.description}</i>);
      renderedItems.push(
        <p key="requirements">required skills: {props.part.requirements.join(", ")}</p>
      );
      break;
  }

  return renderedItems;
};

export default Part;
