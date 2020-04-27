import * as runtime from '../runtime';

class DocWrapper {
  #name: string;
  #docId: string

  constructor(name: string, docId: string) {
    this.#name = name;
    this.#docId = docId;
  }

  withData(d: Object) {

  }
}

class FirestoreFunction {
  #name: string;
  constructor(name: string) { this.#name = name; }

  triggerWithProdDoc(col: string, id: string) {
    return runtime.sendFirestoreCreateDocProd(this.#name, col, id);
  }

  createDoc(col: string, id: string) {

  }

  deleteDoc(col: string, id: string) {

  }

  updateDoc(col: string, id: string) {

  }

  writeDoc(col: string, id: string) {

  }

}

function add(name: string) {
  return runtime.registerFirestore(name);
}

function firestore(name: string) {
  // return new AuthFunction(name);
}

firestore.add = add;
export default firestore;