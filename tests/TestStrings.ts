import {
    First,
    RemoveFirst,
    Reverse,
    Last,
    RemoveLast,
    StripTrailingNullChars,
    Null4,
    Null8,
    Null16,
    Null32,
    Null64,
    Null128,
    Null256,
    Null512,
    Null1024,
    Null2048,
    Null4096,
    Null8192
} from '../StringTypes'

const testFirst1: First<''> = ''
const testFirst2: First<'A'> = 'A'
const testFirst3: First<'ABC'> = 'A'
const testFirst4: First<'123'> = '1'

const testRemoveFirst1: RemoveFirst<''> = ''
const testRemoveFirst2: RemoveFirst<'A'> = ''
const testRemoveFirst3: RemoveFirst<'ABC'> = 'BC'
const testRemoveFirst4: RemoveFirst<'123'> = '23'
const testRemoveFirst5: RemoveFirst<'abcdefghijklmnopqrstuvwxyz123456789abcdefghijklmnopqrstuvwxyz123456789'> = 'bcdefghijklmnopqrstuvwxyz123456789abcdefghijklmnopqrstuvwxyz123456789'

const testReverse1: Reverse<''> = ''
const testReverse2: Reverse<'A'> = 'A'
const testReverse3: Reverse<'ABC'> = 'CBA'
const testReverse4: Reverse<'123'> = '321'

const testLast1: Last<''> = ''
const testLast2: Last<'A'> = 'A'
const testLast3: Last<'ABC'> = 'C'
const testLast4: Last<'123'> = '3'

const testRemoveLast1: RemoveLast<''> = ''
const testRemoveLast2: RemoveLast<'A'> = ''
const testRemoveLast3: RemoveLast<'ABC'> = 'AB'
const testRemoveLast4: RemoveLast<'123'> = '12'

let testRemoveNull4: RemoveLast<Null4>
let testRemoveNull8: RemoveLast<Null8>
let testRemoveNull16: RemoveLast<Null16>
let testRemoveNull32: RemoveLast<Null32>
let testRemoveNull64: RemoveLast<Null64>
let testRemoveNull128: RemoveLast<Null128>
let testRemoveNull256: RemoveLast<Null256>
let testRemoveNull512: RemoveLast<Null512>
let testRemoveNull1024: RemoveLast<Null1024>
// failing with patch `instantiationDepth === (100 * 64) || instantiationCount >= (5000000 * 64)`
//let testRemoveNull2048: RemoveLast<Null2048>
//let testRemoveNull4096: RemoveLast<Null4096>
//let testRemoveNull8192: RemoveLast<Null8192>

const testStripNullChars1: StripTrailingNullChars<''> = ''
const testStripNullChars2: StripTrailingNullChars<'A\0\0'> = 'A'
const testStripNullChars3: StripTrailingNullChars<'\0\0A'> = '\0\0A'
const testStripNullChars4: StripTrailingNullChars<'1\02\03\0\0'> = '1\02\03'