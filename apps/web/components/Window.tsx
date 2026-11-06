import type { ReactNode } from 'react';
export function Window({ title, meta, children, className = '' }: { title: string; meta?: string; children: ReactNode; className?: string }) {
  return <section className={`window ${className}`}><div className="titlebar"><span className="window-pip" aria-hidden="true"/><span>{title}</span><span className="window-meta">{meta}</span></div>{children}</section>;
}
