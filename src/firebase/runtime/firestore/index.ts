import { send } from '../../shared';

export type DocId = string;
export type DocCount = number;

export interface InlineDoc {
  id: DocId;
  data: Object;
}

export function sendAddFirestoreInlineDocs(collection: string, docs: Array<InlineDoc>) {
  return send({
    firestore: {
      collection,
      docs,
    },
  });
}

export function sendAddFirestoreProdDocsById(collection: string, ids: Array<DocId>) {
  return send({
    firestore: {
      collection,
      docs: [{ getFromProd: ids }],
    },
  });
}

export function sendAddFirestoreProdDocsByCount(collection: string, count: DocCount) {
  return send({
    firestore: {
      collection,
      docs: [{ getFromProd: count }],
    },
  });
}