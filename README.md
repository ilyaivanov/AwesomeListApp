### Circle CI status ![ci-status](https://circleci.com/gh/ilyaivanov/AwesomeListApp.png?circle-token=44aac7759de8560e97ee68c478d2e9c680622b0f)

### Overview
There exist tons of online knowledge captured in metalist. Would be great to have a mobile app to access all this distributed information offline. Mark some lists as favorites from the mobile and keep track of what's new is comming.

App will present native experience over [Curated list of awesome lists](https://github.com/sindresorhus/awesome) and [A curated list of awesome awesomeness](https://github.com/bayandin/awesome-awesomeness) distributed lists.

### Architecture
Source consists mainly of two parts:

- cli utils used to take lots of repos and parse them into models, which are easy to use from mobile.
- mobile application, written in react-native.

### Structure
- cli - command-line entry points to parse github markdown into tokens and ui models
- data - folder for all original and parsed data
   - parsed - parsed markdown into tokens (used for unit test, consistency validation, metrics)
   - models - ui models used from the mobile app
- mobile - mobile app in react-native
- types.ts - types for the whole app
- index.js - entry point for the mobile app

### Commands
- **yarn run load** to fetch, parse and save remote github awesome lists. Products of this command are committed into VCS for simplicity.

### Notes
Tokens will always be committed, since I don't have control over remove md files. If I won't commit them, I don't have reliable build. Parsed data might be ignored in the future.

### Brief Roadmap for the AwesomeList app

☑ **v0.1** Initial spike to test full cycle

☐ **v0.2** Add 2st level of navigation for one simple list.

☐ **v0.3** Add more lists

☐ **v0.4** Add 3rd level of navigation for remote github markups

☐ **v0.5** *TBD...*

### Features to brainstorm
- sorting (name, original, stats)
- information to show (stats, links count, last updated)
- more description of the current section at the top
- auth user via github (to put stars)
- favorites, history
- statistics
- google analytics
- gamification?
- web?
