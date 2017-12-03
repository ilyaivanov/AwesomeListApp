### Overview
There exist tons of online knowledge captured in metalist. Would be great to have a mobile app to access all this distributed information offline. Mark some lists as favorites from the mobile and keep track of what's new is comming.

App will present native experience over [Curated list of awesome lists](https://github.com/sindresorhus/awesome) and [A curated list of awesome awesomeness](https://github.com/bayandin/awesome-awesomeness) distributed lists.

### Architecture
Source consists mainly of two parts:

- cli utils used to take lots of repos and parse them into models, which are easy to use from mobile.
- mobile application, written in react-native.

### Structure
- cli (command-line entry points to parse github markdown into tokens and ui models)
- data (placeholder for all original and parsed data)
   - md - initial data from github (used mostly for unit test, consistency validation, metrics)
   - parsed - parsed markdown into tokens (used for unit test)
   - models - ui models used from the mobile app
- mobile (mobile app in react-native)
- types.ts - types for the whole app
- index.js - entry point for the mobile app

### Commands
- **yarn run awesome** creates parsed tokens from the markdown.

### Notes
Everything is commited into VCS, even cli products. Not the best practice, but makes unit testing on CI easier.

### Brief Roadmap for the AwesomeList app

☐ **v0.1** Initial spike to test full cycle

☐ **v0.2** Add 2st level of navigation for one simple list.

☐ **v0.3** Add more lists

☐ **v0.4** Add 3rd level of navigation for remote github markups

☐ **v0.5** *TBD...*


