const fs = require('fs');
const inquirer = require('inquirer');

// Function to write the README content to a file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error(`Error writing to ${fileName}:`, err);
    } else {
      console.log(`${fileName} file has been created successfully!`);
    }
  });
}

// Create an array of questions for user input
const questions = [
  {
    message: 'What is the title of your project?',
    name: 'title',
  },
  {
    message: 'Give a description of your project',
    name: 'description',
  },
  {
    message: 'What is your name?',
    name: 'name',
  },
  {
    message: 'What is your GitHub profile name?',
    name: 'GitHub',
  },
];

// Create a prompt
inquirer
  .prompt(questions)
  .then((answers) => {
    // Generate the README content using template literals
    const readmeContent = `
# ${answers.title}

## Table of Contents
- [Description](#description)
- [Author](#author)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Description <a name="description"></a>
${answers.description}

## Author <a name="author"></a>
${answers.name}

GitHub Profile: [${answers.GitHub}](https://github.com/${answers.GitHub})

## Installation <a name="installation"></a>
<!-- Add installation instructions here -->

## Usage <a name="usage"></a>
<!-- Add usage instructions here -->

## License <a name="license"></a>
<!-- Add license information here -->
`;

    // Write the README content to file
    writeToFile('README.md', readmeContent);
  })
  .catch((error) => {
    console.error('Error occurred during the prompt:', error);
  });




// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
