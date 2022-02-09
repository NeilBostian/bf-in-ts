import {
    BfProgram,
    ProgramSummary,
    RunToEnd
} from '../Interpreter'

type Ttest1 = ProgramSummary<RunToEnd<BfProgram<'+>++>+++', ''>>>
const result1: Ttest1['setMemory'] = '\x01\x02\x03'

type Ttest2 = ProgramSummary<RunToEnd<BfProgram<'>>>+++<++<+', ''>>>
const result2: Ttest2['setMemory'] = '\x00\x01\x02\x03'