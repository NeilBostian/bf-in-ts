import {
    BfProgram,
    ProgramSummary,
    RunToEnd
} from './Interpreter'

// Test basic program, should set memory to [1, 2, 3]
type Ttest1 = ProgramSummary<RunToEnd<BfProgram<'+>++>+++', ''>>>
const result1: Ttest1['setMemory'] = '\u0001\u0002\u0003'

// Test inputting a couple chars to stdin and then writing them to stdout
type Ttest2 = ProgramSummary<RunToEnd<BfProgram<',>,>,.<<.>.', 'abc'>>>
const result2A: Ttest2['stdout'] = 'cab' // order bytes are printed to stdout is 'cab'
const result2B: Ttest2['setMemory'] = 'abc' // order bytes are read into memory is 'abc'

type Ttest3 = ProgramSummary<RunToEnd<BfProgram<'>+<[>+<[]],.,.,.', '123'>>>
const result3A: Ttest3['stdout'] = '123'
const result3B: Ttest3['setMemory'] = '3\u0001'
