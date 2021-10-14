# Performance Testing POC

## Introduction

- This is the k6 automation testing project for Sirius Binary.

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

### Dependencies

- You need to have docker installed
- You need this playground deployed locally (https://github.com/antonyfuentes/testing-playground)

### Clone the repository

Replace <username> with your github username

```
git clone https://<username>@github.com/euribes/performance_automation_framework.git
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

## Run Performance tests

Run k6 tests

- To run it on docker

```
bash execute_tests.sh
```

## Contribution guidelines

- Writing tests
- Code review
- Other guidelines

## Steps to Write New Test Case in k6:

- Open the Code in IDE (`VSCode`, `Atom`, `Sublime Text`, etc...)
- Add a .js file under `/tests/` folder for the performance test case scenario
- Add the appropriate annotation for the test case based on the scenario.
