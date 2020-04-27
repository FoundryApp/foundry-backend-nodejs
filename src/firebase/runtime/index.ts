// Communication with foundry-firebase-runtime

// foundry-runtime-firebase is running a server on port XXXX that expects
// info about function defintions

export * as functions from './functions';
export * as firestore from './firestore';

export { getConfig, clearConfig } from './shared';