// Communication with foundry-firebase-runtime

// foundry-runtime-firebase is running a server on port XXXX that expects
// info about function defintions

export * as functions from './functions';
export * as firestore from './firestore';
export * as database from './database';
export * as auth from './auth';

export { getConfig, clearConfig } from './shared';