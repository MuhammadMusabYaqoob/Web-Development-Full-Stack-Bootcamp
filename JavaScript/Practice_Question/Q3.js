// Problem 3: Remove Duplicates from Sorted Array
// Description: Remove duplicates in-place such that each unique element appears only once. Return the number of unique elements.


// Input: nums = [1, 1, 2]
// Output: 2, nums = [1, 2, _]




const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("Enter numbers separated by commas: ", (input) => {
    let nums = input.split(",").map(Number);
    let unique_array = []


    for(let i = 0; i < nums.length; i++){

        if(!unique_array.includes(nums[i])){
            unique_array.push(nums[i]);
        }
    }
    console.log(`Original Array ${nums}`)
    console.log(`Original Array length ${nums.length}`)
    console.log(`Unique Array ${unique_array}`)
    console.log(`Unique Array length ${unique_array.length}`)
    rl.close();
})


