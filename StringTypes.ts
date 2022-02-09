import { MemByte } from './VmTypes'

export type First<T extends string> = T extends `${infer U}${string}` ? U : ''
export type RemoveFirst<T extends string> = T extends `${string}${infer U}` ? U : ''
export type Reverse<U extends string> = U extends ''
  ? ''
  : U extends MemByte
  ? U
  : `${Reverse<RemoveFirst<U>>}${First<U>}`

export type Last<T extends string> = First<Reverse<T>>
export type RemoveLast<T extends string> = Reverse<RemoveFirst<Reverse<T>>>

type Null2 = '\0\0'
type Null4 = `${Null2}${Null2}`
type Null8 = `${Null4}${Null4}`
type Null16 = `${Null8}${Null8}`
type Null32 = `${Null16}${Null16}`
type Null64 = `${Null32}${Null32}`
type Null128 = `${Null64}${Null64}`

export type StripTrailingNullChars<T extends string> = T extends '' ? ''
  : T extends `${infer U}${Null128}` ? StripTrailingNullChars<U>
  : T extends `${infer U}${Null64}` ? StripTrailingNullChars<U>
  : T extends `${infer U}${Null32}` ? StripTrailingNullChars<U>
  : T extends `${infer U}${Null16}` ? StripTrailingNullChars<U>
  : T extends `${infer U}${Null8}` ? StripTrailingNullChars<U>
  : T extends `${infer U}${Null4}` ? StripTrailingNullChars<U>
  : T extends `${infer U}${Null2}` ? StripTrailingNullChars<U>
  : Last<T> extends '\0' ? StripTrailingNullChars<RemoveLast<T>> : T


const testFirst1: First<''> = ''
const testFirst2: First<'A'> = 'A'
const testFirst3: First<'ABC'> = 'A'
const testFirst4: First<'123'> = '1'

const testRemoveFirst1: RemoveFirst<''> = ''
const testRemoveFirst2: RemoveFirst<'A'> = ''
const testRemoveFirst3: RemoveFirst<'ABC'> = 'BC'
const testRemoveFirst4: RemoveFirst<'123'> = '23'

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

const testStripNullChars1: StripTrailingNullChars<''> = ''
const testStripNullChars2: StripTrailingNullChars<'A\0\0'> = 'A'
const testStripNullChars3: StripTrailingNullChars<'\0\0A'> = '\0\0A'
const testStripNullChars4: StripTrailingNullChars<'1\02\03\0\0'> = '1\02\03'
