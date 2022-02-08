import {
    BfProgram,
    ProgramSummary,
    RunToEnd
} from './Interpreter'

type Ttest1 = RunToEnd<BfProgram<'+>++>+++', ''>>
const test1: Ttest1['mem'] = '\u0003'

type Tres1 = ProgramSummary<Ttest1>
const result1: Tres1['setMemory'] = '\u0001\u0002\u0003'
