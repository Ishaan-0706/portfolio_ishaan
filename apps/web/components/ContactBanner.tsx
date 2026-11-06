import Link from 'next/link';
import { Icon } from './Icon';
export function ContactBanner() { return <section className="contact-banner"><div className="accessory-icon"><Icon name="mail" size={32}/></div><div><h2>Let’s build something together.</h2><p>I’m open to hiring opportunities. Have a role or an idea in mind?</p></div><Link className="button primary" href="/contact">Send a message <Icon name="arrow" size={16}/></Link></section>; }
