import js from '@eslint/js'; // eslint推荐配置
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsEslintParser from '@typescript-eslint/parser';
import eslintPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

// 官方配置文档：https://eslint.org/docs/latest/use/configure
export default [
  // 该配置项 告诉 ESLint，我们拓展了哪些指定的配置集
  // eslint:recommended : 该配置集是 ESLint 内置的“推荐”，它打开一组小的、合理的规则，用于检查众所周知的最佳实践。
  // @typescript-eslint/recommended : 该配置集是 typescript-eslint 的“推荐”，它与 eslint:recommended 相似，但它启用了特定于 TS 的规则。
  // @typescript-eslint/eslint-recommended : 该配置集禁用 eslint:recommended 配置集中已经由 TS 处理的规则，防止 ESLint 和 TS 之间的冲突。
  // extends: [
  //   'eslint:recommended',
  //   'plugin:@typescript-eslint/recommended',
  //   'plugin:@typescript-eslint/eslint-recommended',
  // ],
  js.configs.recommended,
  // https://prettier.io/docs/en/install#eslint-and-other-linters
  // prettier（即eslint-config-prettier）关闭所有可能干扰 Prettier 规则的 ESLint 规则，确保将其放在最后，这样它有机会覆盖其它配置。
  eslintPrettier,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['node_modules/', 'pnpm-lock.yaml', '**/*.config.js'], // 根据你的 .eslintignore 文件内容添加

    languageOptions: {
      parser: tsEslintParser, // 默认情况下，ESLint 使用其内置的 Espree 解析器，该解析器与标准 JS 运行时 和 版本兼容，而我们需要将 TS 代码解析为 ESLint 兼容的AST，所以此处我们使用 @typescript-eslint/parser。
    },

    // 该配置项指示要加载的插件，这里
    // @typescript-eslint 插件使得我们能够在我们的存储库中，使用 typescript-eslint 包定义的规则集。
    // prettier插件（即eslint-plugin-prettier）将 Prettier 规则转换为 ESLint规则。
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error', // 打开prettier插件提供的规则，该插件从 ESLint 内运行 Prettier

      // 关闭这两个 ESLint 核心规则，这两个规则 和 Prettier插件一起使用会出现问题，具体可参阅
      // https://github.com/prettier/eslint-plugin-prettier/blob/master/README.md#arrow-body-style-and-prefer-arrow-callback-issue
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
    },
  },
];
