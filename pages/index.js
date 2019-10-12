import { useState } from 'react';
import commands from '../6502';

function colSize(color, size) {
    return { color, fontSize: size + 'px' };
}

function Ttl({ txt, color = '#900', size = 10 }) {
    const gray = colSize('#aaa', size);
    const mark = colSize(color, size);

    let arr = [];
    let t = '' + txt;
    while (t.indexOf('<') >= 0) {
        let i0 = t.indexOf('<');
        let i1 = t.indexOf('>', i0);
        if (i0 > 0) {
            arr.push(<span style={gray}>{t.substring(0, i0)}</span>)
        }
        arr.push(<span style={mark}>{t.substring(i0 + 1, i1)}</span>);
        t = t.substring(i1 + 1);
    }
    arr.push(<span style={gray}>{t}</span>)
    return <span>
        {arr}
    </span>;
}

function Cmd({name, title, flags, modes = '' }) {
    return <div className='card' >
        <div className='cmdName'>{name}</div>
        <span style={{ float: 'right' }}>
            <Ttl txt={flags} />
        </span><br />
        <Ttl size={12} color='black' txt={title} /><br />
        <div className='activeModes'>
            <Ttl color='#080' txt={modes} />
        </div>
    </div>
}

function Modes() {
    return (
        <div className='card'>
            &nbsp;Modes
            <table style={{ margin: '4px' }}>
                <tbody>
                    <tr><td><Ttl size={12} color='#080' txt='<A>ccumulator' /></td><td></td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<L>a<b>el' /></td><td>LABEL</td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<Im>mediate' /></td><td>#$12</td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<Z>ero Page' /></td><td>$12</td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<Z>ero Page,<x>' /></td><td>$12,X</td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<Z>ero Page,<y>' /></td><td>$12,Y</td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<Ab>solute' /></td><td>$1234</td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<A>bsolute,<x>' /></td><td>$1234,X</td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<A>bsolute,<y>' /></td><td>$1234,Y</td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<In>direct' /></td><td>($1234)</td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<I>ndirect,<x>' /></td><td>($12,X)</td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<I>ndirect,<y>' /></td><td>($12),Y</td></tr>
                </tbody>
            </table>
            <style jsx>{`
                td {
                    font-size: 10px;
                }
                td:last-child {
                    text-align:right;
                    color: #F0F;
                }
            `}
            </style>
        </div>
    );
}

export default function () {
    const [ext, setExt] = useState({});

    return (<div style={{ flex: '', flexDirection: 'column' }}>
        <table style={{ width: '800px', height: '1600px' }}>
            <tbordy>
                <tr>
                    <td valign="top"><Modes />{commands.filter(d => d.col == 0).map(d => <Cmd {...d} />)}</td>
                    <td valign="top">{commands.filter(d => d.col == 1).map(d => <Cmd {...d} />)}</td>
                    <td valign="top">{commands.filter(d => d.col == 2).map(d => <Cmd {...d} />)}</td>
                    <td valign="top">{commands.filter(d => d.col == 3).map(d => <Cmd {...d} />)}</td>
                </tr>
            </tbordy>
        </table>
        <style jsx global>{`
            @font-face {
                font-family: c64pro;
                src:url("/static/C64_Pro-STYLE.ttf");
            }
            * {
                font-family: c64pro;
                font-size: 14px;
            }
            .card {
                width: 190px;
                display: inline-block;
                padding:1px;
                border:2px solid silver;
                margin-top:4px;
            }
            .cmdName {
                display: inline-block;
                color: white;
                background: black;
                padding: 3px;
            }
            .activeModes {
                margin-top: 2px;
                padding-top:2px;
                border-top: solid 1px silver;
            }
        `}</style>

    </div>)
}