# Brains@Play
A Cross-Platform Application for 8 Billion Brains

[![All Contributors](https://img.shields.io/github/all-contributors/neuralinterfaces/brainsatplay?color=ee8449&style=flat-square)](#contributors)


## Getting Started
### Installation
#### Python
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

#### Node.js
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

### Running the App
To run the app, you will need to run the following command:
```bash
npm run start
```

This will start the Electron app.

## Packages

| Package                                         | Version (click for changelogs)                                                                                                    |
| ----------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| [brainsatplay](packages/brainsatplay)                           | [![brainsatplay version](https://img.shields.io/npm/v/brainsatplay.svg?label=%20)](./packages/brainsatplay/CHANGELOG.md)                                    |
| [@brainsatplay/device](packages/@brainsatplay/device) | [![@brainsatplay/device version](https://img.shields.io/npm/v/@brainsatplay/device.svg?label=%20)](packages/@brainsatplay/device/CHANGELOG.md) |
| [@brainsatplay/muse](packages/@brainsatplay/muse)             | [![@brainsatplay/muse version](https://img.shields.io/npm/v/@brainsatplay/muse.svg?label=%20)](packages/@brainsatplay/muse/CHANGELOG.md)               |
| [muse-capacitor](packages/muse-capacitor)             | [![muse-capacitor version](https://img.shields.io/npm/v/muse-capacitor.svg?label=%20)](packages/muse-capacitor/CHANGELOG.md)               |


## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## Acknowledgements
This project is part of [Neural Interfaces](https://github.com/neuralinterfaces).
