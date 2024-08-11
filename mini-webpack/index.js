import fs from 'fs';
import parser from '@babel/parser';
import traverse from '@babel/traverse';

// 创建资源
function createAsset() {
  // 1、获取文件的内容
  // AST -> 抽象语法树

  const source = fs.readFileSync('./example/main.js', {
    encoding: 'utf-8',
  });
  // console.log('测试source', source);

  // 2、获取依赖关系
  const ast = parser.parse(source, {
    sourceType: 'module',
  });
  // console.log('测试ast', ast);

  const deps = [];
  // 遍历ast
  traverse.default(ast, {
    ImportDeclaration: ({ node }) => {
      // console.log('测试import node', node.source.value);
      deps.push(node.source.value);
    },
  });

  return {
    source,
    deps,
  };
}

const asset = createAsset();
console.log('测试asset', asset);
