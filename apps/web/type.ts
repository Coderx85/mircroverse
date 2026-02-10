export * from "@repo/types";
import { sizes, colors } from "@repo/types";

export type sizes = (typeof sizes)[number];

export type colors = (typeof colors)[number];

export type APIResponse<T> =
  | {
      ok: true;
      data: T;
      message: string;
    }
  | {
      ok: false;
      error: string;
      errorMessage: string;
    };
