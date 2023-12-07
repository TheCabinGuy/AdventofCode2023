import { readFile } from "../utils.js";

const testInput =
  "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n" +
  "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n" +
  "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n" +
  "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n" +
  "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green";

const data = readFile("Day2/puzzle-input.txt");

const formattedData = data
  .split("\n")
  .filter(Boolean)
  .reduce((totalGames, currentGames) => {
    const [gameId, gamesData] = currentGames.split(":");
    return {
      ...totalGames,
      [gameId.replace("Game ", "")]: gamesData.split(";").map((gameData) => {
        return gameData
          .trim()
          .split(", ")
          .reduce((totalCubes, currentCubes) => {
            const [numberOfCubes, cubeColour] = currentCubes.split(" ");
            return {
              ...totalCubes,
              [cubeColour]: Number(numberOfCubes),
            };
          }, {});
      }),
    };
  }, {});

const maxCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const answer1 = Object.entries(formattedData).reduce(
  (total, [id, gamesData]) => {
    const belowMaxCubes = gamesData.every((gameData) => {
      return Object.entries(maxCubes).every(
        ([cubeColour, maxValue]) => (gameData[cubeColour] || 0) <= maxValue,
      );
    });
    if (belowMaxCubes) {
      return total + Number(id);
    }
    return total;
  },
  0,
);

console.log(answer1);

const answer2 = Object.values(formattedData).reduce((total, current) => {
  return (
    Object.values(
      current.reduce(
        (totalCubes, currentGame) => {
          return {
            red:
              currentGame.red > totalCubes.red
                ? currentGame.red
                : totalCubes.red,
            green:
              currentGame.green > totalCubes.green
                ? currentGame.green
                : totalCubes.green,
            blue:
              currentGame.blue > totalCubes.blue
                ? currentGame.blue
                : totalCubes.blue,
          };
        },
        { red: 0, green: 0, blue: 0 },
      ),
    ).reduce((a, b) => a * b, 1) + total
  );
}, 0);

console.log(answer2);
