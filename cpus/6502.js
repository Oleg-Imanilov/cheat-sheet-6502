const cpu6502 = [
    {
        col: 0,
        name: 'ADC',
        title: '<AD>D with <C>arry',
        flags: '<NV>BDI<ZC>',
        hex: { Im: '69', Z: '65', Zx: '75', Ab: '6D', Ax: '7D', Ay: '79', Ix: '61', Iy: '71' }
    },
    {
        col: 0,
        name: 'AND',
        flags: '<N>VBDI<Z>C',
        title: 'bitwise <AND> with accumulator',
        hex: { Im: '29', Z: '25', Zx: '35', Ab: '2D', Ax: '3D', Ay: '39', Ix: '21', Iy: '31' }
    },
    {
        col: 0,
        name: 'ASL',
        flags: '<N>VBDI<ZC>',
        title: '<A>rithmetic <S>hift <L>eft',
        hex: { A: '0A', Z: '06', Zx: '16', Ab: '0E', Ax: '1E' }
    },

    {
        col: 0,
        name: 'BIT',
        flags: '<NV>BDI<Z>C',
        title: 'test <BIT>s',
        hex: { Z: '24', Ab: '2C' }
    },
    {
        col: 0,
        name: 'BPL',
        flags: 'NVBDIZC',
        title: '<B>ranch on <PL>us',
        hex: { Lb: '10' }
    },
    {
        col: 0,
        name: 'BMI',
        flags: 'NVBDIZC',
        title: '<B>ranch on <MI>nus',
        hex: { Lb: '30' }
    },
    {
        col: 0,
        name: 'BVC',
        flags: 'NVBDIZC',
        title: '<B>ranch on o<V>erflow <C>lear',
        hex: { Lb: '50' }
    },
    {
        col: 0,
        name: 'BVS',
        flags: 'NVBDIZC',
        title: '<B>ranch on o<V>erflow <S>et',
        hex: { Lb: '70' }
    },
    {
        col: 1,
        name: 'BCC',
        flags: 'NVBDIZC',
        title: '<B>ranch on <C>arry <C>lear',
        hex: { Lb: '90' }
    },
    {
        col: 1,
        name: 'BCS',
        flags: 'NVBDIZC',
        title: '<B>ranch on <C>arry <S>et',
        hex: { Lb: 'B0' }
    },
    {
        col: 1,
        name: 'BNE',
        flags: 'NVBDIZC',
        title: '<B>ranch on <N>ot <E>qual',
        hex: { Lb: 'D0' }
    },
    {
        col: 1,
        name: 'BEQ',
        flags: 'NVBDIZC',
        title: '<B>ranch on <EQ>ual',
        hex: { Lb: 'F0' }
    },
    {
        col: 1,
        name: 'BRK',
        flags: 'NV<B>DIZC',
        title: '<BR>ea<K>',
        hex: { Im: '00' }
    },
    {
        col: 1,
        name: 'CMP',
        flags: '<N>VBDI<ZC>',
        title: '<C>o<MP>are accumulator',
        hex: { Im: 'C9', Z: 'C5', Zx: 'D5', Ab: 'CD', Ax: 'DD', Ay: 'D9', Ix: 'C1', Iy: 'D1' }
    },
    {
        col: 1,
        name: 'CPX',
        flags: '<N>VBDI<ZC>',
        title: '<C>om<P>are <X> register',
        hex: { Im: 'E0', Z: 'E4', Ab: 'EC' }
    },
    {
        col: 1,
        name: 'CPY',
        flags: '<N>VBDI<ZC>',
        title: '<C>om<P>are <Y> register',
        hex: { Im: 'C0', Z: 'C4', Ab: 'CC' }
    },
    {
        col: 1,
        name: 'DEC',
        flags: '<N>VBDI<Z>C',
        title: '<DEC>rement memory',
        hex: { Z: 'C6', Zx: 'D6', Ab: 'CE', Ax: 'DE' }
    },
    {
        col: 1,
        name: 'EOR',
        flags: '<N>VBDI<Z>C',
        title: 'bitwise <E>xclusive <OR>',
        hex: { Im: '49', Z: '45', Zx: '55', Ab: '4D', Ax: '5D', Ay: '59', Ix: '41', Iy: '51' }
    },
    {
        col: 1,
        name: 'CLC',
        flags: 'NVBDIZC',
        title: '<CL>ear <C>arry',
        hex: { Im: '18' }
    },
    {
        col: 1,
        name: 'SEC',
        flags: 'NVBDIZC',
        title: '<SE>t <C>arry',
        hex: { Im: '38' }
    },
    {
        col: 2,
        name: 'CLI',
        flags: 'NVBDIZC',
        title: '<CL>ear <I>nterrupt',
        hex: { Im: '58' }
    },
    {
        col: 2,
        name: 'SEI',
        flags: 'NVBDIZC',
        title: '<SE>t <I>nterrupt',
        hex: { Im: '78' }
    },
    {
        col: 2,
        name: 'CLV',
        flags: 'NVBDIZC',
        title: '<CL>ear o<V>erflow',
        hex: { Im: 'B8' }
    },
    {
        col: 2,
        name: 'CLD',
        flags: 'NVBDIZC',
        title: '<CL>ear <D>ecimal',
        hex: { Im: 'D8' }
    },
    {
        col: 2,
        name: 'SED',
        flags: 'NVBDIZC',
        title: '<SE>t <D>ecimal',
        hex: { Im: 'F8' }
    },
    {
        col: 4,
        name: 'INC',
        flags: '<N>VBDI<Z>C',
        title: '<INC>rement memory',
        hex: { Z: 'E6', Zx: 'F6', Ab: 'EE', Ax: 'FE' }
    },
    {
        col: 2,
        name: 'JMP',
        flags: 'NVBDIZC',
        title: '<J>u<MP>',
        hex: { Ab: '4C', In: '6C' }
    },
    {
        col: 2,
        name: 'JSR',
        flags: 'NVBDIZC',
        title: '<J>ump to <S>ub<R>outine',
        hex: { Ab: '20' }
    },
    {
        col: 2,
        name: 'LDA',
        flags: '<N>VBDI<Z>C',
        title: '<L>oa<D> <A>ccumulator',
        hex: { Im: 'A9', Z: 'A5', Zx: 'B5', Ab: 'AD', Ax: 'BD', Ay: 'B9', Ix: 'A1', Iy: 'B1' }
    },
    {
        col: 2,
        name: 'LDX',
        flags: '<N>VBDI<Z>C',
        title: '<L>oa<D> <X> register',
        hex: { Im: 'A2', Z: 'A6', Zy: 'B6', Ab: 'AE', Ay: 'BE' }
    },
    {
        col: 2,
        name: 'LDY',
        flags: '<N>VBDI<Z>C',
        title: '<L>oa<D> <Y> register',
        hex: { Im: 'A0', Z: 'A4', Zx: 'B4', Ab: 'AC', Ax: 'BC' }
    },
    {
        col: 2,
        name: 'LSR',
        flags: '<N>VBDI<ZC>',
        title: '<L>ogical <S>hift <R>ight',
        hex: { A: '4A', Z: '46', Zx: '56', Ab: '4E', Ax: '5E' }
    },
    {
        col: 2,
        name: 'NOP',
        flags: 'NVBDIZC',
        title: '<N>o <OP>eration',
        hex: { Im: 'EA' }
    },
    {
        col: 3,
        name: 'ORA',
        flags: '<N>VBDI<Z>C',
        title: 'bitwize <OR> with <A>ccumulator',
        hex: { Im: '09', Z: '05', Zx: '15', Ab: '0D', Ax: '1D', Ay: '19', Ix: '01', Iy: '11' }
    },
    {
        col: 3,
        name: 'TAX',
        flags: '<N>VBDI<Z>C',
        title: '<T>ransfer <A> to <X>',
        hex: { Im: 'AA' }
    },
    {
        col: 3,
        name: 'TXA',
        flags: '<N>VBDI<Z>C',
        title: '<T>ransfer <X> to <A>',
        hex: { Im: '8A' }
    },
    {
        col: 3,
        name: 'DEX',
        flags: '<N>VBDI<Z>C',
        title: '<DE>crement <X>',
        hex: { Im: 'CA' }
    },
    {
        col: 3,
        name: 'INX',
        flags: '<N>VBDI<Z>C',
        title: '<IN>crement <X>',
        hex: { Im: 'E8' }
    },
    {
        col: 4,
        name: 'TAY',
        flags: '<N>VBDI<Z>C',
        title: '<T>ransfer <A> to <Y>',
        hex: { Im: 'A8' }
    },
    {
        col: 4,
        name: 'TYA',
        flags: '<N>VBDI<Z>C',
        title: '<T>ransfer <Y> to <A>',
        hex: { Im: '98' }
    },
    {
        col: 4,
        name: 'DEY',
        flags: '<N>VBDI<Z>C',
        title: '<DE>crement <Y>',
        hex: { Im: '88' }
    },
    {
        col: 4,
        name: 'INY',
        flags: '<N>VBDI<Z>C',
        title: '<IN>crement <Y>',
        hex: { Im: 'C8' }
    },
    {
        col: 3,
        name: 'ROL',
        flags: '<N>VBDI<ZC>',
        title: '<RO>tate <L>eft',
        hex: { A: '2A', Z: '26', Zx: '36', Ab: '2E', Ax: '3E' }
    },
    {
        col: 3,
        name: 'ROR',
        flags: '<N>VBDI<ZC>',
        title: '<RO>tate <R>ight',
        hex: { A: '6A', Z: '66', Zx: '76', Ab: '6E', Ax: '7E' }
    },
    {
        col: 3,
        name: 'RTI',
        flags: '<NVBDIZC>',
        title: '<R>e<T>urn from <I>nterrupt',
        hex: { Im: '40' }
    },
    {
        col: 3,
        name: 'RTS',
        flags: 'NVBDIZC',
        title: '<R>e<T>urn from <S>ubroutine',
        hex: { Im: '60' }
    },
    {
        col: 3,
        name: 'SBC',
        flags: '<NV>BDI<ZC>',
        title: '<S>u<B>tract with <C>arry',
        hex: { Im: 'E9', Z: 'E5', Zx: 'F5', Ab: 'ED', Ax: 'FD', Ay: 'F9', Ix: 'E1', Iy: 'F1' }
    },
    {
        col: 3,
        name: 'STA',
        flags: 'NVBDIZC',
        title: '<ST>ore <A>ccumulator',
        hex: { Z: '85', Zx: '95', Ab: '8D', Ax: '9D', Ay: '99', Ix: '81', Iy: '91' }
    },
    {
        col: 3,
        name: 'TXS',
        flags: 'NVBDIZC',
        title: '<T>ransfer <X> to <S>tack',
        hex: { Im: '9A' }
    },
    {
        col: 4,
        name: 'TSX',
        flags: 'NVBDIZC',
        title: '<T>ransfer <S>tack to <X>',
        hex: { Im: 'BA' }
    },
    {
        col: 4,
        name: 'PHA',
        flags: 'NVBDIZC',
        title: '<P>us<H> <A>ccumulator',
        hex: { Ip: '48' }
    },
    {
        col: 4,
        name: 'PLA',
        flags: 'NVBDIZC',
        title: '<P>u<L>l <A>ccumulator',
        hex: { Im: '68' }
    },
    {
        col: 4,
        name: 'PHP',
        flags: 'NVBDIZC',
        title: '<P>us<H> <P>rocessor status',
        hex: { Im: '08' }
    },
    {
        col: 4,
        name: 'PLP',
        flags: 'NVBDIZC',
        title: '<P>u<L>l <P>rocessor status',
        hex: { Im: '28' }
    },
    {
        col: 4,
        name: 'STX',
        flags: 'NVBDIZC',
        title: '<ST>ore <X> register',
        hex: { Z: '86', Zy: '96', Ab: '8E' }
    },
    {
        col: 4,
        name: 'STY',
        flags: 'NVBDIZC',
        title: '<ST>ore <Y> register',
        hex: { Z: '84', Zx: '94', Ab: '8C' }
    }
];

// Timing information for 6502 CPU (cycles per instruction)
// Im = Immediate, Z = Zero Page, Zx = Zero Page,X, Zy = Zero Page,Y
// Ab = Absolute, Ax = Absolute,X, Ay = Absolute,Y
// Ix = (Indirect,X), Iy = (Indirect),Y, In = Indirect
// Lb = Label (relative branch), A = Accumulator
// + indicates additional cycle if page boundary is crossed
export const timing = {
    ADC: { Im: 2, Z: 3, Zx: 4, Ab: 4, Ax: '4+', Ay: '4+', Ix: 6, Iy: '5+' },
    AND: { Im: 2, Z: 3, Zx: 4, Ab: 4, Ax: '4+', Ay: '4+', Ix: 6, Iy: '5+' },
    ASL: { A: 2, Z: 5, Zx: 6, Ab: 6, Ax: 7 },
    BIT: { Z: 3, Ab: 4 },
    BPL: { Lb: '2+' },
    BMI: { Lb: '2+' },
    BVC: { Lb: '2+' },
    BVS: { Lb: '2+' },
    BCC: { Lb: '2+' },
    BCS: { Lb: '2+' },
    BNE: { Lb: '2+' },
    BEQ: { Lb: '2+' },
    BRK: { Im: 7 },
    CMP: { Im: 2, Z: 3, Zx: 4, Ab: 4, Ax: '4+', Ay: '4+', Ix: 6, Iy: '5+' },
    CPX: { Im: 2, Z: 3, Ab: 4 },
    CPY: { Im: 2, Z: 3, Ab: 4 },
    DEC: { Z: 5, Zx: 6, Ab: 6, Ax: 7 },
    EOR: { Im: 2, Z: 3, Zx: 4, Ab: 4, Ax: '4+', Ay: '4+', Ix: 6, Iy: '5+' },
    CLC: { Im: 2 },
    SEC: { Im: 2 },
    CLI: { Im: 2 },
    SEI: { Im: 2 },
    CLV: { Im: 2 },
    CLD: { Im: 2 },
    SED: { Im: 2 },
    INC: { Z: 5, Zx: 6, Ab: 6, Ax: 7 },
    JMP: { Ab: 3, In: 5 },
    JSR: { Ab: 6 },
    LDA: { Im: 2, Z: 3, Zx: 4, Ab: 4, Ax: '4+', Ay: '4+', Ix: 6, Iy: '5+' },
    LDX: { Im: 2, Z: 3, Zy: 4, Ab: 4, Ay: '4+' },
    LDY: { Im: 2, Z: 3, Zx: 4, Ab: 4, Ax: '4+' },
    LSR: { A: 2, Z: 5, Zx: 6, Ab: 6, Ax: 7 },
    NOP: { Im: 2 },
    ORA: { Im: 2, Z: 3, Zx: 4, Ab: 4, Ax: '4+', Ay: '4+', Ix: 6, Iy: '5+' },
    TAX: { Im: 2 },
    TXA: { Im: 2 },
    DEX: { Im: 2 },
    INX: { Im: 2 },
    TAY: { Im: 2 },
    TYA: { Im: 2 },
    DEY: { Im: 2 },
    INY: { Im: 2 },
    ROL: { A: 2, Z: 5, Zx: 6, Ab: 6, Ax: 7 },
    ROR: { A: 2, Z: 5, Zx: 6, Ab: 6, Ax: 7 },
    RTI: { Im: 6 },
    RTS: { Im: 6 },
    SBC: { Im: 2, Z: 3, Zx: 4, Ab: 4, Ax: '4+', Ay: '4+', Ix: 6, Iy: '5+' },
    STA: { Z: 3, Zx: 4, Ab: 4, Ax: 5, Ay: 5, Ix: 6, Iy: 6 },
    TXS: { Im: 2 },
    TSX: { Im: 2 },
    PHA: { Im: 3 },
    PLA: { Im: 4 },
    PHP: { Im: 3 },
    PLP: { Im: 4 },
    STX: { Z: 3, Zy: 4, Ab: 4 },
    STY: { Z: 3, Zx: 4, Ab: 4 }
};

export default cpu6502;