import type { RunStatus } from "../../types/run";
import styles from "./RunsToolbar.module.css";

interface RunsToolbarProps {
  searchQuery: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currStatus: RunStatus | "all";
  onStatusChange: (status: RunStatus | "all") => void;
}

const RunsToolbar = ({
  handleChange,
  searchQuery,
  onStatusChange,
  currStatus,
}: RunsToolbarProps) => {
  return (
    <div className={styles.toolbar}>
      <input
        className={styles.input}
        type="search"
        aria-label="Search runs"
        value={searchQuery}
        onChange={handleChange}
      />
      <div className={styles.filters}>
        <button
          onClick={() => onStatusChange("all")}
          aria-pressed={currStatus === "all"}
          className={styles.filterButton}
        >
          All
        </button>
        <button
          onClick={() => onStatusChange("queued")}
          aria-pressed={currStatus === "queued"}
          className={styles.filterButton}
        >
          Queued
        </button>
        <button
          onClick={() => onStatusChange("running")}
          aria-pressed={currStatus === "running"}
          className={styles.filterButton}
        >
          Running
        </button>
        <button
          onClick={() => onStatusChange("succeeded")}
          aria-pressed={currStatus === "succeeded"}
          className={styles.filterButton}
        >
          Succeeded
        </button>
        <button
          onClick={() => onStatusChange("failed")}
          aria-pressed={currStatus === "failed"}
          className={styles.filterButton}
        >
          Failed
        </button>
      </div>
    </div>
  );
};

export default RunsToolbar;
