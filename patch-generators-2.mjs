import fs from 'fs';
import path from 'path';

const files = [
  'src/algorithms/treePreorder/generator.ts',
  'src/algorithms/treeInorder/generator.ts',
  'src/algorithms/treePostorder/generator.ts',
];

for (const file of files) {
  const filePath = path.resolve(file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace traverse signature
  content = content.replace(
    /function traverse\(nodeId: string \| null, parentStack: string\[\] = \[\]\) \{\n    const currentStack = nodeId \? \[\.\.\.parentStack, nodeId\] : \[\.\.\.parentStack, "null"\];/g,
    `function traverse(nodeId: string | null, parentId: string | null = null, side: "left" | "right" | null = null, parentStack: string[] = []) {
    const virtualId = nodeId || (parentId ? \`\${parentId}-null-\${side}\` : "null-root");
    const currentStack = nodeId ? [...parentStack, nodeId] : [...parentStack, "null"];`
  );

  // Replace currentNodeId: nodeId with currentNodeId: virtualId everywhere EXCEPT in the return step
  // Wait, it's easier to just replace all `currentNodeId: nodeId` with `currentNodeId: virtualId`.
  // Wait, in the return step, `nodeId` is guaranteed to be non-null (because we return early if it's null). So `virtualId` === `nodeId`.
  // It's safe to replace all!
  content = content.replace(/currentNodeId: nodeId,/g, `currentNodeId: virtualId,`);

  // Replace recursive calls
  content = content.replace(
    /traverse\(node\.left, currentStack\);/g,
    `traverse(node.left, nodeId, "left", currentStack);`
  );
  content = content.replace(
    /traverse\(node\.right, currentStack\);/g,
    `traverse(node.right, nodeId, "right", currentStack);`
  );

  fs.writeFileSync(filePath, content);
  console.log(`Patched ${file}`);
}
