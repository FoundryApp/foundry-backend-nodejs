import * as runtime from '../runtime';

class DocWrapper {
  #name: string;
  #col: string;
  #docId: string;
  #trigger: runtime.FirestoreTriggers;

  constructor(name: string, col: string, docId: string, trigger: runtime.FirestoreTriggers) {
    this.#name = name;
    this.#col = col;
    this.#docId = docId;
    this.#trigger = trigger;
  }

  withData(d: Object) {
    switch (this.#trigger) {
      case runtime.FirestoreTriggers.OnCreate:
        runtime.sendFirestoreCreateDoc(this.#name, this.#col, this.#docId, d);
        break;
      case runtime.FirestoreTriggers.OnDelete:
        runtime.sendFirestoreDeleteDoc(this.#name, this.#col, this.#docId);
        break;
      case runtime.FirestoreTriggers.OnUpdate:
        runtime.sendFirestoreUpdateDoc(this.#name, this.#col, this.#docId, d);
        break;
      case runtime.FirestoreTriggers.OnWrite:
        break;
    }
  }
}

class FirestoreFunction {
  #name: string;
  constructor(name: string) { this.#name = name; }

  triggerWithProdDoc(col: string, id: string) {
    return runtime.sendFirestoreCreateDocProd(this.#name, col, id);
  }

  createDoc(col: string, id: string) {
    return new DocWrapper(this.#name, col, id, runtime.FirestoreTriggers.OnCreate);
  }

  deleteDoc(col: string, id: string) {
    return runtime.sendFirestoreDeleteDoc(this.#name, col, id);
  }

  updateDoc(col: string, id: string) {
    return new DocWrapper(this.#name, col, id, runtime.FirestoreTriggers.OnUpdate);
  }

  writeDoc(col: string, id: string) {
    return {
      createWithData: (d: Object) => runtime.sendFirestoreCreateDoc(this.#name, col, id, d),
      updateWithData: (d: Object) => runtime.sendFirestoreUpdateDoc(this.#name, col, id, d),
      delete: () => runtime.sendFirestoreDeleteDoc(this.#name, col, id),
    }
  }

}

function add(name: string) {
  return runtime.registerFirestore(name);
}

function firestore(name: string) {
  return new FirestoreFunction(name);
}

firestore.add = add;
export default firestore;