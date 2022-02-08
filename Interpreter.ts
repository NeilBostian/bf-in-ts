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
    mode: 'regular' | 'loopForward' | 'loopBackward'

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
    mode: 'regular'
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

type StepRegular<T extends Program> =
    T['instr'] extends '>' ? {
        halt: T['instrRight'] extends '' ? true : false
        mode: 'regular'

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
        mode: 'regular'

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
        mode: 'regular'

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
        mode: 'regular'

        instrLeft: `${T['instrLeft']}${T['instr']}`
        instr: First<T['instrRight']>
        instrRight: RemoveFirst<T['instrRight']>

        memLeft: T['memLeft']
        mem: T['mem'] extends MemByte ? Decrement<T['mem']> : ''
        memRight: T['memRight']

        stdin: T['stdin']
        stdout: T['stdout']
    }
    : T['instr'] extends ',' ? {
        halt: T['instrRight'] extends '' ? true : false
        mode: 'regular'

        instrLeft: `${T['instrLeft']}${T['instr']}`
        instr: First<T['instrRight']>
        instrRight: RemoveFirst<T['instrRight']>

        memLeft: T['memLeft']
        mem: First<T['stdin']>
        memRight: T['memRight']

        stdin: RemoveFirst<T['stdin']>
        stdout: T['stdout']
    }
    : T['instr'] extends '.' ? {
        halt: T['instrRight'] extends '' ? true : false
        mode: 'regular'

        instrLeft: `${T['instrLeft']}${T['instr']}`
        instr: First<T['instrRight']>
        instrRight: RemoveFirst<T['instrRight']>

        memLeft: T['memLeft']
        mem: T['mem']
        memRight: T['memRight']

        stdin: T['stdin']
        stdout: `${T['stdout']}${T['mem']}`
    }
    : null

type StepLoopForward<T extends Program> = T
type StepLoopBackward<T extends Program> = T

type Step<T extends Program> =
    T['mode'] extends 'loopForward' ? StepLoopForward<T>
    : T['mode'] extends 'loopForward' ? StepLoopBackward<T>
    : StepRegular<T>

export type RunToEnd<T extends Program> = T['halt'] extends true
    ? T : RunToEnd<Step<T>>
