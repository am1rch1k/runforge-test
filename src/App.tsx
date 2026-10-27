import RunsPage from "./pages/RunsPage";
import styles from "./App.module.css";
import "./index.css";

const App = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>runforge</h1>
        <span>WORKSPACE / DEMO</span>
      </header>
      <main className={styles.main}>
        <h2>Runs</h2>
        <RunsPage />
      </main>
    </>
  );
};

export default App;
