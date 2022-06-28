// 在真实环境中，如果使用 firebase 这种第三方 auth 服务的话，本文件不需要开发者开发

import { User } from "./screen/project-list/list";

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { password: string; username: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    } else {
      // 相当于 throw error
      return Promise.reject(await res.json());
    }
  });
};

export const register = (data: { password: string; username: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    } else {
      // 相当于 throw error
      return Promise.reject(await res.json());
    }
  });
};

// 使用 async 可以让函数返回一个 Promise 类型
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
