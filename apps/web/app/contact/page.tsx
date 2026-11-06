import type { Metadata } from 'next';
import { Window } from '@/components/Window';
import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icon';
import { email, socialLinks } from '@/lib/profile';
export const metadata: Metadata = { title: 'Contact' };
export default function Contact() { return <><div className="page-heading"><h1>LET’S CONNECT.</h1><p className="lead">A good conversation is a great place to start.</p><p>I’m open to hiring opportunities. Send a message about a role, a project, or something interesting you’re building.</p></div><div className="contact-grid"><Window title="New_Message.mail" meta="COMPOSE"><div className="window-body"><ContactForm/></div></Window><aside className="stack"><Window title="Address_Book"><div className="window-body"><Icon name="mail" size={40}/><h2>Prefer email?</h2><p>You can reach me directly at:</p><a className="email-link" href={`mailto:${email}`}>{email}</a><div className="actions">{socialLinks.map(link => <a key={link.label} className="button" href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div></div></Window><Window title="Availability.txt"><div className="window-body"><span className="availability"><span/>Open to opportunities</span><p>Undergraduate at IIT Jodhpur.<br/>Expected graduation: 2029.</p></div></Window></aside></div></>; }
