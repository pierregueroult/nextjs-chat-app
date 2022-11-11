import Head from "next/head";
import styles from "./index.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Chat App by Pierre Guéroult</title>
      </Head>

      <main className={styles.main}>
        <Link href={"/chat"}>Entrer dans le chat !</Link>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
