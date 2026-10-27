import { useState, useEffect } from "react";
import { getRuns } from "../services/runService";
import RunsList from "../components/RunsList/RunsList";
import RunsToolbar from "../components/RunsToolbar/RunsToolbar";
import RunDetails from "../components/RunDetails/RunDetails";
import styles from "./RunsPage.module.css";

import type { Run, RunStatus } from "../types/run";

const RunsPage = () => {
  const [runs, setRuns] = useState<Run[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<RunStatus | "all">("all");
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);

  useEffect(() => {
    getRuns()
      .then((newRuns) => {
        setRuns(newRuns);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [retryCount]);

  const onBack = () => {
    setSelectedRunId(null);
  };

  const onSelectedRun = (id: string) => {
    setSelectedRunId(id);
  };

  const onStatusChange = (status: RunStatus | "all") => {
    setStatusFilter(status);
  };

  const normalizedQuery = searchQuery.toLowerCase().trim();

  const filteredRuns = runs.filter((run) => {
    const matchesSearch =
      run.name.toLowerCase().includes(normalizedQuery) ||
      run.repository.toLowerCase().includes(normalizedQuery);
    const matchesStatus = statusFilter === "all" || run.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    setRetryCount((prev) => prev + 1);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
  };

  if (isLoading) {
    return <p>Loading runs...</p>;
  }

  if (error) {
    return (
      <>
        <p>{error}</p>
        <button onClick={handleRetry}>Retry</button>
      </>
    );
  }

  const selectedRun = runs.find((run) => run.id === selectedRunId);
  if (selectedRun) {
    return <RunDetails run={selectedRun} onBack={onBack} />;
  }

  return (
    <>
      <h2>Runs</h2>
      <RunsToolbar
        handleChange={handleChange}
        searchQuery={searchQuery}
        currStatus={statusFilter}
        onStatusChange={onStatusChange}
      />
      {filteredRuns.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>No runs found</h2>
          <p>No runs match your search or filters.</p>
          <button className={styles.resetButton} onClick={() => resetFilters()}>
            Reset filters
          </button>
        </div>
      ) : (
        <>
          <RunsList runs={filteredRuns} onSelectedRun={onSelectedRun} />
        </>
      )}
    </>
  );
};

export default RunsPage;
