// Problem 1: Two Sum
// Description: Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Assume each input has exactly one solution.


// Input: nums = [2, 7, 11, 15], target = 9
// Output: [0, 1]
// Constraints: 2 <= nums.length <= 10^4

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter numbers separated by commas: ", (input) => {

    let nums = input.split(",").map(Number);

    rl.question("Enter target sum: ", (targetInput) => {

        let target = Number(targetInput);
        let found = false;







        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] === target) {
                    console.log(`Pair found: ${nums[i]} and ${nums[j]}`);
                    console.log(`Indices: ${i} and ${j}`);
                    found = true;
                    break;
                }

            }

            if (found) {
                break;
            }
        }

        if (!found) {
            console.log("No solution found");
        }

        rl.close();
    });
});