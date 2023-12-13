import { createContext, ReactNode, useState, useEffect } from "react";

import { api } from "../services/apiClient";

import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";

import { toast } from "react-toastify";

type AuthContexData = {
  usuario: UserProps;
  isAuthenticated: boolean;
  singIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContexData);

export function signOut() {
  try {
    destroyCookie(undefined, "@nextauth.token");
    Router.push("");
  } catch {
    console.log("erro ao deslogar");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UserProps>();

  const isAuthenticated = !!usuario;

  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies();

    if (token) {
      api
        .get("/users")
        .then((response) => {
          const { id, name, email } = response.data;

          setUsuario({
            id,
            name,
            email,
          });
        })

        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function singIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      const { id, name, token } = response.data;

      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUsuario({
        id,
        name,
        email,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      toast.success("Logado com sucesso!");

      // Passar para proxima requicao
      Router.push("/dashboard");
    } catch (err) {
      toast.error("Erro ao acessar :(");
      console.log("Erro ao acessar ", err);
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
      });

      toast.success("Conta criada com sucesso");

      Router.push("/");
    } catch (err) {
      toast.error("Erro ao cadastrar :(");
      console.log("Erro ao cadastrar ", err);
    }
  }

  return (
    <AuthContext.Provider
      value={{ usuario, isAuthenticated, singIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
