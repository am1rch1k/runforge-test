import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import RunDetails from "./RunDetails";

import type { Run } from "../../types/run";

const mockRun: Run = {
  id: "1",
  name: "Auth refactor",
  repository: "web-platform",
  branch: "feature/auth",
  status: "running",
  createdAt: "2026-10-26T13:30:00",
  durationSeconds: 125,
  logs: ["Initializing agent"],
};

it("renders run details", () => {
  render(<RunDetails run={mockRun} onBack={() => {}} />);

  expect(
    screen.getByRole("heading", { name: "Auth refactor" }),
  ).toBeInTheDocument();

  expect(screen.getByText("web-platform")).toBeInTheDocument();
  expect(screen.getByText("Initializing agent")).toBeInTheDocument();
});
