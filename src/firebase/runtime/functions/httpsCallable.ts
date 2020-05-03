import { send, FunctionType } from '../shared';

export function registerHttpsCallable(name: string) {
  return send({
    functions: {
      name,
      type: FunctionType.HttpsCallable,
    },
  });
}

export function sendHttpsCallableInfo(name: string, payload: Object) {
  return send({
    functions: {
      name,
      payload,
    },
  });
}

export function sendHttpsCallableInfoAsUser(name: string, userId: string, payload: Object) {
  return send({
    functions: {
      name,
      asUser: { id: userId },
      payload,
    },
  });
}