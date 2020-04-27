import * as runtime from '../runtime';

export function add(users: Array<runtime.auth.InlineUser>) {
  return runtime.auth.sendAddAuthInlineUsers(users);
}

export function copyFromProdById(ids: Array<runtime.auth.UserId>) {
  return runtime.auth.sendAddAuthProdUsersById(ids);
}

export function copyFromProdByCount(count: runtime.auth.UserCount) {
  return runtime.auth.sendAddAuthProdUsersByCount(count);
}
