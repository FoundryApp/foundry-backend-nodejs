import * as runtime from '../runtime';
import { registerFunction, getRegisteredFunction, FirebaseBackgroundFunction } from '../shared';

interface DatabaseReference {
  refPath: string;
  data: Object;
}

class DatabaseFunction extends FirebaseBackgroundFunction {
  constructor(name: string) { super(name); }

  triggerWithProdData() {
    return {
      onCreate: (refPath: string) => {
        return runtime.functions.sendDatabaseCreateProd(this.name, refPath);
      },
    };
  }

  trigger() {
    return {
      onCreate: (ref: DatabaseReference) => {
        return runtime.functions.sendDatabaseCreateRef(this.name, ref.refPath, ref.data)
      },
      onDelete: (refPath: string) => {
        return runtime.functions.sendDatabaseDeleteRef(this.name, refPath);
      },
      onUpdate: (ref: DatabaseReference) => {
        return runtime.functions.sendDatabaseUpdateRef(this.name, ref.refPath, ref.data);
      },
    };
  }
}

export default {
  register: (name: string) => {
    const f = new DatabaseFunction(name);
    registerFunction(name, f);
    runtime.functions.registerDatabase(name);
    return f;
  },
  get: (name: string) => {
    return getRegisteredFunction(name) as DatabaseFunction;
  },
};