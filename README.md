Clone repo, install tsc, apply patch:

    $> git clone https://github.com/neilbostian/typefuck
    $> npm i
    $> npx patch-package

Relevant:
- [Basics of Brainfuck](https://gist.github.com/roachhd/dce54bec8ba55fb17d3a)
- [More helpful BF resources](https://www.nayuki.io/page/brainfuck-interpreter-javascript)
- [Turing completeness of Typescript's type system](https://github.com/Microsoft/TypeScript/issues/14833)
- [Somebody who beat me to this idea by 3 weeks](https://github.com/sno2/bf)
- [Increase typescript instantiationDepth & instantiationCount](https://github.com/microsoft/TypeScript/issues/34933#issuecomment-889570502)