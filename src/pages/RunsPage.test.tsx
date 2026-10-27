import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import RunsPage from "./RunsPage";
import { getRuns } from "../services/runService";
import type { Run } from "../types/run";

vi.mock("../services/runService", () => ({
  getRuns: vi.fn(),
}));

const mockRuns: Run[] = [
  {
    id: "1",
    name: "Auth refactor",
    repository: "web-platform",
    branch: "feature/auth",
    status: "running",
    createdAt: "2026-10-26T13:30:00",
    logs: [],
  },
  {
    id: "2",
    name: "Fix checkout tests",
    repository: "payments",
    branch: "fix/checkout",
    status: "succeeded",
    createdAt: "2026-10-26T12:15:00",
    logs: [],
  },
];

// Первый тест на фильтрацию по статусам

it("filters runs by status", async () => {
  vi.mocked(getRuns).mockResolvedValue(mockRuns);

  const user = userEvent.setup();
  render(<RunsPage />);

  await screen.findByRole("heading", {
    name: "Auth refactor",
  });

  await user.click(screen.getByRole("button", { name: "Running" }));

  expect(
    screen.getByRole("heading", { name: "Auth refactor" }),
  ).toBeInTheDocument();

  expect(
    screen.queryByRole("heading", { name: "Fix checkout tests" }),
  ).not.toBeInTheDocument();
});

// Второй тест на фильтрацию по поиску

it("filters runs by search query", async () => {
  vi.mocked(getRuns).mockResolvedValue(mockRuns);

  const user = userEvent.setup();

  render(<RunsPage />);

  await screen.findByRole("heading", {
    name: "Auth refactor",
  });

  const searchInput = screen.getByRole("searchbox");

  await user.type(searchInput, "checkout");

  expect(
    screen.getByRole("heading", {
      name: "Fix checkout tests",
    }),
  ).toBeInTheDocument();

  expect(
    screen.queryByRole("heading", {
      name: "Auth refactor",
    }),
  ).not.toBeInTheDocument();
});

it("opens run details and returns to the list", async () => {
  vi.mocked(getRuns).mockResolvedValue(mockRuns);

  const user = userEvent.setup();

  render(<RunsPage />);

  // Ждём загрузки списка
  await screen.findByRole("heading", {
    name: "Auth refactor",
  });

  // Открываем подробности первого запуска
  const detailsButtons = screen.getAllByRole("button", {
    name: "View details",
  });

  await user.click(detailsButtons[0]);

  // Проверяем, что открылись подробности
  expect(
    screen.getByRole("heading", { name: "Auth refactor" }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: "Back to runs" }),
  ).toBeInTheDocument();

  // Возвращаемся к списку
  await user.click(screen.getByRole("button", { name: "Back to runs" }));

  // Проверяем, что список снова отображается
  expect(
    screen.getByRole("heading", {
      name: "Fix checkout tests",
    }),
  ).toBeInTheDocument();
});
