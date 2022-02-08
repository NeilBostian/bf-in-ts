import {
    Decrement,
    EmptyMem,
    Increment,
    Instr,
    MemByte,
} from './VmTypes'

import {
    First,
    Last,
    RemoveFirst,
    RemoveLast,
    StripNullChars
} from './StringTypes'

interface Program {
    halt: boolean

    instrLeft: string
    instr: Instr | ''
    instrRight: string

    memLeft: string
    mem: MemByte | ''
    memRight: string

    stdin: string
    stdout: string
}

interface CompletedProgram extends Program {
    halt: true
}

export type BfProgram<
    TBfCode extends string,
    TStdin extends string
> = {
    halt: false
    instrLeft: ''
    instr: First<TBfCode>
    instrRight: RemoveFirst<TBfCode>
    memLeft: ''
    mem: '\u0000'
    memRight: EmptyMem
    stdin: TStdin
    stdout: ''
}

export type ProgramSummary<T extends CompletedProgram> = {
    program: `${T['instrLeft']}${T['instr']}${T['instrRight']}`
    memory: `${T['memLeft']}${T['mem']}${T['memRight']}`
    setMemory: StripNullChars<`${T['memLeft']}${T['mem']}${T['memRight']}`>
    stdout: T['stdout']
}

export type Next<T extends Program> =
    T['halt'] extends true ? T
    : T['instr'] extends '>' ? {
        halt: T['instrRight'] extends '' ? true : false

        instrLeft: `${T['instrLeft']}${T['instr']}`
        instr: First<T['instrRight']>
        instrRight: RemoveFirst<T['instrRight']>

        memLeft: `${T['memLeft']}${T['mem']}`
        mem: First<T['memRight']>
        memRight: RemoveFirst<T['memRight']>

        stdin: T['stdin']
        stdout: T['stdout']
    }
    : T['instr'] extends '<' ? {
        halt: T['instrRight'] extends '' ? true : false

        instrLeft: `${T['instrLeft']}${T['instr']}`
        instr: First<T['instrRight']>
        instrRight: RemoveFirst<T['instrRight']>

        memLeft: RemoveLast<T['memLeft']>
        mem: Last<T['memLeft']>
        memRight: `${T['mem']}${T['memRight']}`

        stdin: T['stdin']
        stdout: T['stdout']
    }
    : T['instr'] extends '+' ? {
        halt: T['instrRight'] extends '' ? true : false

        instrLeft: `${T['instrLeft']}${T['instr']}`
        instr: First<T['instrRight']>
        instrRight: RemoveFirst<T['instrRight']>

        memLeft: T['memLeft']
        mem: T['mem'] extends MemByte ? Increment<T['mem']> : ''
        memRight: T['memRight']

        stdin: T['stdin']
        stdout: T['stdout']
    }
    : T['instr'] extends '-' ? {
        halt: T['instrRight'] extends '' ? true : false

        instrLeft: `${T['instrLeft']}${T['instr']}`
        instr: First<T['instrRight']>
        instrRight: RemoveFirst<T['instrRight']>

        memLeft: T['memLeft']
        mem: T['mem'] extends MemByte ? Decrement<T['mem']> : ''
        memRight: T['memRight']

        stdin: T['stdin']
        stdout: T['stdout']
    }
    : null

export type RunToEnd<T extends Program> = T['halt'] extends true
    ? T : RunToEnd<Next<T>>
