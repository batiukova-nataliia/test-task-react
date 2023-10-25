import { User } from "./User";

export type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
};
