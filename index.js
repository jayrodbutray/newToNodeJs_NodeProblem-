// TODO: Include packages needed for this application

// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
const fs = require('fs');
const { default: inquirer } = require('inquirer');

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('README file has been created successfully!');
    }
  });
}
writeToFile('README.md', 'Your README file.');

inquirer
.prompt([
    {
        type: 'input',
        message: 'What is your name',
        name: 'name',
    },
    {
        type: 'input'
    }
]);


// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
