
const cpu65C02 = [
    {
        category: 'Load & Store',
        name: 'LDA',
        flags: '<N>VBDI<Z>C',
        title: '<L>oa<D> <A>ccumulator',
    },
    {
        category: 'Load & Store',
        name: 'LDX',
        flags: '<N>VBDI<Z>C',
        title: '<L>oa<D> <X> register',
    },

    {
        category: 'Load & Store',
        name: 'LDY',
        flags: '<N>VBDI<Z>C',
        title: '<L>oa<D> <Y> register',
    },

    {
        category: 'Load & Store',
        name: 'STA',
        flags: 'NVBDIZC',
        title: '<ST>ore <A>ccumulator',
    },

    {
        category: 'Load & Store',
        name: 'STX',
        flags: 'NVBDIZC',
        title: '<ST>ore <X> register',
    },
    {
        category: 'Load & Store',
        name: 'STY',
        flags: 'NVBDIZC',
        title: '<ST>ore <Y> register',
    },
    {
        category: 'Load & Store',
        name: 'STZ',
        flags: 'NVBDIZC',
        title: '<ST>ore <Z>ero',
    },
    {
        category: 'Stack',
        name: 'PHA',
        flags: 'NVBDIZC',
        title: '<P>us<H> <A>ccumulator',
    },

    {
        category: 'Stack',
        name: 'PHX',
        flags: 'NVBDIZC',
        title: '<P>us<H> <X> register',
    },

    {
        category: 'Stack',
        name: 'PHY',
        flags: 'NVBDIZC',
        title: '<P>us<H> <Y> register',
    },

    {
        category: 'Stack',
        name: 'PHP',
        flags: 'NVBDIZC',
        title: '<P>us<H> <P>rocessor status',

    },

    {
        category: 'Stack',
        name: 'PLA',
        flags: 'NVBDIZC',
        title: '<P>u<L>l <A>ccumulator',

    },
    {
        category: 'Stack',
        name: 'PLP',
        flags: '<NVBDIZC>',
        title: '<P>u<L>l <P>rocessor status',

    },
    {
        category: 'Stack',
        name: 'PLX',
        flags: '<N>VBDI<Z>C',
        title: '<P>u<L>l <X> register',

    },

    {
        category: 'Stack',
        name: 'PLY',
        flags: '<N>VBDI<Z>C',
        title: '<P>u<L>l <Y> register',

    },

    {
        category: 'Stack',
        name: 'TXS',
        flags: '<N>VBDI<Z>C',
        title: '<T>ransfer <X> to <S>tack',

    },
    {
        category: 'Stack',
        name: 'TSX',
        flags: 'NVBDIZC',
        title: '<T>ransfer <S>tack to <X>',

    },

    {
        category: 'Calc',
        name: 'INA',
        flags: '<N>VBDI<Z>C',
        title: '<IN>crement <A>ccumulator',

    },
    {
        category: 'Calc',
        name: 'INX',
        flags: '<N>VBDI<Z>C',
        title: '<IN>crement <X>',

    },
    {
        category: 'Calc',
        name: 'INY',
        flags: '<N>VBDI<Z>C',
        title: '<IN>crement <Y>',

    },
    {
        category: 'Calc',
        name: 'DEA',
        flags: '<N>VBDI<Z>C',
        title: '<DE>crement <A>ccumulator',

    },
    {
        category: 'Calc',
        name: 'DEX',
        flags: '<N>VBDI<Z>C',
        title: '<DE>crement <X>',

    },
    {
        category: 'Calc',
        name: 'DEY',
        flags: '<N>VBDI<Z>C',
        title: '<DE>crement <Y>',

    },
    {
        category: 'Calc',
        name: 'INC',
        flags: '<N>VBDI<Z>C',
        title: '<INC>rement memory',

    },
    {
        category: 'Calc',
        name: 'DEC',
        flags: '<N>VBDI<Z>C',
        title: '<DEC>rement memory',

    },
    {
        category: 'Calc',
        name: 'ADC',
        title: '<AD>D with <C>arry',
        mode: { Im: 2, Z: 3, Zx: 4, Ab: 4 },

        flags: '<NV>BDI<ZC>'
    },
    {
        category: 'Calc',
        name: 'SBC',
        flags: '<NV>BDI<ZC>',
        title: '<S>u<B>tract with <C>arry',

    },
    {
        category: 'Bits',
        name: 'ASL',
        flags: '<N>VBDI<ZC>',
        title: '<A>rithmetic <S>hift <L>eft',

    },
    {
        category: 'Bits',
        name: 'LSR',
        flags: '<N>VBDI<ZC>',
        title: '<L>ogical <S>hift <R>ight',

    },
    {
        category: 'Bits',
        name: 'ROL',
        flags: '<N>VBDI<ZC>',
        title: '<RO>tate <L>eft',

    },
    {
        category: 'Bits',
        name: 'ROR',
        flags: '<N>VBDI<ZC>',
        title: '<RO>tate <R>ight',

    },
    {
        category: 'Bits',
        name: 'AND',
        flags: '<N>VBDI<Z>C',
        title: 'bitwise <AND> with accumulator',

    },
    {
        category: 'Bits',
        name: 'ORA',
        flags: '<N>VBDI<Z>C',
        title: 'bitwize <OR> with <A>ccumulator',

    },
    {
        category: 'Bits',
        name: 'EOR',
        flags: '<N>VBDI<Z>C',
        title: 'bitwise <E>xclusive <OR>',

    },
    {
        category: 'Bits',
        name: 'BIT',
        flags: '<NV>BDI<Z>C',
        title: 'test <BIT>s',

    },
    {
        category: 'Bits',
        name: 'CMP',
        flags: '<N>VBDI<ZC>',
        title: '<C>o<MP>are accumulator',

    },
    {
        category: 'Bits',
        name: 'CPX',
        flags: '<N>VBDI<ZC>',
        title: '<C>om<P>are <X> register',

    },
    {
        category: 'Bits',
        name: 'CPY',
        flags: '<N>VBDI<ZC>',
        title: '<C>om<P>are <Y> register',

    },
    {
        category: 'Bits',
        name: 'TRB',
        flags: 'NVBDIZC<X>',
        title: '<T>est and <R>eset <B>its',

    },
    {
        category: 'Bits',
        name: 'TSB',
        flags: 'NVBDIZC<X>',
        title: '<T>est and <S>et <B>its',

    },

    {
        category: 'Bits',
        name: 'RMB',
        flags: 'NVBDIZC<X>',
        title: '<R>eset <M>emory <B>it',

    },

    {
        category: 'Bits',
        name: 'SMB',
        flags: 'NVBDIZC<X>',
        title: '<S>et <M>emory <B>it',

    },
    {
        category: 'Flow',
        name: 'JMP',
        flags: 'NVBDIZC',
        title: '<J>u<MP>',

    },
    {
        category: 'Flow',
        name: 'JSR',
        flags: 'NVBDIZC',
        title: '<J>ump to <S>ub<R>outine',

    },
    {
        category: 'Flow',
        name: 'RTS',
        flags: 'NVBDIZC',
        title: '<R>e<T>urn from <S>ubroutine',

    },
    {
        category: 'Flow',
        name: 'RTI',
        flags: '<NVBDIZC>',
        title: '<R>e<T>urn from <I>nterrupt',

    },
    {
        category: 'Flow',
        name: 'BRA',
        flags: 'NVBDIZC',
        title: '<BR>anch <A>lways',

    },
    {
        category: 'Flow',
        name: 'BEQ',
        flags: 'NVBDIZC',
        title: '<B>ranch on <EQ>ual',

    },
    {
        category: 'Flow',
        name: 'BNE',
        flags: 'NVBDIZC',
        title: '<B>ranch on <N>ot <E>qual',

    },
    {
        category: 'Flow',
        name: 'BCC',
        flags: 'NVBDIZC',
        title: '<B>ranch on <C>arry <C>lear',

    },
    {
        category: 'Flow',
        name: 'BCS',
        flags: 'NVBDIZC',
        title: '<B>ranch on <C>arry <S>et',

    },
    {
        category: 'Flow',
        name: 'BVC',
        flags: 'NVBDIZC',
        title: '<B>ranch on o<V>erflow <C>lear',

    },
    {
        category: 'Flow',
        name: 'BVS',
        flags: 'NVBDIZC',
        title: '<B>ranch on o<V>erflow <S>et',

    },
    {
        category: 'Flow',
        name: 'BMI',
        flags: 'NVBDIZC',
        title: '<B>ranch on <MI>nus',

    },
    {
        category: 'Flow',
        name: 'BPL',
        flags: 'NVBDIZC',
        title: '<B>ranch on <PL>us',

    },
    {
        category: 'Flow',
        name: 'BBR<0-7>',
        flags: 'NVBDIZC',
        title: '<B>ranch on <B>it <R>eset',

    },
    {
        category: 'Flow',
        name: 'BBS<0-7>',
        flags: 'NVBDIZC',
        title: '<B>ranch on <B>it <S>et',

    },

    {
        category: 'State',
        name: 'CLC',
        flags: 'NVBDIZC',
        title: '<CL>ear <C>arry',

    },
    {
        category: 'State',
        name: 'CLD',
        flags: 'NVBDIZC',
        title: '<CL>ear <D>ecimal',

    },
    {
        category: 'State',
        name: 'CLI',
        flags: 'NVBDIZC',
        title: '<CL>ear <I>nterrupt',

    },
    {
        category: 'State',
        name: 'CLV',
        flags: 'NVBDIZC',
        title: '<CL>ear o<V>erflow',

    },
    {
        category: 'State',
        name: 'SEC',
        flags: 'NVBDIZC',
        title: '<SE>t <C>arry',

    },

    {
        category: 'State',
        name: 'SED',
        flags: 'NVBDIZC',
        title: '<SE>t <D>ecimal',

    },
    {
        category: 'State',
        name: 'SEI',
        flags: 'NVBDIZC',
        title: '<SE>t <I>nterrupt',

    },
    {
        category: 'Transfer',
        name: 'TAX',
        flags: '<N>VBDI<Z>C',
        title: '<T>ransfer <A> to <X>',

    },

    {
        category: 'Transfer',
        name: 'TAY',
        flags: '<N>VBDI<Z>C',
        title: '<T>ransfer <A> to <Y>',

    },
    {
        category: 'Transfer',
        name: 'TXA',
        flags: '<N>VBDI<Z>C',
        title: '<T>ransfer <X> to <A>',

    },
    {
        category: 'Transfer',
        name: 'TYA',
        flags: '<N>VBDI<Z>C',
        title: '<T>ransfer <Y> to <A>',

    },

    {
        category: 'Misc',
        name: 'BRK',
        flags: 'NV<B>DIZC',
        title: '<BR>ea<K>',

    },

    {
        category: 'Misc',
        name: 'NOP',
        flags: 'NVBDIZC',
        title: '<N>o <OP>eration',

    },

]

export const timing = {
    ADC: { Im: 2, Z: 3, Zx: 4, Ab: 4, Ax: '4+', Ay: '4+', Ix: 6, Iy: 5, Iz: 5, },
    AND: { Im: 2, Z: 3, Zx: 4, Ab: 4, Ax: '4+', Ay: '4+', Ix: 6, Iy: 5, Iz: 5, },
    ASL: { Ac: 2, Z: 5, Zx: 6, Ab: 6, Ax: '7+', },
    'BBR<0-7>': { R: 2, },
    'BBS<0-7>': { R: 2, },
    BCC: { R: 2, },
    BCS: { R: 2, },
    BEQ: { R: 2, },
    BIT: { Im: 2, Z: 3, Zx: 4, Ab: 4, Ax: '4+', },
    BMI: { R: 2, },
    BNE: { R: 2, },
    BPL: { R: 2, },
    BRA: { R: 3, },
    BRK: { Ip: 7, },
    BVC: { R: 2, },
    BVS: { R: 2, },
    CLC: { Ip: 2, },
    CLD: { Ip: 2, },
    CLI: { Ip: 2, },
    CLV: { Ip: 2, },
    CMP: { Im: 2, Z: 3, Zx: 4, Ab: 4, Ax: '4+', Ay: '4+', Ix: 6, Iy: 5, Iz: 5, },
    CPX: { Im: 2, Z: 3, Ab: 4, },
    CPY: { Im: 2, Z: 3, Ab: 4, },
    DEA: { Ac: 2, },
    DEC: { Z: 5, Zx: 6, Ab: 6, Ax: '7+', },
    DEX: { Ip: 2, },
    DEY: { Ip: 2, },
    EOR: { Im: 2, Z: 3, Zx: 4, Ab: 4, Ax: '4+', Ay: '4+', Ix: 6, Iy: 5, Iz: 5, },
    INA: { Ac: 2, },
    INC: { Z: 5, Zx: 6, Ab: 6, Ax: '7+', },
    INX: { Ip: 2, },
    INY: { Ip: 2, },
    JMP: { Ab: 3, Ia: '5+', IAx: '6+', },
    JSR: { Ab: 6, },
    LDA: { Im: 2, Z: 3, Zx: 4, Ab: 4, Ax: '4+', Ay: '4+', Ix: 6, Iy: 5, Iz: 5, },
    LDX: { Im: 2, Z: 3, Zy: 4, Ab: 4, Ay: '4+', },
    LDY: { Im: 2, Z: 3, Zy: 4, Ab: 4, Ay: '4+', },
    LSR: { Ac: 2, Z: 5, Zx: 6, Ab: 6, Ax: '7+', },
    NOP: { Ip: 2, },
    ORA: { Im: 2, Z: 3, Zx: 4, Ab: 4, Ax: '4+', Ay: '4+', Ix: 6, Iy: 5, Iz: 5, },
    PHA: { Ip: 3, },
    PHX: { Ip: 3, },
    PHY: { Ip: 3, },
    PHP: { Ip: 3 },
    PLP: { Ip: 4 },
    PLA: { Ip: 4, },
    PLX: { Ip: 4, },
    PLY: { Ip: 4, },
    ROL: { Ac: 2, Z: 5, Zx: 6, Ab: 6, Ax: '7+', },
    ROR: { Ac: 2, Z: 5, Zx: 6, Ab: 6, Ax: '7+', },
    RTI: { Ip: 6, },
    RTS: { Ip: 6, },
    SBC: { Im: 2, Z: 3, Zx: 4, Ab: 4, Ax: '4+', Ay: '4+', Ix: 6, Iy: 5, Iz: 5, },
    SEC: { Ip: 2, },
    SED: { Ip: 2, },
    SEI: { Ip: 2, },
    STA: { Z: 3, Zx: 4, Ab: 4, Ax: '5+', Ay: '5+', Ix: 6, Iy: 6, Iz: 5, },
    STX: { Z: 3, Zy: 4, Ab: 4, },
    STY: { Z: 3, Zx: 4, Ab: 4, },
    STZ: { Z: 3, Zx: 4, Ab: 4, Ax: '5+', },
    TAX: { Ip: 2, },
    TAY: { Ip: 2, },
    TRB: { Z: 5, Ab: 6, },
    TSB: { Z: 5, Ab: 6, },
    RMB: { Z: 5, Ab: 6, },
    SMB: { Z: 5, Ab: 6, },
    TSX: { Ip: 2, },
    TXA: { Ip: 2, },
    TXS: { Ip: 2, },
    TYA: { Ip: 2, },
}

export default cpu65C02;