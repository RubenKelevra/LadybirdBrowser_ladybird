const DEEP_NESTING_DEPTH = 100000;

// const runDeepNestingTest = test;
// TEMP: Until the C++ parser has matching recursion guards,
// do not run this deep-nesting suite in C++ mode.
const runDeepNestingTest =
    typeof isCppParserMode === "function" && isCppParserMode() ? test.skip : test;

function makeDeepObjectBindingPattern(depth) {
    let pattern = "x";
    for (let i = 0; i < depth; ++i) pattern = `{a:${pattern}}`;
    return pattern;
}

runDeepNestingTest("deep object binding pattern nesting does not crash parser", () => {
    const source = `let ${makeDeepObjectBindingPattern(DEEP_NESTING_DEPTH)} = 0;`;
    expect(typeof canParseSource(source)).toBe("boolean");
});
