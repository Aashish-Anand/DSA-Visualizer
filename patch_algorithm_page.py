import re

def process_file():
    with open("src/pages/AlgorithmPage.tsx", "r") as f:
        content = f.read()

    # Split into components
    parts = re.split(r'\n(?=function [A-Z])', content)
    
    new_parts = []
    for part in parts:
        if "InputControls" not in part:
            new_parts.append(part)
            continue
            
        # Skip ClimbingStairs since it doesn't have an array to edit
        if "ClimbingStairsPage" in part:
            new_parts.append(part)
            continue
            
        arr_prop = None
        # Add handler
        if "const handleArraySizeChange = useCallback((size: number) => {" in part:
            if "setHeights" in part:
                # FrogJump
                part = part.replace(
                    "}, []);\n\n  return (", 
                    "}, []);\n\n  const handleCustomArrayChange = useCallback((arr: number[]) => {\n    setArraySize(arr.length);\n    setHeights(arr);\n  }, []);\n\n  return ("
                )
                arr_prop = "heights"
            else:
                # Standard
                part = part.replace(
                    "}, []);\n\n  return (", 
                    "}, []);\n\n  const handleCustomArrayChange = useCallback((arr: number[]) => {\n    setArraySize(arr.length);\n    setInputArray(arr);\n  }, []);\n\n  return ("
                )
                arr_prop = "inputArray"
        elif "TwoSumPage" in part or "TwoPointersPage" in part:
            if "TwoSumPage" in part:
                part = part.replace(
                    "  );\n\n  return (",
                    "  );\n\n  const handleCustomArrayChange = useCallback((arr: number[]) => {\n    setInput((prev) => ({ ...prev, nums: arr }));\n  }, []);\n\n  return ("
                )
            else:
                # TwoPointersPage
                part = part.replace(
                    "  );\n\n  return (",
                    "  );\n\n  const handleCustomArrayChange = useCallback((arr: number[]) => {\n    setArraySize(arr.length);\n    setInput((prev) => ({ ...prev, nums: arr }));\n  }, []);\n\n  return ("
                )
            arr_prop = "input.nums"
            
        # Inject into InputControls
        if arr_prop and "onCustomArrayChange=" not in part:
            part = re.sub(
                r'(<InputControls[^>]*?)(\s*/>)',
                rf'\1\n          currentArray={{{arr_prop}}}\n          onCustomArrayChange={{handleCustomArrayChange}}\2',
                part,
                flags=re.DOTALL
            )
            
        new_parts.append(part)

    return "\n".join(new_parts)

content = process_file()
with open("src/pages/AlgorithmPage.tsx", "w") as f:
    f.write(content)
