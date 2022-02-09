import {
    BfProgram,
    ProgramSummary,
    RunToEnd
} from '../Interpreter'

type Ttest1 = ProgramSummary<RunToEnd<BfProgram<'+>++>+++', ''>>>
const result1: Ttest1['setMemory'] = '\x01\x02\x03'

type Ttest6 = ProgramSummary<RunToEnd<BfProgram<'>>>+++<++<+', ''>>>
const result6: Ttest6['setMemory'] = '\x00\x01\x02\x03'