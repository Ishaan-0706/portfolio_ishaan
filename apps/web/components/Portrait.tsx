import Image from 'next/image';
import { Window } from './Window';
export function Portrait() { return <Window title="Ishaan_Profile.bmp" className="portrait-window"><div className="portrait-mat"><Image src="/ishaan.png" alt="Pixel-art portrait of Ishaan" width={1024} height={1024} priority/></div><div className="window-status"><span>1-BIT PORTRAIT</span><span>100% SCALE</span></div></Window>; }
