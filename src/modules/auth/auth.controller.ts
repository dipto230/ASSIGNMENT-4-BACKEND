import { auth } from "../../lib/auth";


export const register = auth.handlers.register;
export const login = auth.handlers.login;
export const logout = auth.handlers.logout;
export const me = auth.handlers.getSession;