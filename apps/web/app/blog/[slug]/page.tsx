import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPosts } from '@/lib/posts';
import { Window } from '@/components/Window';
export function generateStaticParams(){return getPosts().filter(p=>!p.source).map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params; const post=getPosts().find(p=>p.slug===slug); return {title:post?.title||'Article not found',description:post?.description};}
export default async function Article({params}:{params:Promise<{slug:string}>}) {const {slug}=await params;const post=getPosts().find(p=>p.slug===slug&&!p.source);if(!post)notFound();return <><Link className="back-link" href="/blog">← Back to Blog</Link><Window title={`${post.slug}.mdx`} meta="ORIGINAL POST"><article className="prose"><h1>{post.title}</h1><p className="mono">{post.date} · {post.category}</p><MDXRemote source={post.content}/></article></Window></>;}
