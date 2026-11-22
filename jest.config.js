const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'pages/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    'hooks/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/out/**',
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/out/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}

// Packages that ship only as ES modules (react-markdown, remark/micromark and
// friends) must be compiled for Jest. Found by reading package.json "type"
// rather than kept as a hand list, which goes stale on every upgrade.
const fs = require('fs')
const path = require('path')
const esmPackages = () => {
  const found = new Set()
  const scan = (dir, depth) => {
    if (depth > 3 || !fs.existsSync(dir)) return
    for (const entry of fs.readdirSync(dir)) {
      const names = entry.startsWith('@')
        ? fs.readdirSync(path.join(dir, entry)).map((sub) => `${entry}/${sub}`)
        : entry.startsWith('.') ? [] : [entry]
      for (const name of names) {
        const pkgDir = path.join(dir, name)
        try {
          if (JSON.parse(fs.readFileSync(path.join(pkgDir, 'package.json'), 'utf8')).type === 'module') found.add(name)
        } catch {
          // not a package
        }
        // nested copies can differ from the top-level one
        scan(path.join(pkgDir, 'node_modules'), depth + 1)
      }
    }
  }
  scan(path.join(__dirname, 'node_modules'), 0)
  return [...found]
}
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// next/jest adds its own rule that skips all of node_modules, so set the
// patterns after it has built the config.
module.exports = async () => {
  const config = await createJestConfig(customJestConfig)()
  config.transformIgnorePatterns = [
    `/node_modules/(?!(${esmPackages().map(escape).join('|')})/)`,
    '^.+\\.module\\.(css|sass|scss)$',
  ]
  return config
}