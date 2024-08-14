// 处理.json文件
export function jsonLoader(source) {
  // console.log("测试jsonLoader", source);
  this.addDeps('jsonLoader');

  return `export default ${JSON.stringify(source)}`;
}
