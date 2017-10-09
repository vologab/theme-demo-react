import parse from 'parse';

parse.initialize(process.env.REACT_APP_APP_ID);
parse.serverURL = process.env.REACT_APP_SERVER_URL;
parse.liveQueryServerURL = process.env.REACT_APP_LIVE_QUERY_SERVER_URL;

export const Parse = parse;
export const Person = Parse.Object.extend('Person');
export const PersonQuery = new Parse.Query('Person');
