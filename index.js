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
      message: 'How do we install your project?',
      name: 'installation',
  },
  {
    message: 'How will your project be used?',
    name: 'usage',
  },
  {
    message: 'Choose a license for your project:',
    name: 'license',
    type: 'list',
    choices: [
      {name:'MIT license', value:'MIT', badge:'MIT'},
      {name:'Apache License 2.0', value:'Apache-2.0', badge:'Apache-2.0'},
      {name:'GNU GPL v3', value:'GPL-3.0', badge:'GPL-3.0'},
      {name:'ISC License', value:'ISC', badge:'ISC'},
      {name: 'No License', value:'No License'},
    ],
  },
  {
    message: 'Who and what will be contributed to this project?',
    name: 'contribution',
  },
  {
    message: 'How will your project be tested?',
    name: 'test',
  },
  {
    message: 'What is your email?',
    name: 'email',
  },
  {
    message: 'What is your GitHub profile name?',
    name: 'questions',
  },
];

function generateLicenseNotice(license) {
  if (license === 'MIT') {
    return `
This application is covered under the [MIT License](https://opensource.org/licenses/MIT).`;
  } else if (license === 'Apache-2.0') {
    return `
This application is covered under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).`;
  } else if (license === 'GPL-3.0') {
    return `
This application is covered under the [GNU GPL v3 License](https://www.gnu.org/licenses/gpl-3.0.en.html).`;
  } else if (license === 'ISC') {
    return `
This application is covered under the [ISC License](https://opensource.org/licenses/ISC).`;
  } else {
    return `
This application is not covered under any specific license.`;
  }
}
// Create a prompt
inquirer
  .prompt(questions)
  .then((answers) => {

    let licenseBadge = '';
    const selectedLicense = questions.find((question) => question.name === 'license'
    ).choices.find((choice)=> choice.value ===answers.license);
    if (selectedLicense && selectedLicense.badge) {
      licenseBadge = `![License](https://img.shields.io/badge/license-${selectedLicense.badge})`;
    }

    // Generate the README content using template literals
    const readmeContent = `
# ${answers.title}

${licenseBadge}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contribution)
- [Testing](#test)
- [Questions](#questions)

## Description <a name="description"></a>
${answers.description}

## Installation <a name="installation"></a>
${answers.installation}

## Usage <a name="usage"></a>
${answers.usage}

## License <a name="license"></a>
${generateLicenseNotice(answers.license)}

## Contributing <a name="contribution"></a>
${answers.contribution}

## Tests <a name="test"></a>
${answers.test}

## Questions <a name="questions"></a>
For any questions or concerns regarding this project, please contact me at ${answers.email}.

GitHub Profile: [${answers.questions}](https://github.com/${answers.questions})
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
