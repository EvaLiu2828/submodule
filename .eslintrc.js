module.exports = {
  // root: true,
  env: {
    'node': true,
    'jquery': true,
    "es6": true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-extra-semi':'error',
    'no-mixed-spaces-and-tabs': 0,
    "no-unused-vars": [0, { 
      // 允许声明未使用变量
      "vars": "local",
      // 参数不检查
      "args": "none" 
    }],
    "no-redeclare": "off",
    "no-undef": "off"
  }
}
