import Link from 'next/link';

export default function () {
    

    return (<div style={{ flex: '', flexDirection: 'column' }}>
        <li><Link href="/6502"><a href="#">6502</a></Link></li>
        <li><Link href="/65C02"><a href="#">65C02</a></Link></li>
    </div>)
}