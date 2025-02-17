import { parseArguments } from "./utils/parseExerciseArgs";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (dailyExercises: number[], target: number): Result => {
  const periodLength = dailyExercises.length;
  const average = dailyExercises.reduce((a, b) => a + b) / periodLength;
  const rating = average < target ? 1 : average === target ? 2 : 3;
  const ratingDescription =
    rating === 1 ? "You can do better!" : rating === 2 ? "Great!" : "You're killing it!";

  return {
    periodLength,
    trainingDays: dailyExercises.filter(day => day > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// If the script is run directly, parse the command line arguments
if (require.main === module) {
  try {
    // parse command line arguments
    const { value1, value2 } = parseArguments(process.argv);

    console.log(calculateExercises(value1, value2));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
