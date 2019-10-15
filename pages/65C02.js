import Ttl from '../components/Ttl';

import commands, {timing} from '../cpus/65C02';

function Cmd({name, title, flags, modes = '', bg='#FFF' }) {
    const mode = timing[name] || {'?????':0}
    const mm = Object.keys(mode).map((k, i)=>{ return <span key={i} style={{display:'inline-block',color:'#777',paddingRight:'6px'}}>{k}<sup style={{color:'#060'}}>{mode[k]}</sup></span> })
    return <div className='card flex-item' style={{background:bg}}>
        <div className='cmdName'>{name}</div>
        <span style={{ float: 'right' }}>
            <Ttl txt={flags} />
        </span><br />
        <Ttl size={12} color='black' txt={title} /><br />
        <div className="activeModes">
            {mm}
        </div>
    </div>
}

function Modes() {
    return (
        <div className='card flex-item'>
            <table style={{ margin: '4px' }}>
                <tbody>
                    <tr><td><Ttl size={12} color='#080' txt='<I>m<p>lied' /></td><td></td></tr>                    
                    <tr><td><Ttl size={12} color='#080' txt='<Ac>cumulator' /></td><td></td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<Im>mediate' /></td><td>#$12</td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<Z>eroPage' /></td><td>$12</td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<Z>eroPage,<x>' /></td><td>$12,X</td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<Z>eroPage,<y>' /></td><td>$12,Y</td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<Ab>solute' /></td><td>$1234</td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<A>bsolute,<x>' /></td><td>$1234,X</td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<A>bsolute,<y>' /></td><td>$1234,Y</td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<R>elative' /></td><td>LABEL</td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<I>nd, zp <x>' /></td><td>($12,X)</td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<I>nd, <a>bs <x>' /></td><td>($1234,X)</td></tr>                    
                    <tr><td><Ttl size={12} color='#080' txt='<I>nd, zp <y>' /></td><td>($12),Y</td></tr>
                    <tr><td><Ttl size={12} color='#080' txt='<I>nd, <z>p' /></td><td>($12)</td></tr>                    
                    <tr><td><Ttl size={12} color='#080' txt='<I>nd, <a>bs' /></td><td>($1234)</td></tr>                    
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

export const categories = [
    'Load & Store',
    'Stack',
    'Bits',
    'Flow',
    'State',
    'Transfer',
    'Misc',
    'Calc',
];
const catCol = [
    '#efe',
    '#eff',
    '#eef',
    '#fef',    
    '#ffe',
    '#fee',    
    '#fed',
    '#def'    
]


function Cat({ix}) {
    const category = categories[ix];
    const bg=catCol[ix] || '#eee';
    return (<div className="category" style={{backgroundColor:bg}}>
        <div style={{textAlign:'center'}}>{ix} {category}</div>
        {commands.filter(d => d.category == category).map(d => <Cmd {...d} />)}    
    </div>)
}


function CatList({ix}) {
    return <>
        <div className='flex-item cat-title' style={{background:catCol[ix]}}>{categories[ix]}</div>
        {commands.filter(d => d.category === categories[ix]).map(d => <Cmd bg={catCol[ix]} {...d} />)}
    </>
}

export default function () {
    return (<div>
        <div style={{textAlign:'center',fontSize:'18px',color:'gray'}}>65C02 INSTRUCTIONS</div>
        <div className='flex-container' style={{height:'1225px'}}>
            <div className='flex-item cat-title'>Modes</div>
            <Modes />
            <CatList ix={0}/>
            <CatList ix={4}/>
            <CatList ix={2}/>
            <CatList ix={3}/>
            <CatList ix={1}/>
            <CatList ix={5}/>                        
            <CatList ix={7}/>                        
            <CatList ix={6}/>
        </div>
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
                width: 200px;
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
                text-align:right;
                margin-top: 2px;
                padding-top:2px;
                border-top: solid 1px silver;
            }
            .cat-title {
                text-align: center;
                padding: 3px;
                border: 1px solid silver;
                border-radius: 4px;
                margin-top: 8px;
            }
            .flex-container {
                display: -ms-flexbox;
                display: -webkit-flex;
                display: flex;
                -webkit-flex-direction: column;
                -ms-flex-direction: column;
                flex-direction: column;
                -webkit-flex-wrap: wrap;
                -ms-flex-wrap: wrap;
                flex-wrap: wrap;
                -webkit-justify-content: flex-start;
                -ms-flex-pack: start;
                justify-content: space-between;
                -webkit-align-content: center;
                -ms-flex-line-pack: center;
                align-content: center;
                -webkit-align-items: stretch;
                -ms-flex-align: stretch;
                align-items: stretch;
            }
            .flex-item {
                margin-right: 4px;
                -webkit-order: 0;
                -ms-flex-order: 0;
                order: 0;
                -webkit-flex: 0 1 auto;
                -ms-flex: 0 1 auto;
                flex: 0 1 auto;
                -webkit-align-self: auto;
                -ms-flex-item-align: auto;
                align-self: auto;
            }
        `}</style>

    </div>)
}