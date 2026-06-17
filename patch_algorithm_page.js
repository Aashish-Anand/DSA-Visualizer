const fs = require('fs');
let content = fs.readFileSync('src/pages/AlgorithmPage.tsx', 'utf-8');

// 1. BarSortPage
content = content.replace(
  /const handleArraySizeChange = useCallback\(\(size: number\) => \{\n    setArraySize\(size\);\n    setInputArray\(generateRandomArray\(size\)\);\n  \}, \[\]\);/g,
  `const handleArraySizeChange = useCallback((size: number) => {
    setArraySize(size);
    setInputArray(generateRandomArray(size));
  }, []);

  const handleCustomArrayChange = useCallback((arr: number[]) => {
    setArraySize(arr.length);
    setInputArray(arr);
  }, []);`
);

// SearchPage
content = content.replace(
  /const handleArraySizeChange = useCallback\(\(size: number\) => \{\n    setArraySize\(size\);\n    setInputArray\(generateRandomArray\(size\)\);\n  \}, \[\]\);/g, // same as above, will replace globally
  `...`
);
