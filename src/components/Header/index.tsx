import { useContext } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";

export function Header() {
  const { usuario, signOut } = useContext(AuthContext);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="dashboard" className={styles.nomeUsuario}>
          <h1>Olá</h1>
          <h2>{usuario?.name}</h2>
        </Link>

        <nav className={styles.menuNav}>
          <Link href="/dashboard">Bate Papo Web</Link>

          <Link href="/registro">Cadastro de Usuários</Link>

          <button onClick={signOut}>
            <FiLogOut color="#FFF" size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
}
