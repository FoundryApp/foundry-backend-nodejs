import { send } from '../shared';

export type DocId = string;
export type DocCount = number;

export interface InlineDoc {
  id: string;
  data: Object;
}

export function sendAddFirestoreInlineDocs(collection: string, docs: Array<InlineDoc>) {
  send({
    firestore: {
      collection,
      docs,
    },
  });
}

export function sendAddFirestoreProdDocsById(collection: string, ids: Array<DocId>) {
  send({
    firestore: {
      collection,
      docs: [{ getFromProd: ids }],
    },
  });
}

export function sendAddFirestoreProdDocsByCount(collection: string, count: DocCount) {
  send({
    firestore: {
      collection,
      docs: [{ getFromProd: count }],
    },
  });
}