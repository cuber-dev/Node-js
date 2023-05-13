
//  Blocking
const { readFileSync , writeFileSync } = require("fs")
// Doesn't Allows other tasks to run while doing file opearations


// Non-Blocking
const { readFile , writeFile } = require('fs')

// Allows other tasks to run while doing file opearations