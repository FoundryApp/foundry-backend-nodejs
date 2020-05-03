import { send } from '../../shared';

export type UserId = string;
export type UserCount = number;

export interface InlineUser {
  id: UserId;
  data: Object;
}

export function sendAddAuthInlineUsers(users: Array<InlineUser>) {
  return send({
    users,
  });
}

export function sendAddAuthProdUsersById(ids: Array<UserId>) {
  return send({
    users: [{
      getFromProd: ids,
    }],
  });
}

export function sendAddAuthProdUsersByCount(count: UserCount) {
  return send({
    users: [{
      getFromProd: count,
    }],
  });
}
