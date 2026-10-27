import type { RunStatus } from "../../types/run";
import styles from "./StatusBadge.module.css";

interface StatusBadgeProps {
  status: RunStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return <span className={`${styles.badge} ${styles[status]}`}>{status}</span>;
};

export default StatusBadge;
