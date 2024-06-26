# Brains@Play
The Platform for Neural Interfaces

## The Problem
Currently, the decision to purchase neurotechnology hardware is a decision to purchase a walled garden. Each company has its own hardware—and each hardware has its own software. If you purchase a headset from one company, you are limited to the content that company, or its generous community of users, provides.

## The Vision
Everyone should be able to access the same content with any EEG headset. As such, we should reduce the incentive for neurotechnology companies to create walled gardens around their hardware.

This will allow for a more competitive market, where companies are forced to compete on the quality of their hardware—not the exclusivity of their software.

## The Solution
### Brains@Play
Brains@Play is a cross-platform app for neural interfaces. It leverages [Commoners](https://commoners.dev) for web, desktop, and mobile deployment.

Within Brains@Play, there are also several packages that can be used independently for other projects.
- [`brainsatplay`](./packages/brainsatplay) is a uniform API for accessing neural data across platforms. While compatile with any web-based project, this is designed to be used with [Commoners](https://commoners.dev) for cross-platform distribution on web, desktop, and mobile.
    - [`@brainsatplay/device`](./packages/@brainsatplay/device) is a base class for interfacing with neural devices.
    - [`@brainsatplay/muse`](./packages/@brainsatplay/muse) is a class for interfacing with Muse devices.
- [`muse-capacitor`](./packages/muse-capacitor) is a Muse API that works with Capacitor for iOS and Android deployment.

## Installation
### Python
You will need to have [miniconda](https://docs.conda.io/en/latest/miniconda.html) installed on your machine.

Create the Conda environment for the project by running the following command:

```bash
conda env create -f environment.yml 
```
This will install all the necessary Python dependencies for the project.

Once complete, activate the environment by running the following command:
```bash
conda activate vame-desktop
```

### Node.js
You will need to have [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/getting-started/install) installed on your machine.

This repository uses PNPM for package management. Install PNPM by running the following command:
```bash
corepack enable
corepack prepare pnpm@latest --activate
```

Install all packages by running the following command:
```bash
pnpm install
```

This only needs to be run once at project initialization and when the `package.json` dependencies are updated.

### Linking `brainsatplay`
You will need to link a local installation of `brainsatplay` during development. To do this, navigate to the `brainsatplay` directory and run the following command:
```bash
yarn link
```

Then, navigate back to the `neural` directory and run the following command:
```bash
yarn link brainsatplay
```

## Running the App
To run the app, you will need to run the following command:
```bash
npm run start
```

This will start the Electron app.

## Acknowledgements
This project is part of [Neural Interfaces](https://github.com/neuralinterfaces).