import * as runtime from '../runtime';

class FirestoreCollection {
  #collection: string
  constructor(col: string) {
    this.#collection = col;
  }

  addDocs(docs: Array<runtime.firestore.InlineDoc>) {
    return runtime.firestore.sendAddFirestoreInlineDocs(this.#collection, docs);
  }

  copyDocsFromProdById(docIds: Array<runtime.firestore.DocId>) {
    return runtime.firestore.sendAddFirestoreProdDocsById(this.#collection, docIds);
  }

  copyDocsFromProdByCount(count: runtime.firestore.DocCount) {
    return runtime.firestore.sendAddFirestoreProdDocsByCount(this.#collection, count);
  }
}

export function collection(col: string) {
  return new FirestoreCollection(col);
}