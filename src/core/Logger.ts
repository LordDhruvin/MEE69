const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    green: "\x1b[32m",
    blue: "\x1b[34m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
    magenta: "\x1b[35m",
};

function color(
    str: string,
    color: keyof typeof colors,
    bright = false,
) {
    return `${bright ? colors.bright : colors.dim}${
        colors[color]
    }${str}${colors.reset}`;
}

function brackets(str: string) {
    return `${color("[", "magenta", true)}${str}${color(
        "]:",
        "magenta",
        true,
    )}`;
}

export class Logger {
    static success(str: string) {
        console.log(
            `${brackets(color("success", "green", true))} ${str}`,
        );
    }
    static info(str: string) {
        console.log(
            `${brackets(color("info", "blue", true))} ${str}`,
        );
    }
    static error(str: string) {
        console.log(
            `${brackets(color("warn", "yellow", true))} ${str}`,
        );
    }
    static warn(str: string) {
        console.log(
            `${brackets(color("error", "red", true))} ${str}`,
        );
    }
}
