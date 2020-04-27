// Communication with foundry-firebase-runtime

// foundry-runtime-firebase is running a server on port XXXX that expects
// info about function defintions

export * from './https';
export * from './httpsCallable';
export * from './auth';
export * from './firestore';

export { getConfig, clearConfig } from './shared';