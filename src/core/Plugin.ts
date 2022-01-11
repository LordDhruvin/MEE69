/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Promisable } from "./util";

/* @note - I cannot use unknown here or it gives errors, same with never so I am being forced to use any. */
export interface Plugin {
  readonly id: string;
  init?: (...args: any[]) => Promisable<any>;
  load: (...args: any[]) => Promisable<any>;
  reload: (...args: any[]) => Promisable<any>;
  unload: (...args: any[]) => Promisable<any>;
  destroy?: (...args: any[]) => Promisable<any>;
  refresh?: (...args: any[]) => Promisable<any>;
}
