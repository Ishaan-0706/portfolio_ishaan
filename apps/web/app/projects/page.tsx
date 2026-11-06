import type { Metadata } from 'next';
import { ProjectDirectory } from '@/components/ProjectDirectory';
import { ContactBanner } from '@/components/ContactBanner';
export const metadata: Metadata = { title: 'Projects' };
export default function Projects() { return <><div className="page-heading"><h1>PROJECTS.</h1><p className="lead">Ideas turned into working systems.</p><p>A collection of projects I’ve contributed to, from agent discovery to local video streaming.</p></div><ProjectDirectory/><ContactBanner/></>; }
