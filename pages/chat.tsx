import ChatComponent from "../components/Chat";
import Link from "next/link";
import styles from "./chat.module.scss";

export default function Chat() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.chatbox}>
          <h1>Chattez ici !</h1>
          <ChatComponent />
        </div>
        <p className={styles.back}>
          <Link href="/">{"Retourner à l'accueil"}</Link>
        </p>
      </main>
    </>
  );
}
