import { send } from '../shared';

export type UserId = string;
export type UserCount = number;

export interface InlineUser {
  id: string;
  data: Object;
}

export function sendAddAuthInlineUsers(users: Array<InlineUser>) {
  send({
    users,
  });
}

export function sendAddAuthProdUsersById(ids: Array<UserId>) {
  send({
    users: {
      getFromProd: ids,
    },
  });
}

export function sendAddAuthProdUsersByCount(count: UserCount) {
  send({
    users: {
      getFromProd: count,
    },
  });
}
