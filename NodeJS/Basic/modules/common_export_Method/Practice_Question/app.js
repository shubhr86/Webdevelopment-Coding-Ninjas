// Import the exported functions from math.js
import  { sum, mean } from './math.js';

// Define a function called Solution
const Solution = () => {
    // Create an array of numbers
    const nums = [1, 2, 3, 4, 5];

    // Calculate the sum using the imported sum function
    const sumResult = sum(nums);

    // Calculate the mean using the imported mean function
    const meanResult = mean(nums);

    // Display the calculated sum and mean on the console
    console.log(`The sum is ${sumResult}.`);
    console.log(`The mean is ${meanResult}.`);
};

Solution();
module.exports = Solution;
