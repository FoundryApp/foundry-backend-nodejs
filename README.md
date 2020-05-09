# Foundry Node.js SDK
This SDK lets you configure Foundry with your Firebase Cloud Functions

## Table of contents
- [Installation](#installation)
- [Example](#example)
- [Usage](#usage)
  - [Emulated Auth](#fill-in-emulated-auth-users)
  - [Emulated Firestore](#fill-in-emulated-firestore)
  - [Emulated Realtime Database](#fill-in-emulated-realtimedb)
  - [Register function](#register-function)
  - [Firestore Cloud Function](#firestore-function)
  - [RealtimeDB Cloud Function](#realtimedb-function)
  - [Auth Cloud Function](#auth-function)
  - [Https Cloud Function](#https-function)
  - [Https Callable Cloud Function](#https-callable-function)


## Installation

```
$ npm install --save @foundryapp/foundry-backend
```

## Example

1. Add Foundry backend SDK to your Cloud Functions project

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
// Import Foundry
const foundry = require('@foundryapp/foundry-backend').firebase;

admin.initializeApp();

// Fill in the emulated auth users
foundry.users.add([
  {
    id: 'user-id-1',
    data: { email: 'user@email.com' },
  },
]);

// Fill in the emulated Firestore
foundry.firestore.collection('posts').addDocs([
  {
    id: 'post-doc-id-1',
    data: {
      ownerId: 'user-id-1',
      content: 'Hello World!',
    },
  },
]);

/////////

// Register 'myCloudFunc' with Foundry
const createPost = foundry.functions.httpsCallable.register('createPost');

// Now specify how Foundry should trigger your function
createPost.triggerAsUser('user-id-1').onCall({ 
  data: {
    content: 'Content of a new post',    
  },
});

// Cloud Function for creating posts
exports.createPost = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('permission-denied', 'User isn\'t authenticted');
  }
  
  const { uid } = context.auth;
  await admin.firestore().collection('posts').add({
    ownerId: uid,
    content: data.content,
  });
});

/////////

const getPosts = foundry.functions.httpsCallable.register('getPosts');
getPosts.triggerAsUser('user-id-1').onCall();

// Cloud Function for retrieving all user's posts
exports.getPosts = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('permission-denied', 'User isn\'t authenticted');
  }
  
  const { uid } = context.auth;
  const posts = await admin.firestore().collection('posts').where('ownerId', '==', uid).get();
  return posts.docs.map(d => d.data());
});
```

2. Start Foundry CLI in the same directory where  are your Cloud Functions

```
$ foundry go
```

Now every time you save your local code files Foundry will trigger your cloud functions as you specified in the code.
The output from Foundry in your terminal will look like this:
```
[1] createPost
response => {
  data: null,
  status: 200,
  statusText: 'OK'
}

[1] getPosts
response => {
  data: [
    {
      ownerId: 'user-id-1',
      content: 'Content of a new post'
    },
    {
      ownerId: 'user-id-1',
      content: 'Hello World!'
    }
  ],
  status: 200,
  statusText: 'OK'
}
```

## Usage

### Fill in emulated Auth users
```javascript
// Specify users explicitely
foundry.users.add([
  {
    id: 'user-id-1',
    data: { email: 'user@email.com' },
  },
]);

// Copy the first 5 users from your production Firebase app
foundry.users.copyFromProdByCount(5);

// Copy users from your production Firebase app by their IDs
foundry.users.copyFromProdById(['user-prod-id-1', 'user-prod-id-2']);
```

### Fill in emulated Firestore
```javascript
// Specify documents explicitely
foundry.firestore.collection('posts').addDocs([
  {
    id: 'post-doc-id-1',
    data: {
      ownerId: 'user-id-1',
      content: 'Hello World!',
    },
  },
]);

// Copy documents from the production

// Takes the first 5 docs from collection 'posts' in the production
foundry.firestore.collection('posts').copyDocsFromProdByCount(5); 
// Copy docs from the production by their IDs
foundry.firestore.collection('posts').copyDocsFromProdById(['prod-doc-id-1', 'prod-doc-id-2']); 
```

### Fill in emulated RealtimeDB
```javascript
// Specify refs explicitely
foundry.database.ref('posts').addChildren([
  {
    key: 'post-1',
    data: {
      ownerId: 'user-id-1',
      content: 'Hello World!',
    },
  },
]);

// Copy directly from the production
foundry.database.ref('posts').copyAllChildrenFromProd();
foundry.database.ref('posts').copyChildrenFromProdByKey(['prod-key-1', 'prod-key-2']);
```

### Register function
```javascript
// The name under which your cloud function is registered
// with Foundry must be the same under which you export
// your cloud function

const funcFirestore = firebase.functions.firestore.register('funcFirestore');
const funcDatabase = firebase.functions.database.register('funcDatabase');
const funcAuth = firebase.functions.auth.register('funcAuth');
const funcHttps = firebase.functions.https.register('funcHttps');
const funcHttpsCallable = firebase.functions.httpsCallable.register('funcHttpsCallable');

// To get a reference of a previously registered function
const func = firebase.functions.firestore.get('functionName');
```

### Describe function triggers

#### Firestore function
```javascript
// New document will be created in the emulated Firestore that will trigger the function
funcFirestore.trigger().onCreate({
  collection: 'posts',
  id: 'post-doc-id-1',
  data: {
    content: 'My post content',
  },
});

// Document with the ID 'post-doc-id-1' in the collection 'posts' 
// will be deleted from the emulated Firestore
funcFirestore.trigger().onDelete('posts', 'post-doc-id-1');

// Specified document in the emulated Firestore will be updated
funcFirestore.trigger().onUpdate({
  collection: 'posts',
  id: 'post-doc-id-1',
  data: {
    content: 'New content',
  },
});

// Trigger the function by copying a specified document to the emulated Firestore
funcFirestore.triggerWithProdData().onCreate('posts', 'prod-post-doc-id');
```

#### RealtimeDB function
```javascript
// Creates a new reference in the emulated RealtimeDB and triggers the function
funcDatabase.trigger().onCreate({
  refPath: 'ref/path',
  data: { ... },
});

// Deletes an existing reference in the emulated RealtimeDB and triggers the function
funcDatabase.trigger().onDelete('ref/path');

// Updates an existing reference in the emulated RealtimeDB and triggers the function
funcDatabase.trigger().onUpdate({
  refPath: 'ref/path',
  data: { ... },
});

// Copies a reference from the production to the emulated RealtimeDB and triggers the function
funcDatabase.triggerWithProdData().onCreate('re/path/in/production');
```

#### Auth function
```javascript
// Creates a new user in the emulated Auth users and triggers the function
funcAuth.trigger().onCreate({
  uid: 'user-id-1',
  data: { email: 'user@email.com' },
});

// Creates an existing user in the emulated Auth users and triggers the function
funcAuth.trigger().onDelete('user-id');

// Copies an existing user from the production to the emulated Auth users and triggers the function
funcAuth.triggerWithProdData().onCreate('prod-user-id');
```

#### Https function
```javascript
// Send a GET http request to the function with the specified data in body
funcHttps.trigger().get({
  // Optional field to specify URL route, for example https://example.com/api/user
  // if not specified the value '/' is used
  route: '/api/user',
  data: { ... },
});

// Following HTTP methods are supported
funcHttps.trigger().post({ ... });
funcHttps.trigger().put({ ... });
funcHttps.trigger().delete({ ... });
funcHttps.trigger().options({ ... });
```

#### Https Callable function
```javascript
// Triggers the function as an authenticated user 'user-id-1' with the specified payload
// User with the specified ID must be present in the emulated Auth
funcHttpsCallable.triggerAsUser('user-id-1').onCall({
  // Payload
});

// Triggers the function as an non-authenticated (!) user with the specified payload
funcHttpsCallable.trigger().onCall({
  // Payload
});
```
