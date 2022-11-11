import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Chat App by Pierre Guéroult</h1>
      <ul>
        <li>
          <a
            href="https://pierregueroult.dev"
            target={"_blank"}
            rel="noreferrer"
          >
            Voir Mon site
          </a>
        </li>
        <li>
          <a href="" target={"_blank"} rel="noreferrer">
            Voir le code source
          </a>
        </li>
      </ul>
    </header>
  );
}
