import matter from "gray-matter";
import moment from "moment";
import * as showdown from "showdown";
import * as path from "path";
import { readText, readDir } from "./files";

export class Post {

    id: string;
    title: string;
    content: string;
    data: any;

    posted: string;
    postedSeconds: number;

    constructor(sourceFile: string, private allPosts: Post[]) {
        
        const { data, content } = matter(readText(sourceFile));

        this.id = path.parse(sourceFile).name;
        this.title = data.title;
        this.content = new showdown.Converter().makeHtml(content);        
        this.posted = moment(data.posted).format("D MMM YYYY");        
        this.postedSeconds = data.posted.getTime();
        this.data = data;
    }

    get posts() {
        return this.allPosts.map(p => ({
            self: p === this,
            other: p !== this,
            id: p.id,
            posted: p.posted,
            title: p.data.title,
            data: p.data
        }));
    }
}

export function readPosts(postsDir: string) {

    const posts: Post[] = [];

    for (const postFileName of readDir(postsDir)) {
        posts.push(new Post(path.join(postsDir, postFileName), posts));
    }

    posts.sort((a, b) => b.postedSeconds - a.postedSeconds);

    return posts;
}
