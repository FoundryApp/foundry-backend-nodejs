import * as runtime from '../runtime';

class DatabaseRef {
  #ref: string;
  constructor(ref: string) { this.#ref = ref; }

  addChildren(children: Array<runtime.database.InlineChild>) {
    return runtime.database.sendAddDatabaseInlineChildren(this.#ref, children);
  }

  copyChildrenFromProdByKey(childKeys: Array<runtime.database.ChildKey>) {
    return runtime.database.sendAddDatabaseProdChildrebByKey(this.#ref, childKeys);
  }

  copyAllChildrenFromProd() {
    return runtime.database.sendAddDatabaseProdChildrenAll(this.#ref);
  }
}

export function ref(ref: string) {
  return new DatabaseRef(ref);
}