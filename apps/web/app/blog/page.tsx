import type { Metadata } from 'next';
import { getPosts } from '@/lib/posts';
import { BlogDirectory } from '@/components/BlogDirectory';
export const metadata: Metadata = { title: 'Blog' };
export default function Blog(){ const posts=getPosts().map(({slug,title,description,date,category,source})=>({slug,title,description,date,category,source})); return <><div className="page-heading"><h1>NOTES &<br/>DISCOVERIES.</h1><p className="lead">Things I’ve learned. Things worth sharing.</p><p>Experiences from my projects, alongside interesting articles from around the web.</p></div><BlogDirectory posts={posts}/></>; }
