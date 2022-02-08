import {
    BfProgram,
    RunToEnd
} from './Interpreter'

type Ttest1 = RunToEnd<BfProgram<'+>++>+++'>>
const test1: Ttest1['mem'] = '\u0003'
