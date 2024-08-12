import fs from 'fs';
import path from 'path';
import parser from '@babel/parser';
import traverse from '@babel/traverse';
import ejs from 'ejs';
import { transformFromAst } from '@babel/core';

let id = 0;

// 创建资源
function createAsset(filePath) {
  // 1、获取文件的内容
  // AST -> 抽象语法树

  const source = fs.readFileSync(filePath, {
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

  const { code } = transformFromAst(ast, null, {
    presets: ['@babel/preset-env'],
  });
  // console.log('测试code', code);

  return {
    filePath,
    code,
    deps,
    mapping: {},
    id: id++,
  };
}

// const asset = createAsset();
// console.log('测试asset', asset);

// 合成图
function createGraph() {
  const mainAsset = createAsset('./example/main.js');

  // 队列
  const queue = [mainAsset];

  for (const asset of queue) {
    asset.deps.forEach((relativePath) => {
      // console.log('测试relativePath', relativePath);
      const child = createAsset(path.resolve('./example', relativePath));
      // console.log('测试child', child);
      asset.mapping[relativePath] = child.id;
      queue.push(child);
    });
  }

  return queue;
}

const graph = createGraph();
// console.log('测试graph', graph);

function build(graph) {
  // 模板
  const template = fs.readFileSync('./bundle.ejs', {
    encoding: 'utf-8',
  });

  const data = graph.map((asset) => {
    const { id, code, mapping } = asset;
    return { id, code, mapping };
  });
  // console.log('测试data', data);

  const code = ejs.render(template, { data });
  // console.log('测试code', code);

  fs.writeFileSync('./dist/bundle.js', code);
}

build(graph);
