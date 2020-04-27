import * as runtime from '../runtime';

class DatabaseFunction {
  #name: string;
  constructor(name: string) { this.#name = name; }

  triggerWithProdRef(ref: string) {
    return runtime.sendDatabaseCreateProd(this.#name, ref);
  }

  createRef(ref: string) {
    return { withData: (d: Object) => runtime.sendDatabaseCreateRef(this.#name, ref, d) }
  }

  deleteRef(ref: string) {
    return runtime.sendDatabaseDeleteRef(this.#name, ref);
  }

  updateRef(ref: string) {
    return { withData: (d: Object) => runtime.sendDatabaseUpdateRef(this.#name, ref, d) }
  }

  writeRef(ref: string) {
    return {
      createWithData: (d: Object) => runtime.sendDatabaseCreateRef(this.#name, ref, d),
      updateWithData: (d: Object) => runtime.sendDatabaseUpdateRef(this.#name, ref, d),
      delete: () => runtime.sendDatabaseDeleteRef(this.#name, ref),
    }
  }
}

function add(name: string) {
  return runtime.registerDatabase(name);
}

function database(name: string) {
  return new DatabaseFunction(name);
}

database.add = add;
export default database;
