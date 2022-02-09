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

export type Null2 = '\0\0'
export type Null4 = `${Null2}${Null2}`
export type Null8 = `${Null4}${Null4}`
export type Null16 = `${Null8}${Null8}`
export type Null32 = `${Null16}${Null16}`
export type Null64 = `${Null32}${Null32}`
export type Null128 = `${Null64}${Null64}`
export type Null256 = `${Null128}${Null128}`
export type Null512 = `${Null256}${Null256}`
export type Null1024 = `${Null512}${Null512}`
export type Null2048 = `${Null1024}${Null1024}`
export type Null4096 = `${Null2048}${Null2048}`
export type Null8192 = `${Null4096}${Null4096}`

export type StripTrailingNullChars<T extends string> = T extends '' ? ''
  : T extends `${infer U}${Null128}` ? StripTrailingNullChars<U>
  : T extends `${infer U}${Null64}` ? StripTrailingNullChars<U>
  : T extends `${infer U}${Null32}` ? StripTrailingNullChars<U>
  : T extends `${infer U}${Null16}` ? StripTrailingNullChars<U>
  : T extends `${infer U}${Null8}` ? StripTrailingNullChars<U>
  : T extends `${infer U}${Null4}` ? StripTrailingNullChars<U>
  : T extends `${infer U}${Null2}` ? StripTrailingNullChars<U>
  : Last<T> extends '\0' ? StripTrailingNullChars<RemoveLast<T>> : T

