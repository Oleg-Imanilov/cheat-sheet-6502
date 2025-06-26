
const cpu65C02 = [
    {
        category: 'Load & Store',
        name: 'LDA',
        flags: '<N>VBDI<Z>C',
        title: '<L>oa<D> <A>ccumulator',
        hex: { Im: 'A9', Z: 'A5', Zx: 'B5', Ab: 'AD', Ax: 'BD', Ay: 'B9', Ix: 'A1', Iy: 'B1' }
    },
    {
        category: 'Load & Store',
        name: 'LDX',
        flags: '<N>VBDI<Z>C',
        title: '<L>oa<D> <X> register',
        hex: { Im: 'A2', Z: 'A6', Zy: 'B6', Ab: 'AE', Ay: 'BE' }
    },

    {
        category: 'Load & Store',
        name: 'LDY',
        flags: '<N>VBDI<Z>C',
        title: '<L>oa<D> <Y> register',
        hex: { Im: 'A0', Z: 'A4', Zx: 'B4', Ab: 'AC', Ax: 'BC' }
    },

    {
        category: 'Load & Store',
        name: 'STA',
        flags: 'NVBDIZC',
        title: '<ST>ore <A>ccumulator',
        hex: { Z: '85', Zx: '95', Ab: '8D', Ax: '9D', Ay: '99', Ix: '81', Iy: '91' }
    },

    {
        category: 'Load & Store',
        name: 'STX',
        flags: 'NVBDIZC',
        title: '<ST>ore <X> register',
        hex: { Z: '86', Zy: '96', Ab: '8E' }
    },
    {
        category: 'Load & Store',
        name: 'STY',
        flags: 'NVBDIZC',
        title: '<ST>ore <Y> register',
        hex: { Z: '84', Zx: '94', Ab: '8C' }
    },
    {
        category: 'Load & Store',
        name: 'STZ',
        flags: 'NVBDIZC',
        title: '<ST>ore <Z>ero',
        hex: { Z: '64', Zx: '74', Ab: '9C', Ax: '9E' }
    },
    {
        category: 'Stack',
        name: 'PHA',
        flags: 'NVBDIZC',
        title: '<P>us<H> <A>ccumulator',
        hex: { Im: '48' }
    },

    {
        category: 'Stack',
        name: 'PHX',
        flags: 'NVBDIZC',
        title: '<P>us<H> <X> register',
        hex: { Im: 'DA' }
    },

    {
        category: 'Stack',
        name: 'PHY',
        flags: 'NVBDIZC',
        title: '<P>us<H> <Y> register',
        hex: { Im: '5A' }
    },

    {
        category: 'Stack',
        name: 'PHP',
        flags: 'NVBDIZC',
        title: '<P>us<H> <P>rocessor status',
        hex: { Im: '08' }
    },

    {
        category: 'Stack',
        name: 'PLA',
        flags: '<N>VBDI<Z>C',
        title: '<P>u<L>l <A>ccumulator',
        hex: { Im: '68' }
    },
    {
        category: 'Stack',
        name: 'PLP',
        flags: '<NVBDIZC>',
        title: '<P>u<L>l <P>rocessor status',
        hex: { Im: '28' }
    },
    {
        category: 'Stack',
        name: 'PLX',
        flags: '<N>VBDI<Z>C',
        title: '<P>u<L>l <X> register',
        hex: { Im: 'FA' }
    },

    {
        category: 'Stack',
        name: 'PLY',
        flags: '<N>VBDI<Z>C',
        title: '<P>u<L>l <Y> register',
        hex: { Im: '7A' }
    },

    {
        category: 'Stack',
        name: 'TXS',
        flags: 'NVBDIZC',
        title: '<T>ransfer <X> to <S>tack',
        hex: { Im: '9A' }
    },
    {
        category: 'Stack',
        name: 'TSX',
        flags: '<N>VBDI<Z>C',
        title: '<T>ransfer <S>tack to <X>',
        hex: { Im: 'BA' }
    },

    {
        category: 'Calc',
        name: 'INA',
        flags: '<N>VBDI<Z>C',
        title: '<IN>crement <A>ccumulator',
        hex: { Im: '1A' }
    },
    {
        category: 'Calc',
        name: 'INX',
        flags: '<N>VBDI<Z>C',
        title: '<IN>crement <X>',
        hex: { Im: 'E8' }
    },
    {
        category: 'Calc',
        name: 'INY',
        flags: '<N>VBDI<Z>C',
        title: '<IN>crement <Y>',
        hex: { Im: 'C8' }
    },
    {
        category: 'Calc',
        name: 'DEA',
        flags: '<N>VBDI<Z>C',
        title: '<DE>crement <A>ccumulator',
        hex: { Im: '3A' }
    },
    {
        category: 'Calc',
        name: 'DEX',
        flags: '<N>VBDI<Z>C',
        title: '<DE>crement <X>',
        hex: { Im: 'CA' }
    },
    {
        category: 'Calc',
        name: 'DEY',
        flags: '<N>VBDI<Z>C',
        title: '<DE>crement <Y>',
        hex: { Im: '88' }
    },
    {
        category: 'Calc',
        name: 'INC',
        flags: '<N>VBDI<Z>C',
        title: '<INC>rement memory',
        hex: { Z: 'E6', Zx: 'F6', Ab: 'EE', Ax: 'FE' }
    },
    {
        category: 'Calc',
        name: 'DEC',
        flags: '<N>VBDI<Z>C',
        title: '<DEC>rement memory',
        hex: { Z: 'C6', Zx: 'D6', Ab: 'CE', Ax: 'DE' }
    },
    {
        category: 'Calc',
        name: 'ADC',
        title: '<AD>D with <C>arry',
        mode: { Im: 2, Z: 3, Zx: 4, Ab: 4 },
        flags: '<NV>BDI<ZC>',
        hex: { Im: '69', Z: '65', Zx: '75', Ab: '6D', Ax: '7D', Ay: '79', Ix: '61', Iy: '71' }
    },
    {
        category: 'Calc',
        name: 'SBC',
        flags: '<NV>BDI<ZC>',
        title: '<S>u<B>tract with <C>arry',
        hex: { Im: 'E9', Z: 'E5', Zx: 'F5', Ab: 'ED', Ax: 'FD', Ay: 'F9', Ix: 'E1', Iy: 'F1' }
    },
    {
        category: 'Bits',
        name: 'ASL',
        flags: '<N>VBDI<ZC>',
        title: '<A>rithmetic <S>hift <L>eft',
        hex: { A: '0A', Z: '06', Zx: '16', Ab: '0E', Ax: '1E' }
    },
    {
        category: 'Bits',
        name: 'LSR',
        flags: '<N>VBDI<ZC>',
        title: '<L>ogical <S>hift <R>ight',
        hex: { A: '4A', Z: '46', Zx: '56', Ab: '4E', Ax: '5E' }
    },
    {
        category: 'Bits',
        name: 'ROL',
        flags: '<N>VBDI<ZC>',
        title: '<RO>tate <L>eft',
        hex: { A: '2A', Z: '26', Zx: '36', Ab: '2E', Ax: '3E' }
    },
    {
        category: 'Bits',
        name: 'ROR',
        flags: '<N>VBDI<ZC>',
        title: '<RO>tate <R>ight',
        hex: { A: '6A', Z: '66', Zx: '76', Ab: '6E', Ax: '7E' }
    },
    {
        category: 'Bits',
        name: 'AND',
        flags: '<N>VBDI<Z>C',
        title: 'bitwise <AND> with accumulator',
        hex: { Im: '29', Z: '25', Zx: '35', Ab: '2D', Ax: '3D', Ay: '39', Ix: '21', Iy: '31' }
    },
    {
        category: 'Bits',
        name: 'ORA',
        flags: '<N>VBDI<Z>C',
        title: 'bitwize <OR> with <A>ccumulator',
        hex: { Im: '09', Z: '05', Zx: '15', Ab: '0D', Ax: '1D', Ay: '19', Ix: '01', Iy: '11' }
    },
    {
        category: 'Bits',
        name: 'EOR',
        flags: '<N>VBDI<Z>C',
        title: 'bitwise <E>xclusive <OR>',
        hex: { Im: '49', Z: '45', Zx: '55', Ab: '4D', Ax: '5D', Ay: '59', Ix: '41', Iy: '51' }
    },
    {
        category: 'Bits',
        name: 'BIT',
        flags: '<NV>BDI<Z>C',
        title: 'test <BIT>s',
        hex: { Z: '24', Ab: '2C' }
    },
    {
        category: 'Bits',
        name: 'CMP',
        flags: '<N>VBDI<ZC>',
        title: '<C>o<MP>are accumulator',
        hex: { Im: 'C9', Z: 'C5', Zx: 'D5', Ab: 'CD', Ax: 'DD', Ay: 'D9', Ix: 'C1', Iy: 'D1' }
    },
    {
        category: 'Bits',
        name: 'CPX',
        flags: '<N>VBDI<ZC>',
        title: '<C>om<P>are <X> register',
        hex: { Im: 'E0', Z: 'E4', Ab: 'EC' }
    },
    {
        category: 'Bits',
        name: 'CPY',
        flags: '<N>VBDI<ZC>',
        title: '<C>om<P>are <Y> register',
        hex: { Im: 'C0', Z: 'C4', Ab: 'CC' }
    },
    {
        category: 'Bits',
        name: 'TRB',
        flags: 'NVBDI<Z>C',
        title: '<T>est and <R>eset <B>its',
        hex: { Z: '14', Ab: '1C' }
    },
    {
        category: 'Bits',
        name: 'TSB',
        flags: 'NVBDIZC',
        title: '<T>est and <S>et <B>its',
        hex: { Z: '04', Ab: '0C' }
    },

    {
        category: 'Bits',
        name: 'RMB',
        flags: 'NVBDIZC',
        title: '<R>eset <M>emory <B>it',
        hex: { Z: '07' } // RMB0, others: 17,27,37,47,57,67,77
    },

    {
        category: 'Bits',
        name: 'SMB',
        flags: 'NVBDIZC',
        title: '<S>et <M>emory <B>it',
        hex: { Z: '87' } // SMB0, others: 97,A7,B7,C7,D7,E7,F7
    },
    {
        category: 'Flow',
        name: 'JMP',
        flags: 'NVBDIZC',
        title: '<J>u<MP>',
        hex: { Ab: '4C', In: '6C' }
    },
    {
        category: 'Flow',
        name: 'JSR',
        flags: 'NVBDIZC',
        title: '<J>ump to <S>ub<R>outine',
        hex: { Ab: '20' }
    },
    {
        category: 'Flow',
        name: 'RTS',
        flags: 'NVBDIZC',
        title: '<R>e<T>urn from <S>ubroutine',
        hex: { Im: '60' }
    },
    {
        category: 'Flow',
        name: 'RTI',
        flags: '<NVBDIZC>',
        title: '<R>e<T>urn from <I>nterrupt',
        hex: { Im: '40' }
    },
    {
        category: 'Flow',
        name: 'BRA',
        flags: 'NVBDIZC',
        title: '<BR>anch <A>lways',
        hex: { Lb: '80' }
    },
    {
        category: 'Flow',
        name: 'BEQ',
        flags: 'NVBDIZC',
        title: '<B>ranch on <EQ>ual',
        hex: { Lb: 'F0' }
    },
    {
        category: 'Flow',
        name: 'BNE',
        flags: 'NVBDIZC',
        title: '<B>ranch on <N>ot <E>qual',
        hex: { Lb: 'D0' }
    },
    {
        category: 'Flow',
        name: 'BCC',
        flags: 'NVBDIZC',
        title: '<B>ranch on <C>arry <C>lear',
        hex: { Lb: '90' }
    },
    {
        category: 'Flow',
        name: 'BCS',
        flags: 'NVBDIZC',
        title: '<B>ranch on <C>arry <S>et',
        hex: { Lb: 'B0' }
    },
    {
        category: 'Flow',
        name: 'BVC',
        flags: 'NVBDIZC',
        title: '<B>ranch on o<V>erflow <C>lear',
        hex: { Lb: '50' }
    },
    {
        category: 'Flow',
        name: 'BVS',
        flags: 'NVBDIZC',
        title: '<B>ranch on o<V>erflow <S>et',
        hex: { Lb: '70' }
    },
    {
        category: 'Flow',
        name: 'BMI',
        flags: 'NVBDIZC',
        title: '<B>ranch on <MI>nus',
        hex: { Lb: '30' }
    },
    {
        category: 'Flow',
        name: 'BPL',
        flags: 'NVBDIZC',
        title: '<B>ranch on <PL>us',
        hex: { Lb: '10' }
    },
    {
        category: 'Flow',
        name: 'BBR<0-7>',
        flags: 'NVBDIZC',
        title: '<B>ranch on <B>it <R>eset',
        hex: { R: '0F' } // BBR0, others: 1F,2F,3F,4F,5F,6F,7F
    },
    {
        category: 'Flow',
        name: 'BBS<0-7>',
        flags: 'NVBDIZC',
        title: '<B>ranch on <B>it <S>et',
        hex: { R: '8F' } // BBS0, others: 9F,AF,BF,CF,DF,EF,FF
    },

    {
        category: 'State',
        name: 'CLC',
        flags: 'NVBDIZC',
        title: '<CL>ear <C>arry',
        hex: { Im: '18' }
    },
    {
        category: 'State',
        name: 'CLD',
        flags: 'NVBDIZC',
        title: '<CL>ear <D>ecimal',
        hex: { Im: 'D8' }
    },
    {
        category: 'State',
        name: 'CLI',
        flags: 'NVBDIZC',
        title: '<CL>ear <I>nterrupt',
        hex: { Im: '58' }
    },
    {
        category: 'State',
        name: 'CLV',
        flags: 'NVBDIZC',
        title: '<CL>ear o<V>erflow',
        hex: { Im: 'B8' }
    },
    {
        category: 'State',
        name: 'SEC',
        flags: 'NVBDIZC',
        title: '<SE>t <C>arry',
        hex: { Im: '38' }
    },

    {
        category: 'State',
        name: 'SED',
        flags: 'NVBDIZC',
        title: '<SE>t <D>ecimal',
        hex: { Im: 'F8' }
    },
    {
        category: 'State',
        name: 'SEI',
        flags: 'NVBDIZC',
        title: '<SE>t <I>nterrupt',
        hex: { Im: '78' }
    },
    {
        category: 'Transfer',
        name: 'TAX',
        flags: '<N>VBDI<Z>C',
        title: '<T>ransfer <A> to <X>',
        hex: { Im: 'AA' }
    },

    {
        category: 'Transfer',
        name: 'TAY',
        flags: '<N>VBDI<Z>C',
        title: '<T>ransfer <A> to <Y>',
        hex: { Im: 'A8' }
    },
    {
        category: 'Transfer',
        name: 'TXA',
        flags: '<N>VBDI<Z>C',
        title: '<T>ransfer <X> to <A>',
        hex: { Im: '8A' }
    },
    {
        category: 'Transfer',
        name: 'TYA',
        flags: '<N>VBDI<Z>C',
        title: '<T>ransfer <Y> to <A>',
        hex: { Im: '98' }
    },

    {
        category: 'Misc',
        name: 'BRK',
        flags: 'NV<B>DIZC',
        title: '<BR>ea<K>',
        hex: { Im: '00' }
    },

    {
        category: 'Misc',
        name: 'NOP',
        flags: 'NVBDIZC',
        title: '<N>o <OP>eration',
        hex: { Im: 'EA' }
    },

    {
        category: 'Misc',
        name: 'STP',
        flags: 'NVBDIZC',
        title: '<ST>o<P>',
        hex: { Im: 'DB' }
    },

    {
        category: 'Misc',
        name: 'WAI',
        flags: 'NVBDIZC',
        title: '<WA>it for <I>nterrupt',
        hex: { Im: 'CB' }
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
    LDY: { Im: 2, Z: 3, Zx: 4, Ab: 4, Ay: '4+', },
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
    STP: { Ip: 3, },
    WAI: { Ip: 3, },
}

export default cpu65C02;