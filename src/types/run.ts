export type RunStatus = "queued" | "succeeded" | "failed" | "running";

export interface Run {
  id: string;
  name: string;
  repository: string;
  branch: string;
  status: RunStatus;
  createdAt: string;
  logs: string[];
  durationSeconds?: number;
  result?: string;
}
