# Requirements to run the project

# Table of Contents

- [Project Tools Installation](#project-tools-installation)
  - [Node.js](#nodejs)
  - [VSCode](#vscode)
  - [Git](#git)
  - [yarn](#yarn)
  - [PostgreSQL](#postgresql)
- [How to run the project](#how-to-run-the-project)
  - [Frontend](#frontend)
  - [Backend](#backend)

# Project Tools Installation

## Node.js

You would need `Node.js` to successfully run the frontend and backend. Go to the [official docs](https://nodejs.org/) to download and install the latest stable version for your operating system.

`npm` comes pre-installed with `Node.js`

## VSCode

We primarily use Visual Studio Code for the development of the project. The editor can be downloaded from the [official docs](https://code.visualstudio.com/).

*Note:* Any IDE will work here, but for the best developer experience we recommend VSCode.

Once installed and set up, please install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) VSCode extensions.

*Note:* This is not a necessary step, but for viewing lint errors and easy formatting when coding we do recommend using these tool extensions.

## Git

For our source code management and version control we use a tool called `Git`. You can install it from [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## yarn

We use `yarn` instead of `npm` to install and manage our dependencies for the project. We use the `Yarn Workspaces` for managing our mono-repo source code.

You should install this tool globally on your local machine using `npm`:

```bash
# version 1.22.19 is the specific version we use, it's important that you use it too!
npm install -g yarn@1.22.19
```

## PostgreSQL

PostgreSQL is the database management tool used in the project. You can install it from [here](https://www.postgresql.org/download/).

# How to run the project?

You can clone the project by running the following in the terminal:

```bash
git clone https://github.com/MyGREPrep/MyGREPrep.git
```

## Frontend

**Step 1:** You would need to install the dependencies.

```bash
cd frontend
yarn install
```

*Step 2:* Build and run the frontend app from terminal:

```bash
cd frontend
yarn start
```

**Step 3:** Scan the QR code generated using the Expo app

You should now be able to use the MyGREPrep mobile app.

## Backend

**Step 1:** Step up the environment variables. Create a `.env` file in the root of `api/` in the mono repo. You can find the [`.env.example`](https://github.com/MyGREPrep/MyGREPrep/blob/main/api/.env.example), which lists all the environment variables required.

```
# What port you want the backend to run at? Feel free to give any port number, as long as it is not currently used by another process
PORT=5000

# What is your dbname?
POSTGRES_DBNAME=mygreprep

# PostgreSQL username. If you haven't set a username during installation, leave it blank. Most of the time, it's the below value.
POSTGRES_USER=postgres

# PostgreSQL password. If you haven't set a password during installation, leave it blank.
POSTGRES_PASSWORD=
```
**Step 2:** Install Redis

**Step 3:** Run the following command in the terminal to compile `TypeScript` code into `JavaScript`code in watch mode. Watch mode continuously compiles `ts` code into `js` code when code is changed, thus not needing to compile `ts` code all the time manually.

```bash
yarn watch
```

**Step 3:** Open a new terminal window, and run the following command:

```bash
yarn dev
```

This should start the backend server. Visiting `http://localhost:${YOUR_PORT_NUMBER}` in the browser should send a GET request to the `api` and it responds with "MyGrePrep API says hello".




