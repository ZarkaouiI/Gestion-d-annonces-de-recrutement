import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  __t:"",
  login: () => {},
  logout: () => {}
});
