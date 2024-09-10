interface Arguments {
  value1: number[];
  value2: number;
}

export const parseArguments = (args: string[]): Arguments => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const values = args.slice(3).map(arg => Number(arg));
  const containsNaNs = values.some(value => isNaN(value));

  if (!isNaN(Number(args[2])) && !containsNaNs) {
    return {
      value1: values,
      value2: Number(args[2]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};
