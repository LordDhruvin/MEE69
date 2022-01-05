import { statSync } from "fs";

export type Promisable<T> = Promise<T> | T;
import { Plugin } from "./plugins/Plugin";
import { resolve } from "path";
import { readdir } from "fs/promises";

// Can't do anything of that long name because that had to be descriptive
export async function readDirRecursivelyAndCall<T = Plugin>(
    dir: string,
    filter: (file: string) => Promisable<boolean>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    func: (plugin: T, filename: string) => Promisable<any>,
): Promise<boolean> {
    try {
        const files = await readDirRecursively(dir);
        files
            .filter(filter)
            .forEach((file) =>
                func(
                    iRequire<T>(resolve(dir, file)),
                    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
                    file.split(".")[0]!,
                ),
            );
        return true;
    } catch {
        return false;
    }
}

export async function readDirRecursively(dir: string) {
    const res: string[] = [];
    const files = await readdir(dir);

    // WebStorm Warning "Promise returned from forEach argument is ignored" can safely be ignored
    files.forEach(async (file) => {
        if (statSync(file).isDirectory()) {
            const temp = await readDirRecursively(file);
            res.push(...temp);
        } else {
            res.push(file);
        }
    });

    return res;
}

export function iRequire<T>(id: string): T {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const res = require(id);
    if ("default" in res) return res.default as T;
    return res as T;
}
