// Problem 4: Move Zeroes
// Description: Move all 0's to the end of an array while maintaining the relative order of non-zero elements. Must do this in-place.


// Input: nums = [0, 1, 0, 3, 12]
// Output: [1, 3, 12, 0, 0]



const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter numbers separated by commas: ", (input) => {

    let nums = input.split(",").map(Number);

    nums.sort((a, b) => {
        if (a === 0) return 1;
        if (b === 0) return -1;
        return 0;
    });

    console.log(`Modified Array: ${nums}`);

    rl.close();
});
