import formatDate from "../../utils/formatDate";
import formatDuration from "../../utils/formatDuration";
import StatusBadge from "../StatusBadge/StatusBadge";

import type { Run } from "../../types/run";

interface RunDetailsProps {
  run: Run;
  onBack: () => void;
}

const RunDetails = ({ run, onBack }: RunDetailsProps) => {
  const logs = run.logs.map((log: string, index: number) => {
    return <li key={index}>{log}</li>;
  });
  return (
    <>
      <h1>{run.name}</h1>
      <h2>Status:</h2>
      <StatusBadge status={run.status} />
      <p>Repository: {run.repository}</p>
      <p>Branch: {run.branch}</p>
      <p>Created: {formatDate(run.createdAt)}</p>
      <p>
        Duration:{" "}
        {run.durationSeconds !== undefined
          ? formatDuration(run.durationSeconds)
          : "Not available"}
      </p>
      <h2>Logs:</h2>
      <ul>{logs}</ul>
      <h2>Result: </h2> <p>{run.result ?? "no result yet"}</p>
      <button type="button" onClick={() => onBack()}>
        Back to runs
      </button>
    </>
  );
};

export default RunDetails;
