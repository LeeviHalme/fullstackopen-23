import { parseArguments } from "./utils/parseBmiArgs";

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi < 18.5) return "Underweight range";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight range";
  return "Obese range";
};

// If the script is run directly, parse the command line arguments
if (require.main === module) {
  try {
    // parse command line arguments
    const { value1, value2 } = parseArguments(process.argv);

    console.log(calculateBmi(value1, value2));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
