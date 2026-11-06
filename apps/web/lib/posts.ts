import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
export type Post = { slug: string; title: string; description: string; date: string; category: string; source?: string; content: string };
export function readPost(slug: string, raw: string): Post {
  const {data, content} = matter(raw);
  for (const field of ['title','description','date','category']) if (typeof data[field] !== 'string' || !data[field].trim()) throw new Error(`${slug}: missing ${field}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || Number.isNaN(Date.parse(data.date))) throw new Error(`${slug}: invalid date`);
  if (data.source !== undefined && (typeof data.source !== 'string' || !/^https?:\/\//.test(data.source))) throw new Error(`${slug}: source must be an HTTP(S) URL`);
  return {slug,title:data.title,description:data.description,date:data.date,category:data.category,source:data.source,content};
}
export function getPosts(): Post[] {
  const directory = path.join(process.cwd(), 'content/posts');
  return fs.readdirSync(directory).filter(file=>/^[a-z0-9-]+\.mdx?$/.test(file)).map(file=>readPost(file.replace(/\.mdx?$/,''),fs.readFileSync(path.join(directory,file),'utf8'))).sort((a,b)=>b.date.localeCompare(a.date));
}
