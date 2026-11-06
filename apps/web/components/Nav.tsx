'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from './Icon';
export function Nav() { const pathname = usePathname(); return <header className="menubar"><div className="menu-inner"><Link href="/" className="brand" aria-label="Ishaan home"><Icon/><span>Ishaan</span></Link><nav aria-label="Main navigation">{[['/', 'Home'], ['/projects', 'Projects'], ['/blog', 'Blog'], ['/about', 'About'], ['/contact', 'Contact']].map(([href,label]) => <Link key={href} href={href} aria-current={(href === '/' ? pathname === '/' : pathname.startsWith(href)) ? 'page' : undefined}>{label}</Link>)}</nav><span className="menu-profile">Ishaan P.<span>Open to work</span></span></div></header>; }
