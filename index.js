#!/usr/bin/env node

import "babel-polyfill";

const args = require('yargs')
  .demand(['token'])
  .argv;
const fetch = require('node-fetch');
const inquirer = require('inquirer');

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const parseJson = (response) => response.json();

async function query(url, method) {
  return fetch('https://rink.hockeyapp.net/api/2' + url, {
    method: method || 'GET',
    headers: {
      'X-HockeyAppToken': args.token,
    },
  })
  .then(checkStatus)
  .catch((error) => {
    console.log('request failed', error)
  });
}

async function getApps() {
  const json = await query('/apps').then(parseJson);
  return json.apps;
}

async function deleteApp(app) {
  return query('/apps/' + app.public_identifier, 'DELETE');
}

function appToString(app) {
  return app.title + ' - ' + app.platform;
}

async function askForAppDeletion(app) {
  const answers = await inquirer.prompt([{
    name: 'shouldDelete',
    default: false,
    type: 'confirm',
    message: 'Do you want to delete ' + appToString(app) + '?',
  }]);
  return answers.shouldDelete;
}

(async function() {
  const apps = await getApps();
  for (let app of apps) {
    const shouldDelete = await askForAppDeletion(app);
    if (shouldDelete) {
      console.log('Deleting ' + appToString(app));
      await deleteApp(app);
    }
  }
}());
