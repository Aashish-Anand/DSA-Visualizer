const fs = require('fs');
const path = require('path');

const dirs = [
  'middleOfLinkedList',
  'addTwoNumbers',
  'mergeTwoSortedLists',
  'reverseLinkedList',
  'deleteNodeLinkedList'
];

const basePath = '/Users/aashish/Desktop/My Projects/DSA_Visualizer/src/algorithms';

dirs.forEach(dir => {
  ['config.ts', 'generator.ts'].forEach(file => {
    const filePath = path.join(basePath, dir, file);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      content = content.replace(/\{ operations, reads, writes \}/g, '{ operations, comparisons: 0, reads, writes }');
      content = content.replace(/\{ operations: (\d+), reads: (\d+), writes: (\d+) \}/g, '{ operations: $1, comparisons: 0, reads: $2, writes: $3 }');
      content = content.replace(/trackedMetrics: \["operations", "reads", "writes"\]/g, 'trackedMetrics: ["operations", "comparisons", "reads", "writes"]');

      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
});
console.log("Fixed metrics");
