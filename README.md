## Brainfuck Interpreter in TypeScript's Type System
This project is a [Brainfuck](https://en.wikipedia.org/wiki/Brainfuck) interpreter written using TypeScript's type system. Take a look at [this github thread](https://github.com/Microsoft/TypeScript/issues/14833) for discussion on what the type system is capable of.

To learn more about bf, see:
- [Basics of Brainfuck](https://gist.github.com/roachhd/dce54bec8ba55fb17d3a)
- [Interactive Brainfuck interpreter](https://www.nayuki.io/page/brainfuck-interpreter-javascript)

## Install & Test
Clone & yarn:

    $> git clone https://github.com/neilbostian/typefuck
    $> yarn

Run tests - see [tests](./tests):

    $> yarn test

#### Patch
`yarn` postinstall script runs a patch against typescript `tsc.js` and `tsserver.js` that updates the max `instantiationCount` and `instantiationDepth`. Using the default, tsc will error on large inputs:
> error TS2589: Type instantiation is excessively deep and possibly infinite.

VsCode also shows this error - you might need to explicitly set the typescript version to the workspace tsserver defined in [.vscode/settings.json](./.vscode/settings.json). See [this comment](https://github.com/microsoft/TypeScript/issues/34933#issuecomment-889570502) for more details.

#### Similar work
- Shoutout to Carter who had a similar idea 👉 [sno/bf](https://github.com/sno2/bf)
- This repo has loads of cool typescript 👉 [fightingcat/sits](https://github.com/fightingcat/sits/tree/master/lib)
