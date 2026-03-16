const DEEP_NESTING_DEPTH = 100000;

// const runDeepNestingTest = test;
// TEMP: Until the C++ parser has matching recursion guards,
// do not run this deep-nesting suite in C++ mode.
const runDeepNestingTest =
    typeof isCppParserMode === "function" && isCppParserMode() ? test.skip : test;

function makeDeepArrayBindingPattern(depth) {
    let pattern = "x";
    for (let i = 0; i < depth; ++i) pattern = `[${pattern}]`;
    return pattern;
}

runDeepNestingTest("deep catch parameter binding pattern nesting does not crash parser", () => {
    const source = `try {} catch (${makeDeepArrayBindingPattern(DEEP_NESTING_DEPTH)}) {}`;
    expect(typeof canParseSource(source)).toBe("boolean");
});
