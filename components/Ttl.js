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

export default Ttl;
