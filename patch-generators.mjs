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
    /function traverse\(nodeId: string \| null, parentStack: string\[\] = \[\]\) \{\n    const currentStack = nodeId \? \[\.\.\.parentStack, nodeId\] : parentStack;/g,
    `function traverse(nodeId: string | null, parentStack: string[] = []) {
    const currentStack = nodeId ? [...parentStack, nodeId] : [...parentStack, "null"];`
  );

  // Update initial step state
  content = content.replace(
    /visitedNodeIds: \[\.\.\.visitedNodeIds\],\n\s*phase: "init",/,
    `visitedNodeIds: [...visitedNodeIds],
      callStackIds: [],
      phase: "init",`
  );

  // Update complete step state
  content = content.replace(
    /visitedNodeIds: \[\.\.\.visitedNodeIds\],\n\s*phase: "complete",/,
    `visitedNodeIds: [...visitedNodeIds],
      callStackIds: [],
      phase: "complete",`
  );

  // Update traversing step state
  content = content.replace(
    /visitedNodeIds: \[\.\.\.visitedNodeIds\],\n\s*phase: "traversing",/g,
    `visitedNodeIds: [...visitedNodeIds],
        callStackIds: currentStack,
        phase: "traversing",`
  );

  // Update recursive calls
  content = content.replace(
    /traverse\(node\.left\);/g,
    `traverse(node.left, currentStack);`
  );
  content = content.replace(
    /traverse\(node\.right\);/g,
    `traverse(node.right, currentStack);`
  );

  fs.writeFileSync(filePath, content);
  console.log(`Patched ${file}`);
}
