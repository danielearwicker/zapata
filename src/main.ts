import * as handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";
import { readPosts } from "./posts";
import { readText, copyWhere, ensureDir, deleteAll } from "./files";

export function create() {
    const example = path.join(__dirname, "..", "example");
    copyWhere(example, ".", p => p !== path.join(example, "generated"));
}

export function generate() {

    const postsDir = fs.realpathSync("posts");

    ensureDir("generated");
    const generatedDir = fs.realpathSync("generated");

    const templateFile = fs.realpathSync("template.html");

    const posts = readPosts(postsDir);

    deleteAll(generatedDir);

    copyWhere(".", generatedDir, p => {
        p = fs.realpathSync(p);
        return (p !== generatedDir &&
                p !== postsDir &&
                p !== templateFile);
    });

    const template = handlebars.compile(readText(templateFile));

    for (const post of posts) {
        fs.writeFileSync(
            path.join(generatedDir, `${post.id}.html`),
            template(post));
    }

    const latest = posts[0];
    if (latest) {
        fs.writeFileSync(
            path.join(generatedDir, "index.html"), 
            `<!DOCTYPE html>
            <html>
                <head>                    
                    <title>${latest.title}</title>
                    <script>
                        window.location.replace("${latest.id}.html");
                    </script>
                </head>
                <body></body>
            </html>`
        )
    }
}
