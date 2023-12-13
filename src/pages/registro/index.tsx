import { useState, FormEvent, ChangeEvent, useContext } from "react";
import Head from "next/head";
import styles from "../../../styles/home.module.scss";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import { AuthContext } from "../../contexts/AuthContext";

import { toast } from "react-toastify";

export default function Cadastro() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setnickname] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCadastrar(event: FormEvent) {
    event.preventDefault();

    if (name === "" || birthdate === "" || password === "") {
      toast.error("Preencha todos os campos :(");
      return;
    }

    setLoading(true);

    let data = {
      name,
      birthdate,
      nickname,
      password,
    };

    await signUp(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Faça seu cadastro</title>
      </Head>
      <div className={styles.containerCerter}>
        <div className={styles.login}>
          <h1 className={styles.logo}>Crie sua conta</h1>

          <form onSubmit={handleCadastrar}>
            <Input
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />

            <Input
              placeholder="Data de Nascimento"
              type="text"
              value={birthdate}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBirthdate(e.target.value)
              }
            />

            <Input
              placeholder="Data de Nascimento"
              type="text"
              value={nickname}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setnickname(e.target.value)
              }
            />

            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />

            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
