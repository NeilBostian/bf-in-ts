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
    StripTrailingNullChars
} from './StringTypes'

interface Program {
    halt: boolean
    mode: 'regular' | 'stepOverLoop' | 'jumpToLoop'
    stack: string

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
    stack: ''
    instrLeft: ''
    instr: First<TBfCode>
    instrRight: RemoveFirst<TBfCode>
    memLeft: ''
    mem: '\0'
    memRight: EmptyMem
    stdin: TStdin
    stdout: ''
}

export type ProgramSummary<T extends CompletedProgram> = {
    program: `${T['instrLeft']}${T['instr']}${T['instrRight']}`
    memory: `${T['memLeft']}${T['mem']}${T['memRight']}`
    setMemory: StripTrailingNullChars<`${T['memLeft']}${T['mem']}${T['memRight']}`>
    stdout: T['stdout']
}

type StepShiftRight<T extends Program> = {
    halt: T['instrRight'] extends '' ? true : false
    mode: 'regular'
    stack: ''

    instrLeft: `${T['instrLeft']}${T['instr']}`
    instr: First<T['instrRight']>
    instrRight: RemoveFirst<T['instrRight']>

    memLeft: `${T['memLeft']}${T['mem']}`
    mem: First<T['memRight']>
    memRight: RemoveFirst<T['memRight']>

    stdin: T['stdin']
    stdout: T['stdout']
}

type StepShiftLeft<T extends Program> = {
    halt: T['instrRight'] extends '' ? true : false
    mode: 'regular'
    stack: ''

    instrLeft: `${T['instrLeft']}${T['instr']}`
    instr: First<T['instrRight']>
    instrRight: RemoveFirst<T['instrRight']>

    memLeft: RemoveLast<T['memLeft']>
    mem: Last<T['memLeft']>
    memRight: `${T['mem']}${T['memRight']}`

    stdin: T['stdin']
    stdout: T['stdout']
}

type StepIncrement<T extends Program> = {
    halt: T['instrRight'] extends '' ? true : false
    mode: 'regular'
    stack: ''

    instrLeft: `${T['instrLeft']}${T['instr']}`
    instr: First<T['instrRight']>
    instrRight: RemoveFirst<T['instrRight']>

    memLeft: T['memLeft']
    mem: T['mem'] extends MemByte ? Increment<T['mem']> : ''
    memRight: T['memRight']

    stdin: T['stdin']
    stdout: T['stdout']
}

type StepDecrement<T extends Program> = {
    halt: T['instrRight'] extends '' ? true : false
    mode: 'regular'
    stack: ''

    instrLeft: `${T['instrLeft']}${T['instr']}`
    instr: First<T['instrRight']>
    instrRight: RemoveFirst<T['instrRight']>

    memLeft: T['memLeft']
    mem: T['mem'] extends MemByte ? Decrement<T['mem']> : ''
    memRight: T['memRight']

    stdin: T['stdin']
    stdout: T['stdout']
}

type StepStdin<T extends Program> = {
    halt: T['instrRight'] extends '' ? true : false
    mode: 'regular'
    stack: ''

    instrLeft: `${T['instrLeft']}${T['instr']}`
    instr: First<T['instrRight']>
    instrRight: RemoveFirst<T['instrRight']>

    memLeft: T['memLeft']
    mem: First<T['stdin']> extends MemByte ? First<T['stdin']> : '\0'
    memRight: T['memRight']

    stdin: RemoveFirst<T['stdin']>
    stdout: T['stdout']
}

type StepStdout<T extends Program> = {
    halt: T['instrRight'] extends '' ? true : false
    mode: 'regular'
    stack: ''

    instrLeft: `${T['instrLeft']}${T['instr']}`
    instr: First<T['instrRight']>
    instrRight: RemoveFirst<T['instrRight']>

    memLeft: T['memLeft']
    mem: T['mem']
    memRight: T['memRight']

    stdin: T['stdin']
    stdout: `${T['stdout']}${T['mem']}`
}

type StepOverLoop<T extends Program> = {
    halt: T['instrRight'] extends '' ? true : false
    mode: First<T['instrRight']> extends ']' ? T['stack'] extends '' ? 'regular' : 'stepOverLoop' : 'stepOverLoop'
    stack: First<T['instrRight']> extends '[' ? `${T['stack']}+`
        : First<T['instrRight']> extends ']' ? RemoveLast<T['stack']> : T['stack']

    instrLeft: `${T['instrLeft']}${T['instr']}`
    instr: First<T['instrRight']>
    instrRight: RemoveFirst<T['instrRight']>

    memLeft: T['memLeft']
    mem: T['mem']
    memRight: T['memRight']

    stdin: T['stdin']
    stdout: T['stdout']
}

type StepJumpToLoopStart<T extends Program> = {
    halt: T['instrLeft'] extends '' ? true : false
    mode: Last<RemoveLast<T['instrLeft']>> extends '[' ? T['stack'] extends '' ? 'regular' : 'jumpToLoop' : 'jumpToLoop'
    stack: Last<T['instrLeft']> extends ']' ? `${T['stack']}+`
        : Last<T['instrLeft']> extends '[' ? RemoveLast<T['stack']> : T['stack']

    instrLeft: RemoveLast<T['instrLeft']>
    instr: Last<T['instrLeft']>
    instrRight: `${T['instr']}${T['instrRight']}`

    memLeft: T['memLeft']
    mem: T['mem']
    memRight: T['memRight']

    stdin: T['stdin']
    stdout: T['stdout']
}

type StepNop<T extends Program> = {
    halt: T['instrRight'] extends '' ? true : false
    mode: 'regular'
    stack: ''

    instrLeft: `${T['instrLeft']}${T['instr']}`
    instr: First<T['instrRight']>
    instrRight: RemoveFirst<T['instrRight']>

    memLeft: T['memLeft']
    mem: T['mem']
    memRight: T['memRight']

    stdin: T['stdin']
    stdout: T['stdout']
}

type StepRegular<T extends Program> =
    T['instr'] extends '>' ? StepShiftRight<T>
    : T['instr'] extends '<' ? StepShiftLeft<T>
    : T['instr'] extends '+' ? StepIncrement<T>
    : T['instr'] extends '-' ? StepDecrement<T>
    : T['instr'] extends ',' ? StepStdin<T>
    : T['instr'] extends '.' ? StepStdout<T>
    : T['instr'] extends '[' ? T['mem'] extends '\0' ? StepOverLoop<T> : StepNop<T>
    : T['instr'] extends ']' ? T['mem'] extends '\0' ? StepNop<T> : StepJumpToLoopStart<T>
    : null

export type Step<T extends Program> =
    T['halt'] extends true ? T
    : T['mode'] extends 'stepOverLoop' ? StepOverLoop<T>
    : T['mode'] extends 'jumpToLoop' ? StepJumpToLoopStart<T>
    : StepRegular<T>

export type RunToEnd<T extends Program> = T['halt'] extends true
    ? T : RunToEnd<Step<T>>
