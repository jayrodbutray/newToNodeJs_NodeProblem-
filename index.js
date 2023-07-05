// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');

// TODO: Create a function to write README file

function writeToFile(data) {
  fs.readFile('index.js', 'utf-8', (err) => {
    if (err) {
      console.error('Error reading index.js:', err);
    } else {
      console.log('README file has been created successfully!');
    }

    fs.writeFile('README.md', data, (err)=> {
        if (err) {
            console.log('Error writing to README.md:', err)
        } else {
            console.log('README.md file has been created successfully!');
        }
    });
  });
}

// TODO: Create an array of questions for user input
const questions = [
        {
            message: 'What is the title of your project',
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
        writeToFile('README.md');
      });
  })




// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
