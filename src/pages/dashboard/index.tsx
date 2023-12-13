import { canSSRAuth } from "../../utils/canSSRAuth";
import { Header } from "../../components/Header";
import styles from "styles.module.scss";
import { setupAPIClient } from "../../services/api";
import { useState } from "react";

type BatePapoProps = {
  messageId: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string;
};

interface HomeProps {
  message: BatePapoProps[];
}

export default function dashboard({ message }: HomeProps) {
  const [messagem, setMessagem] = useState(message || []);

  return (
    <>
      <Header />

      <main>
        <h1 className="">Bem vindo ao painel!</h1>
        {message.map((item) => (
          <div key={item.messageId}>
            <p>Message ID: {item.messageId}</p>
            <p>Content: {item.content}</p>
            <p>Nome: {item.userName}</p>
            <p>Timestamp: {item.timestamp}</p>
          </div>
        ))}
        ;
      </main>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apliClient = setupAPIClient(ctx);

  const response = await apliClient.get("/message");

  console.log(response.data);

  return {
    props: {},
  };
});
