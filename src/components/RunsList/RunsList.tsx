import type { Run } from "../../types/run";
import RunItem from "../RunItem/RunItem";
import styles from "./RunsList.module.css";

interface RunsListProps {
  runs: Run[];
  onSelectedRun: (id: string) => void;
}

const RunsList = ({ runs, onSelectedRun }: RunsListProps) => {
  const items = runs.map((run) => (
    <RunItem key={run.id} run={run} onSelectedRun={onSelectedRun} />
  ));
  return <ul className={styles.list}>{items}</ul>;
};

export default RunsList;
