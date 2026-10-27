import type { Run } from "../types/run";
import { mockRuns } from "../data/mockRuns";

// Ошибка для проверки

// export const getRuns = (): Promise<Run[]> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject(new Error("Failed to load runs"));
//     }, 600);
//   });
// };

// Обычные данные

export const getRuns = (): Promise<Run[]> => {
  return new Promise((res) => {
    setTimeout(() => {
      res(mockRuns);
    }, 2000);
  });
};
