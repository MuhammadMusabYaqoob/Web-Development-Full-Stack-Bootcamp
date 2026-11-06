// Problem 5: 3Sum
// Description: Find all unique triplets in the array which gives the sum of zero.


// Input: nums = [-1, 0, 1, 2, -1, -4]
// Output: [[-1, -1, 2], [-1, 0, 1]]


const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter numbers separated by commas: ", (input) => {

    let nums = input.split(",").map(Number);
    let triplets = [];
    for(let i=0;i<nums.length;i++){
        for(let j=i+1;j<nums.length;j++){
            for(let k=j+1;k<nums.length;k++){
                if(nums[i]+nums[j]+nums[k]===0){
                    triplets.push([nums[i],nums[j],nums[k]])
                }
            }
        }
    }
    console.log(`These are the trplets who's sum is zero:`)
    console.log(triplets)
    rl.close();
});
