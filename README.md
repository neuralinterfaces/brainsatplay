# Brains@Play
The Platform for Neural Interfaces

## The Problem
It's hard to deny that current consumer choices around neurotechnology are motivated by access to one-off experiences (e.g. Muse meditation, Emotiv games, Neurosity productivity tools, etc.) rather than the quality of the hardware itself and the breadth of possible content that could be accessed with it. 

This is largely because hardware solutions are genereally limited to high-production content provided by that company—or, at best, their generous community of users.

## The Vision
We believe that **everyone should be able to access the same content with any EEG headset**. Breaking down walled gardens will lead to a more diverse and competitive market for neurotechnology. Instead of focusing on the exclusivity of their software, companies will be forced to compete on the quality of their hardware.

All stakeholders in the long-term viability of commercial neurotechnology, from hardware manufacturers to software developers to end users, should be invested in increased interoperability within the neurotechnology ecosystem.

This is where Brains@Play comes in.

## What is Brains@Play?
Brains@Play is a cross-platform system for accessing brain-responsive applications compatible with a wide range of neurotechnology devices. It leverages [Commoners](https://commoners.dev) for web, desktop, and mobile deployment.

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
conda activate brainsatplay
```

### Node.js
You will need to have [Node.js](https://nodejs.org/en/) installed on your machine.

This repository uses PNPM for package management. Install PNPM by running the following command:
```bash
npm install -g pnpm
```

Install all packages by running the following command:
```bash
pnpm install
```

This only needs to be run once at project initialization and when the `package.json` dependencies are updated.

#### Linking to Local `commoners` Package
If you are working on the `commoners` package locally, you will need to link to it in this project. To do so, run the following command:
```bash
pnpm link ~/Documents/Github/commoners/packages/cli
pnpm link ~/Documents/Github/commoners/packages/core
```

## Running the App
To run the app, you will need to run the following command:
```bash
npm run start
```

This will start the Electron app.

## Acknowledgements
This project is part of [Neural Interfaces](https://github.com/neuralinterfaces).