import path from 'path';

export default {
  appName: 'MyApp',
  databaseURI: 'mongodb://localhost:27017/createreactappparse', // Connection string for your MongoDB database
  cloud: path.join(__dirname, '/cloud/main.js'), // Absolute path to your Cloud Code
  appId: 'myAppId',
  masterKey: 'myMasterKey', // Keep this key secret!
  fileKey: 'optionalFileKey',
  serverURL: 'http://localhost:1337/parse' // Don't forget to change to https if needed
};
