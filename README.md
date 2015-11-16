# TwitWatcherJS

## Installation

```
git clone https://github.com/FWoelffel/TwitWatcherJS.git
cd TwitWatcherJS
npm install
```

## Configuration

All you have to change is clearly stated in the `package.json` file :

```json
...,
"TwitterAPI": {
  "consumer_key": "YOUR_CONSUMER_KEY",
  "consumer_secret": "YOUR_CONSUMER_SECRET",
  "access_token": "YOUR_ACCESS_TOKEN",
  "access_token_secret": "YOUR_ACCESS_TOKEN_SECRET"
},
...
```

Also, don't forget to setup your keywords in the same file :

```json
...,
"keywords": [
  "hello"
],
...
```

## Usage

To start the watcher, issue the following command :

```
npm start
```

Informations about tweets containing at least one of your keywords will be serialized in the `tweets.json` file.
