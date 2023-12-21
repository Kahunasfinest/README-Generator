const readline = require('readline');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');

// TODO: Include packages needed for this application

// TODO: Create an array of questions for user input
const questions = ["What is the title of your project? ", "What is the description of your project? ", "What are the installation instructions for your project? ", "What is the usage of your project? ", "Enter text for 'Contributing' Section: ", "Enter your project's tests: ", "Enter the number of your chosen license: ", "What is your GitHub username? ", "What is your email address? "];
// array of licenses
const licenses = ["Academic Free License v3.0", "Apache license 2.0", "Artistic license 2.0", "Boost Software License 1.0", "BSD 2-clause 'Simplified' license", "BSD 3-clause 'New' or 'Revised' license", "BSD 3-clause Clear license", "BSD 4-clause 'Original' or 'Old' license", "BSD Zero-Clause license", "Creative Commons license family", "Creative Commons Zero v1.0 Universal", "Creative Commons Attribution 4.0", "Creative Commons Attribution ShareAlike 4.0", "Do What The F*ck You Want To Public License", "Educational Community License v2.0", "Eclipse Public License 1.0", "Eclipse Public License 2.0", "European Union Public License 1.1", "GNU Affero General Public License v3.0", "GNU General Public License family", "GNU General Public License v2.0", "GNU General Public License v3.0", "GNU Lesser General Public License family", "GNU Lesser General Public License v2.1", "GNU Lesser General Public License v3.0", "ISC", "LaTeX Project Public License v1.3c", "Microsoft Public License", "MIT", "Mozilla Public License 2.0", "Open Software License 3.0", "PostgreSQL License", "SIL Open Font License 1.1", "University of Illinois/NCSA Open Source License", "The Unlicense", "zLib License"];
    
// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    // generate markdown
    const finaltext = generateMarkdown(data);
    // write to README.md
    fs.writeFileSync(fileName, finaltext, 'utf-8');
    // console.log("Successfully wrote to", fileName)
}

const readinterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let title, description, installation, usage, license, contributing, tests, githubusername, email;

function askQuestion(index) {
    if (index === questions.length) {
        readinterface.close();  
        writeToFile("README.md", { title, description, installation, usage, license, contributing, tests, githubusername, email });
        console.log("Successfully wrote to README.md");
        return;
    }

    if (index === 6) {
        console.log("Please choose a license by entering its number:");
        licenses.forEach((license, index) => {
            console.log(`${index + 1}. ${license}`);
        });
    }

    readinterface.question(questions[index], (data) => {
        if (index === 0) {
            title = data;
        } else if (index === 1) {
            description = data;
        } else if (index === 2) {
            installation = data;
        } else if (index === 3) {
            usage = data;
        } else if (index === 4) {
            contributing = data;
        } else if (index === 5) {
            tests = data;
        } else if (index === 6) {
            const chosenIndex = parseInt(data) - 1;
            while (chosenIndex < 0 || chosenIndex >= licenses.length) {
                readinterface.question("Please enter a valid license number: ", (data) => {
                    chosenIndex = parseInt(data) - 1;
                });
            }
            license = licenses[chosenIndex];
        } else if (index === 7) {
            githubusername = data;
        } else if (index === 8) {
            email = data;
        }

        askQuestion(index + 1);
    });
}

// TODO: Create a function to initialize app
function init() {
    /*
        GIVEN a command-line application that accepts user input
        WHEN I am prompted for information about my application repository
        THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description
            Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
        WHEN I enter my project title
        THEN this is displayed as the title of the README
        WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
        THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
        WHEN I choose a license for my application from a list of options
        THEN a badge for that license is added near the top of the README and a notice is added to the section of the READM
            entitled License that explains which license the application is covered under
        WHEN I enter my GitHub username
        THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
        WHEN I enter my email address
        THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
        WHEN I click on the links in the Table of Contents
        THEN I am taken to the corresponding section of the README

    */
    askQuestion(0);
}

// Function call to initialize app
init();
