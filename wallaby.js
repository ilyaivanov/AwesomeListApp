module.exports = function (w) {

  return {
    files: [
      'cli/**/*.ts',
      '!cli/**/*.spec.ts',

      'data/**/*.ts',

      'types.ts',
    ],

    tests: [
      'cli/**/*.spec.ts',
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest'
  };
};