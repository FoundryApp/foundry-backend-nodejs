import { send, FunctionType } from '../shared';

export enum AuthTriggers {
  OnCreate = "onCreate",
  OnDelete = "onDelete",
}

export function registerAuth(name: string) {
  return send({
    functions: {
      name,
      type: FunctionType.Auth,
    }
  });
}

export function sendAuthCreateUserInfo(name: string, userId: string, data?: Object) {
  let obj;
  if (data) {
    obj = { id: userId, data }
  } else {
    obj = { getFromProd: { id: userId } }
  }

  return send({
    functions: {
      name,
      trigger: AuthTriggers.OnCreate,
      createUser: obj,
    },
  })
}

export function sendAuthDeleteUserInfo(name: string, userId: string) {
  return send({
    functions: {
      name,
      trigger: AuthTriggers.OnDelete,
      deleteUser: { id: userId },
    },
  });
}