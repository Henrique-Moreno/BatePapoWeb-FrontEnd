import {useState, FormEvent, ChangeEvent, useContext} from 'react';
import Head from "next/head";
import styles from '../../../styles/home.module.scss';

import { Input } from '../../components/ui/Input';
import { Button } from "../../components/ui/Button";

import { AuthContext } from '../../contexts/AuthContext';

import {toast} from 'react-toastify'

import Link from "next/link";

export default function Cadastro() {

  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [ password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCadastrar(event: FormEvent) {
    event.preventDefault();

    if(name === '' || email === '' || password === '') {
      
      toast.error("Preencha todos os campos :(")
      return;
    }

    setLoading(true);

    let data = {
      name, 
      email,
      password
    }

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
            <Input placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />

            <Input placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />

            <Input placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              loading={loading}
            >
              Cadastrar
            </Button>

          </form>

          <Link href="/" className={styles.text}>

            Já possui uma conta? Faça login!

          </Link>

        </div>
      </div>

    </>
  )
}
