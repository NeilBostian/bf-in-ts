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
const result3A: Ttest3['stdout'] = '123'
const result3B: Ttest3['setMemory'] = '3\x04'

// Reverse the string
type Ttest4 = ProgramSummary<RunToEnd<BfProgram<'>,[>,]<[.<]', '123'>>>
const result4A: Ttest4['stdout'] = '321'

type Ttest5 = ProgramSummary<RunToEnd<BfProgram<'>,[>,]<[.<]', '0123456789abcdefghij0123456789abcdefghij0123456789abcdefghij0123456789abcdefghij0123456789abcdefghij'>>>
const result5A: Ttest5['stdout'] = 'jihgfedcba9876543210jihgfedcba9876543210jihgfedcba9876543210jihgfedcba9876543210jihgfedcba9876543210'
