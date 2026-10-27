import formatDuration from "../../utils/formatDuration";
import formatDate from "../../utils/formatDate";
import StatusBadge from "../StatusBadge/StatusBadge";
import styles from "./RunItem.module.css";

import type { Run } from "../../types/run";

interface RunItemProps {
  run: Run;
  onSelectedRun: (id: string) => void;
}

const RunItem = ({ run, onSelectedRun }: RunItemProps) => {
  return (
    <li className={styles.item}>
      <div className={styles.runMeta}>
        <StatusBadge status={run.status} />
        <p className={styles.secondary}>{formatDate(run.createdAt)}</p>
        <p className={styles.secondary}>
          {run.durationSeconds !== undefined
            ? formatDuration(run.durationSeconds)
            : "—"}
        </p>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.detailsButton}
          onClick={() => onSelectedRun(run.id)}
        >
          View details
        </button>
      </div>
    </li>
  );
};

export default RunItem;
