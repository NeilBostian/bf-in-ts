import {
    BfProgram,
    ProgramSummary,
    RunToEnd
} from '../Interpreter'

type Ttest1 = ProgramSummary<RunToEnd<BfProgram<',>,>,.<<.>.', 'abc'>>>
const result1A: Ttest1['stdout'] = 'cab' // order bytes are printed to stdout is 'cab'
const result1B: Ttest1['setMemory'] = 'abc' // order bytes are read into memory is 'abc'

type Ttest2 = ProgramSummary<RunToEnd<BfProgram<'>+<[>+<[]],.,.,.', '123'>>>
const result2A: Ttest2['stdout'] = '123'
const result2B: Ttest2['setMemory'] = '3\x01'

type Ttest3 = ProgramSummary<RunToEnd<BfProgram<'++++[>+<-],.,.,.', '123'>>>
const result4A: Ttest3['stdout'] = '123'
const result4B: Ttest3['setMemory'] = '3\x04'