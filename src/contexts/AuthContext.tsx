import React, { createContext, use, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { api, recoverUserInfo } from "../service/api";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: FormData) => Promise<void>;
  singUp: (data: FormData) => Promise<void>;
};

type FormData = {
  email: string;
  password: string;
  username?: string;
  name?: string;
};

type User = {
  name: string;
  email: string;
  username: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();
    if (token) recoverUserInfo().then((res) => console.log(res.data.name));
  }, []);

  const logOut = () => destroyCookie(undefined, "nextauth");

  const singUp = async (data: FormData) => {
    try {
      const res: any = await await (await api.post("user/create", data)).data;

      if (res === "OK") {
        const { email, password } = data;
        await signIn({ email, password });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const signIn = async ({ email, password }: FormData) => {
    const { token, user }: any = await (
      await api.post("/login", { email, password })
    ).data;

    setCookie(undefined, "nextauth", token, {
      maxAge: 60 * 60 * 1, // 1h
    });
    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    setUser(user);
    await Router.push("/dashboard");
  };
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, singUp }}>
      {children}
    </AuthContext.Provider>
  );
}
