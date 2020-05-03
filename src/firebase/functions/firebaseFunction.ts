type FirebaseFunction = FirebaseBackgroundFunction | FirebaseHttpsFunction;

let registered: { [name: string]: FirebaseFunction } = {};

export function registerFunction(name: string, func: FirebaseFunction) {
  if (registered[name]) {
    throw new Error(`Function with the name '${name}' is already registered`);
  }
  registered[name] = func;
}

export function getRegisteredFunction(name: string) {
  if (!registered[name]) {
    throw new Error(`Function with the name '${name}' isn't registered`);
  }
  return registered[name];
}

export abstract class FirebaseBackgroundFunction {
  protected name: string;
  constructor(name: string) { this.name = name; }

  abstract trigger(): void;
  abstract triggerWithProdData(): void;
}

export abstract class FirebaseHttpsFunction {
  protected name: string;
  constructor(name: string) { this.name = name; }

  abstract trigger(): void;
}
