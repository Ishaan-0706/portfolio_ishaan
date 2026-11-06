import Link from 'next/link';
import { Window } from '@/components/Window';
export default function NotFound(){return <Window title="File_Not_Found"><div className="empty-state"><h1>404.</h1><h2>This file isn’t on the disk.</h2><p>The page may have moved, or the address may be incorrect.</p><Link href="/" className="button">Return to desktop</Link></div></Window>;}
