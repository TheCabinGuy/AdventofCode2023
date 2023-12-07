import { readFile } from "../utils.js";

const testInput = "1abc2\n" + "pqr3stu8vwx\n" + "a1b2c3d4e5f\n" + "treb7uchet";

const data = readFile("Day1/puzzle-input.txt");

const answer1 = data
  .split("\n")
  .map((a) => a.split("").filter((a) => !isNaN(Number(a))))
  .reduce((total, current) => {
    if (!current.length) {
      return total;
    }
    return [...total, Number(current[0].concat(current[current.length - 1]))];
  }, [])
  .reduce((a, b) => a + b, 0);

const numberWords = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

console.log(answer1);

const testInput2 =
  "two1nine\n" +
  "eightwothree\n" +
  "abcone2threexyz\n" +
  "xtwone3four\n" +
  "4nineeightseven2\n" +
  "zoneight234\n" +
  "7pqrstsixteen";

const answer2 = data
  .split("\n")
  .map((line) => {
    return numberWords.reduce((total, current, index) => {
      const tempArr = current.split("");
      tempArr.splice(Math.floor(current.length / 2), 0, (index + 1).toString());
      return total.replaceAll(current, tempArr.join(""));
    }, line);
  })
  .map((a) => a.split("").filter((a) => !isNaN(Number(a))))
  .reduce((total, current) => {
    if (!current.length) {
      return total;
    }
    return [...total, Number(current[0].concat(current[current.length - 1]))];
  }, [])
  .reduce((a, b) => a + b, 0);

console.log(answer2);
