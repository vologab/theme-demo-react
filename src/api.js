import { Parse, Person } from 'configureParse';
import { browserHistory } from 'react-router';

/* User */
const signup = (email, password, fistName, lastName) => {
  const user = new Parse.User();
  user.set('username', email);
  user.set('email', email);
  user.set('password', password);
  user.set('firstName', fistName);
  user.set('lastName', lastName);

  return user.signUp(null);
};

const login = (email, password) => Parse.User.logIn(email, password);

/* File */
const fileUpload = (file) => {
  const parseFile = new Parse.File(file.name, file);

  return parseFile.save();
};

/* Person */
const personCreateRequest = async (person) => {
  const personQuery = new Person();
  const result = await personQuery.set(person).save();

  return browserHistory.push(`/person/${result.id}/edit`);
};

const personCreate = async (person, file) => {
  const personToCreate = person;

  if (file) {
    const fileUploaded = await fileUpload(file);
    personToCreate.avatar = fileUploaded;

    return personCreateRequest(personToCreate);
  }

  return personCreateRequest(personToCreate);
};

const personGet = (personId) => {
  const PersonQuery = new Parse.Query(Person);

  return PersonQuery.get(personId);
};

const personUpdate = async (personId, person, file) => {
  const PersonQuery = new Parse.Query(Person);
  const personFound = await PersonQuery.get(personId);
  if (file) {
    const fileUploaded = await fileUpload(file);
    const personToSave = {
      ...person,
      avatar: fileUploaded
    };

    return personFound.set(personToSave).save();
  }

  const personToSave = person;

  if (person.avatar !== null) {
    delete personToSave.avatar;
  }
  return personFound.set(personToSave).save();
};

const personDelete = async (personId) => {
  const PersonQuery = new Parse.Query(Person);
  const personFound = await PersonQuery.get(personId);
  await personFound.destroy();

  return browserHistory.push('/persons');
};


/* Auth */
const googleProvider = {
  authenticate(options) {
    if (options.success) {
      options.success(this, {});
    }
  },

  getAuthType() {
    return 'google';
  },

  deauthenticate() {
  }
};

export const googleLogin = async (authData, googleProfile) => {
  const user = await Parse.User.logInWith(googleProvider, authData);

  user.set('email', googleProfile.email);
  user.set('lastName', googleProfile.familyName);
  user.set('firstName', googleProfile.givenName);
  user.set('avatarUrl', googleProfile.imageUrl);
  user.save();

  return user;
};

export const updateUser = async (user, file) => {
  const currentUser = Parse.User.current();
  if (file) {
    const uploadedImage = await fileUpload(file);

    return currentUser.set({ ...user, avatar: uploadedImage }).save();
  }
  return currentUser.set({ ...user, avatarUrl: user.avatar }).save();
};

export const getPersons = async () => {
  const result = await new Parse.Query('Person').find();

  return result.map(parseObj => parseObj.toJSON());
};

export const getCurrentUser = sessionId => Parse.User.become(sessionId);

export const unAuthUser = () => Parse.User.logOut();

export default {
  signup,
  login,
  personCreate,
  personGet,
  personUpdate,
  personDelete,
  updateUser,
  fileUpload,
  googleLogin,
  getPersons,
  unAuthUser,
  getCurrentUser
};
