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