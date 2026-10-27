import formatDate from "../../utils/formatDate";
import formatDuration from "../../utils/formatDuration";
import StatusBadge from "../StatusBadge/StatusBadge";
import styles from "./RunDetails.module.css";

import type { Run } from "../../types/run";

interface RunDetailsProps {
  run: Run;
  onBack: () => void;
}

const RunDetails = ({ run, onBack }: RunDetailsProps) => {
  const logs = run.logs.map((log: string, index: number) => {
    return (
      <li key={index} className={styles.logItem}>
        {log}
      </li>
    );
  });
  return (
    <>
      <button
        type="button"
        onClick={() => onBack()}
        className={styles.backButton}
      >
        <span aria-hidden="true" className={styles.arrow}>
          ←
        </span>
        Back to runs
      </button>
      <div className={styles.details}>
        <div className={styles.heading}>
          <h1 className={styles.title}>{run.name}</h1>
          <StatusBadge status={run.status} />
        </div>
        <dl className={styles.meta}>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>Repository</dt>
            <dd className={styles.metaValue}>{run.repository}</dd>
          </div>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>Branch</dt>
            <dd className={styles.metaValue}>{run.branch}</dd>
          </div>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>Created</dt>
            <dd className={styles.metaValue}>{formatDate(run.createdAt)}</dd>
          </div>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>Duration</dt>
            <dd className={styles.metaValue}>
              {run.durationSeconds !== undefined
                ? formatDuration(run.durationSeconds)
                : "Not available"}
            </dd>
          </div>
        </dl>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Logs:</h2>
          <ul className={styles.logs}>{logs}</ul>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Result: </h2>
          <div className={styles.result}>
            <p>{run.result ?? "no result yet"}</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default RunDetails;
