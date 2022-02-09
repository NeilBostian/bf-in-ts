import {
    BfProgram,
    ProgramSummary,
    RunToEnd
} from '../Interpreter'

type Ttest2 = ProgramSummary<RunToEnd<BfProgram<',>,>,.<<.>.', 'abc'>>>
const result2A: Ttest2['stdout'] = 'cab' // order bytes are printed to stdout is 'cab'
const result2B: Ttest2['setMemory'] = 'abc' // order bytes are read into memory is 'abc'

type Ttest3 = ProgramSummary<RunToEnd<BfProgram<'>+<[>+<[]],.,.,.', '123'>>>
const result3A: Ttest3['stdout'] = '123'
const result3B: Ttest3['setMemory'] = '3\x01'

type Ttest4 = ProgramSummary<RunToEnd<BfProgram<'++++[>,<-],.,.,.', '123'>>>
const result4A: Ttest4['stdout'] = '123'
const result4B: Ttest4['setMemory'] = '3\x01'