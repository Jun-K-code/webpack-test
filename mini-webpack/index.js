import fs from 'fs';

// 创建资源
function createAsset() {
  // 获取文件的内容
  // 获取依赖关系

  const source = fs.readFileSync('./example/main.js');
  console.log(source);
  
  return {};
}
