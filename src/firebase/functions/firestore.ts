import * as runtime from '../runtime';
import { registerFunction, getRegisteredFunction, FirebaseBackgroundFunction } from './firebaseFunction';

interface FirestoreDocument {
  collection: string;
  id: string;
  data: Object;
}

class FirestoreFunction extends FirebaseBackgroundFunction {
  constructor(name: string) { super(name); }

  triggerWithProdData() {
    return {
      onCreate: (collection: string, documentId: string) => {
        return runtime.functions.sendFirestoreCreateDocProd(this.name, collection, documentId);
      },
    };
  }

  trigger() {
    return {
      onCreate: (doc: FirestoreDocument) => {
        return runtime.functions.sendFirestoreCreateDoc(this.name, doc.collection, doc.id, doc.data);
      },
      onDelete: (collection: string, documentId: string) => {
        return runtime.functions.sendFirestoreDeleteDoc(this.name, collection, documentId);
      },
      onUpdate: (doc: FirestoreDocument) => {
        runtime.functions.sendFirestoreUpdateDoc(this.name, doc.collection, doc.id, doc.data);
      },
    };
  }
}

export default {
  register: (name: string) => {
    const f = new FirestoreFunction(name);
    registerFunction(name, f);
    runtime.functions.registerFirestore(name);
    return f;
  },
  get: (name: string) => {
    return getRegisteredFunction(name) as FirestoreFunction;
  },
};
