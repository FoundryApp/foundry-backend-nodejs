import { send, FunctionType } from '../shared';

export enum DatabaseTriggers {
  OnCreate = "onCreate",
  OnDelete = "onDelete",
  OnUpdate = "onUpdate",
}

export function registerDatabase(name: string) {
  return send({
    functions: {
      name,
      type: FunctionType.RealtimeDB,
    },
  });
}

export function sendDatabaseCreateProd(name: string, ref: string) {
  return send({
    functions: {
      name,
      trigger: DatabaseTriggers.OnCreate,
      createRef: {
        getFromProd: { ref },
      },
    },
  });
}

export function sendDatabaseCreateRef(name: string, ref: string, data: Object) {
  return send({
    functions: {
      name,
      trigger: DatabaseTriggers.OnCreate,
      createRef: {
        ref,
        data,
      },
    },
  });
}

export function sendDatabaseDeleteRef(name: string, ref: string) {
  return send({
    functions: {
      name,
      trigger: DatabaseTriggers.OnDelete,
      deleteRef: {
        ref,
      },
    },
  });
}

export function sendDatabaseUpdateRef(name: string, ref: string, data: Object) {
  return send({
    functions: {
      name,
      trigger: DatabaseTriggers.OnUpdate,
      updateRef: {
        ref,
        data,
      },
    },
  });
}