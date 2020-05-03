import 'source-map-support/register';

import * as firebase from './firebase';

export {
  firebase,
};

const ref1 = firebase.functions.database.register('createWS');
const ref12 = firebase.functions.database.register('createWS3');
const ref2 = firebase.functions.database.get('createWS');
const ref3 = firebase.functions.firestore.register('createWS2');
const ref4 = firebase.functions.auth.register('authF');
const ref5 = firebase.functions.https.register('https');
const ref6 = firebase.functions.httpsCallable.register('httpsCallable');

console.log(ref1 === ref12);
console.log(ref2);
console.log(ref3);
console.log(ref4);
console.log(ref5);
console.log(ref6);

// ref1.triggerWithProdData().onCreate();
// ref1.trigger().onCreate({

// });

// ref1.trigger().onDelete();
// ref1.trigger().onUpdate({

// });
