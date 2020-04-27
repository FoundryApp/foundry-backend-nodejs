import { send, FunctionType } from './shared';

export enum FirestoreTriggers {
  OnCreate = "onCreate",
  OnDelete = "onDelete",
  OnUpdate = "onUpdate",
  OnWrite = "onWrite",
}

export function registerFirestore(name: string) {
  return send({
    functions: {
      name,
      type: FunctionType.Firestore,
    },
  });
}

export function sendFirestoreCreateDocProd(name: string, collection: string, id: string) {
  return send({
    functions: {
      name,
      type: FirestoreTriggers.OnCreate,
      createDoc: {
        getFromProd: {
          collection,
          id,
        },
      },
    },
  });
}

export function sendFirestoreCreateDoc(name: string, collection: string, id: string, data: Object) {
  return send({
    functions: {
      name,
      type: FirestoreTriggers.OnCreate,
      createDoc: {
        collection,
        id,
        data,
      },
    },
  });
}


export function sendFirestoreDeleteDoc(name: string, collection: string, id: string) {
  return send({
    functions: {
      name,
      type: FirestoreTriggers.OnDelete,
      deleteDoc: {
        collection,
        id,
      },
    },
  });
}

export function sendFirestoreUpdateDoc(name: string, collection: string, id: string, data: Object) {
  return send({
    functions: {
      name,
      type: FirestoreTriggers.OnUpdate,
      updateDoc: {
        collection,
        id,
        data,
      },
    },
  });
}
