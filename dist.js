#!/usr/bin/env node


require('babel-polyfill');

var args=require('yargs').
demand(['token']).
argv;
var fetch=require('node-fetch');
var inquirer=require('inquirer');

function checkStatus(response){
if(response.status>=200&&response.status<300){
return response;
}else{
var error=new Error(response.statusText);
error.response=response;
throw error;
}
}

var parseJson=function parseJson(response){return response.json();};

function query(url,method){return regeneratorRuntime.async(function query$(_context){while(1){switch(_context.prev=_context.next){case 0:return _context.abrupt('return',
fetch('https://rink.hockeyapp.net/api/2'+url,{
method:method||'GET',
headers:{
'X-HockeyAppToken':args.token}}).


then(checkStatus).
catch(function(error){
console.log('request failed',error);
}));case 1:case'end':return _context.stop();}}},null,this);}


function getApps(){var json;return regeneratorRuntime.async(function getApps$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.next=2;return regeneratorRuntime.awrap(
query('/apps').then(parseJson));case 2:json=_context2.sent;return _context2.abrupt('return',
json.apps);case 4:case'end':return _context2.stop();}}},null,this);}


function deleteApp(app){return regeneratorRuntime.async(function deleteApp$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:return _context3.abrupt('return',
query('/apps/'+app.public_identifier,'DELETE'));case 1:case'end':return _context3.stop();}}},null,this);}


function appToString(app){
return app.title+' - '+app.platform;
}

function askForAppDeletion(app){var answers;return regeneratorRuntime.async(function askForAppDeletion$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:_context4.next=2;return regeneratorRuntime.awrap(
inquirer.prompt([{
name:'shouldDelete',
default:false,
type:'confirm',
message:'Do you want to delete '+appToString(app)+'?'}]));case 2:answers=_context4.sent;return _context4.abrupt('return',

answers.shouldDelete);case 4:case'end':return _context4.stop();}}},null,this);}


(function _callee(){var apps,_iterator,_isArray,_i,_ref,app,shouldDelete;return regeneratorRuntime.async(function _callee$(_context5){while(1){switch(_context5.prev=_context5.next){case 0:_context5.next=2;return regeneratorRuntime.awrap(
getApps());case 2:apps=_context5.sent;_iterator=
apps,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==='function'?typeof Symbol==='function'?Symbol.iterator:'@@iterator':'@@iterator']();case 4:if(!_isArray){_context5.next=10;break;}if(!(_i>=_iterator.length)){_context5.next=7;break;}return _context5.abrupt('break',24);case 7:_ref=_iterator[_i++];_context5.next=14;break;case 10:_i=_iterator.next();if(!_i.done){_context5.next=13;break;}return _context5.abrupt('break',24);case 13:_ref=_i.value;case 14:app=_ref;_context5.next=17;return regeneratorRuntime.awrap(
askForAppDeletion(app));case 17:shouldDelete=_context5.sent;if(!
shouldDelete){_context5.next=22;break;}
console.log('Deleting '+appToString(app));_context5.next=22;return regeneratorRuntime.awrap(
deleteApp(app));case 22:_context5.next=4;break;case 24:case'end':return _context5.stop();}}},null,this);})();

