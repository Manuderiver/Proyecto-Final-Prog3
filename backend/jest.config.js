module.exports = {
testEnvironment: 'node',

testMatch: [
    '**/tests/**/*.test.js'
],

collectCoverage: true,

collectCoverageFrom: [
    'controllers/**/*.js',
    'routes/**/*.js'
],

coverageDirectory: 'coverage'
};