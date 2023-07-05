// TODO: Include packages needed for this application


// TODO: Create a function to write README file

/*function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('README file has been created successfully!');
    }
  });
}
writeToFile('README.md', 'Your README file.');
*/

const fs = require('fs');
const inquirer = require('inquirer');
// TODO: Create an array of questions for user input
const questions = [];

// Create a prompt
inquirer
  .prompt([
    {
        message: 'What is the title of your project',
        name: 'title',
    },
    {
      message: 'What is your name?',
      name: 'name',
    },
    {
        message: 'What is your GitHub profile name?',
        name: 'GitHub',
    },
  ])
  .then((answers) => {
    // The user's input will be available in the 'answers' object
    const name = answers.name;
    console.log(answers);

    const url = `https://api.github.com/users/${answers.GitHub}/repos`;
    fetch(url).then((response) => {
        return response.json();
    }).then((repos) => {
        console.log(repos);

        const repoList = repos.map((repo) => {
            const {full_name, html_url} = repo;

            return `<li><a href = ${html_url}>${full_name}</a></li>`;
        });


        const repoCode = `<ul>${repoList.join('')}</ul>`;

        console.log(repoCode);

        answers.repos = repoCode;

        let htmlContents = fs.readFileSync('index.tmpl.html', 'utf-8');

        for (const responseKey in answers){
            const templateKey = "{{" + responseKey + "}}"
            htmlContents = htmlContents.replaceAll(templateKey, answers[responseKey]);
        }
    
        const myPortfolio = htmlContents;
    
        fs.writeFileSync('index.html', myPortfolio);
        console.log('It is done');
      });
  });




// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
