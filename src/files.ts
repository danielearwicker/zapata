import * as fs from "fs";
import * as path from "path";

export function ensureDir(at: string) {
    if (!fs.existsSync(at)) {
        fs.mkdirSync(at);
    }
}

export function readText(fileName: string) {
    return fs.readFileSync(fileName, "utf8");
}

export function readDir(at: string) {
    return fs.readdirSync(at).filter(x => x[0] !== '.');
}

export function copyWhere(source: string, target: string, filter: (at: string) => boolean) {
    if (filter(source)) {
        const s = fs.statSync(source);
        if (s.isDirectory()) {
            ensureDir(target);
            for (const f of readDir(source)) {
                copyWhere(path.join(source, f), path.join(target, f), filter);
            }
        } else {
            fs.copyFileSync(source, target);
        }
    }
}

export function deleteAll(at: string) {
    if (fs.existsSync(at)) {
        const s = fs.statSync(at);
        if (s.isDirectory()) {
            for (const f of fs.readdirSync(at)) {
                deleteAll(path.join(at, f));
            }
            fs.rmdirSync(at);
        } else {
            fs.unlinkSync(at);
        }
    }
}
