# UI Automation POC

## Introduction

This is the cypress automation testing project for Sirius Binary. It contains a Cypress project.

## Configuration

### Node Config

Install node locally using `nvm`. You can follow the instructions
[here](https://heynode.com/tutorial/install-nodejs-locally-nvm) or (on MacOS or
Linux with Bash) you can run the following in a shell:

```bash
curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh -o install_nvm.sh
bash install_nvm.sh
source ~/.bash_profile
nvm install 12.3.1
node --version
```

### Clone the repository

Replace <username> with your bitbucket username

```
git clone https://<username>@bitbucket.org/sparkcognition/deep-nlp-qa.git
```

Install dependencies with the following command

```
npm install
```

### Install the following VSCODE extensions

- alexkrechik.cucumberautocomplete
- stevejpurves.cucumber
- aravindkumar.gherkin-indent
- dbaeumer.vscode-eslint
- esbenp.prettier-vscode

### Setup vscode

- Check if you see double check on the right down corner with Prettier
- Check if you have the following
  - Open a Feature file and check that you have "Ident using spaces" = 4
  - Open a javascript file and check that you have "Ident using spaces" = 2

### Run Cypress

Run cypress testing

- To open Cypress Runner

```
npx cypress open
```

- To run Cypress in console (general command)

```
npx cypress run
```

- To run Cypress in console with specific parameters

| Parameter       | Description                                                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| tag             | Each test case has a tag, it depends on the feature file and the type of testing. For instance if you want to run just |
|                 | regression test cases, use '@regression'                                                                               |
| config env file | This is the deepnlp .env file configuration file.                                                                      |
| browser         | Browser to run automated scripts, it can be 'chrome', 'firefox', 'electron' (default)                                  |

Example:

```
npx cypress run -e TAGS="not @ignore and not @fix and @<tag>" --browser <browser>
```

Mate sure cypress configuration file has the correct baseUrl value. It should be the URL of the environment to test

### Contribution guidelines

- Writing tests
- Code review
- Other guidelines

## Steps to Write New Test Case in Cypress:

- Open the Code in IDE (`VSCode`, `Atom`, `Sublime Text`, etc...)
- Add a .feature file under `/integration/` folder for the BDD test case scenario
- Add the appropriate annotation for the test case based on the scenario.
- If the feature file have methods that are already existing re-use them.
- If they are new method add the methods based on the page (if so add new folder for that page) under `/integration/<page_name>/` which are called `spec` files Eg: `/integration/collections/collections.js`
- Add the page locators (HTML DOM IDs) in there respective pages.
- Add common methods under the `/integration/common/<page_common.js>` Eg: `/integration/helper.js`

## PR checklist :

- https://sparkcognition.atlassian.net/wiki/spaces/DEEP/pages/1899888641/PR+Checklist

## Test Rail :

- https://sparkcognition.testrail.net/index.php?/projects/overview/5
