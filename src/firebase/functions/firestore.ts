import * as runtime from '../runtime';

class FirestoreFunction {
  #name: string;
  constructor(name: string) { this.#name = name; }

  triggerWithProdDoc(col: string, id: string) {
    return runtime.functions.sendFirestoreCreateDocProd(this.#name, col, id);
  }

  createDoc(col: string, id: string) {
    return { withData: (d: Object) => runtime.functions.sendFirestoreCreateDoc(this.#name, col, id, d) }
  }

  deleteDoc(col: string, id: string) {
    return runtime.functions.sendFirestoreDeleteDoc(this.#name, col, id);
  }

  updateDoc(col: string, id: string) {
    return { withData: (d: Object) => runtime.functions.sendFirestoreUpdateDoc(this.#name, col, id, d) }
  }
}

function add(name: string) {
  return runtime.functions.registerFirestore(name);
}

function firestore(name: string) {
  return new FirestoreFunction(name);
}

firestore.add = add;
export default firestore;
