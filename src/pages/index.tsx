import { useContext , FormEvent, useState, ChangeEvent } from "react";
import Head from "next/head";
import styles from '../../styles/home.module.scss';

import { Input } from '../components/ui/Input';
import { Button } from "../components/ui/Button";
import {toast} from 'react-toastify';

import { AuthContext } from "../contexts/AuthContext";

import Link from "next/link";

import { canSSRGuest} from "../utils/canSSRGuest";


export default function Home() {
  
  const  { singIn } = useContext(AuthContext);

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if(email === '' || password === '') {

      toast.warning("Preencha os campos")
      
      return;
    }

    setLoading(true);


    let data = {
      email,
      password
    }

   await singIn(data)

   setLoading(false);

  }

  return (
    <>
      <Head>
        <title>Faça seu login</title>
      </Head>
      <div className={styles.containerCerter}>

        <div className={styles.login}>

          <h1 className={styles.logo}>Faça seu Login!</h1>

          <form onSubmit={handleLogin}>

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
              Acessar
            </Button>

          </form>

          <Link href="/cadastro" className={styles.text}>

            Não possui uma conta? Cadastre-se.

          </Link>

        </div>
      </div>

    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {

  return {
    props: {}
  }

})
