import { send } from '../shared';

export type ChildKey = string;

export interface InlineChild {
  key: ChildKey;
  data: Object;
}

export function sendAddDatabaseInlineChildren(ref: string, children: Array<InlineChild>) {
  return send({
    realtimeDB: {
      ref,
      children: children.map(c => ({ child: c.key, data: c.data })),
    }
  });
}

export function sendAddDatabaseProdChildrebByKey(ref: string, keys: Array<ChildKey>) {
  return send({
    realtimeDB: {
      ref,
      children: [{ getFromProd: keys }],
    },
  });
}

export function sendAddDatabaseProdChildrenAll(ref: string) {
  return send({
    realtimeDB: {
      ref,
      children: [{ getFromProd: 'all' }],
    },
  });
}
