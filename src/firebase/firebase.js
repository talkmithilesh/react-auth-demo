import firebase from 'firebase/app';
import 'firebase/auth';
import * as keys from './keys'

if (firebase.apps.length === 0) {
    console.log('initialise firebase app')
    firebase.initializeApp(keys.config);
}

const auth = firebase.auth();

export {
    auth
};
