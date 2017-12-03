module.exports = function (w) {

  return {
    files: [
      'cli/**/*.ts',
      '!cli/**/*.spec.ts',

      'data/**/*.ts',
      '!data/**/*.spec.ts',

      'types.ts',
    ],

    tests: [
      'cli/**/*.spec.ts',
      'data/**/*.spec.ts',
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest'
  };
};