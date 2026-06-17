import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Shuffle, Dice5, Edit2, Check, X as XIcon } from "lucide-react";
import { useState } from "react";

interface BaseInputProps {
  currentArray?: number[];
  onCustomArrayChange?: (arr: number[]) => void;
}

interface SortingInputControlsProps extends BaseInputProps {
  type: "sorting";
  arraySize: number;
  maxSize?: number;
  onArraySizeChange: (size: number) => void;
  onRandomize: () => void;
}

interface SearchInputControlsProps extends BaseInputProps {
  type: "search";
  arraySize: number;
  target: number;
  maxSize?: number;
  onArraySizeChange: (size: number) => void;
  onTargetChange: (target: number) => void;
  onRandomize: () => void;
}

interface TwoSumInputControlsProps extends BaseInputProps {
  type: "two-sum";
  target: number;
  onTargetChange: (target: number) => void;
  onRandomize: () => void;
}

type InputControlsProps = SortingInputControlsProps | SearchInputControlsProps | TwoSumInputControlsProps;

export function InputControls(props: InputControlsProps) {
  if (props.type === "sorting") {
    return <SortingInputs {...props} />;
  }
  if (props.type === "search") {
    return <SearchInputs {...props} />;
  }
  return <TwoSumInputs {...props} />;
}

// --------------------------------------------------------
// Custom Array Editor Component
// --------------------------------------------------------
function ArrayEditor({
  currentArray,
  onApply,
  onCancel,
}: {
  currentArray: number[];
  onApply: (arr: number[]) => void;
  onCancel: () => void;
}) {
  const [inputValue, setInputValue] = useState(currentArray.join(", "));
  const [error, setError] = useState<string | null>(null);

  const handleApply = () => {
    const parts = inputValue.split(",").map((s) => s.trim()).filter((s) => s !== "");
    if (parts.length === 0) {
      setError("Array cannot be empty");
      return;
    }
    if (parts.length > 50) {
      setError("Maximum 50 items allowed");
      return;
    }
    const arr: number[] = [];
    for (const p of parts) {
      const n = Number(p);
      if (isNaN(n)) {
        setError(`Invalid number: '${p}'`);
        return;
      }
      arr.push(n);
    }
    onApply(arr);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap bg-muted/30 p-1.5 rounded-lg border border-border">
      <div className="flex flex-col gap-1">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError(null);
          }}
          className={`h-8 w-64 px-2 text-xs font-mono rounded-md border ${
            error ? "border-red-500 focus:ring-red-500/30" : "border-border focus:ring-primary/30"
          } bg-background text-foreground focus:outline-none focus:ring-2`}
          placeholder="e.g. 5, 2, 8, 1"
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
        />
        {error && <span className="text-[10px] text-red-500 absolute -bottom-4">{error}</span>}
      </div>
      <Button size="sm" onClick={handleApply} className="h-8 w-8 p-0 bg-emerald-500 hover:bg-emerald-600 text-white">
        <Check size={14} />
      </Button>
      <Button size="sm" variant="ghost" onClick={onCancel} className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
        <XIcon size={14} />
      </Button>
    </div>
  );
}

// --------------------------------------------------------

function SortingInputs({
  arraySize,
  onArraySizeChange,
  onRandomize,
  currentArray,
  onCustomArrayChange,
}: SortingInputControlsProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing && currentArray && onCustomArrayChange) {
    return (
      <ArrayEditor
        currentArray={currentArray}
        onApply={(arr) => {
          onCustomArrayChange(arr);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="flex items-center gap-3 flex-wrap relative">
      <Button variant="outline" size="sm" onClick={onRandomize} className="h-8 gap-1.5 text-xs">
        <Shuffle size={13} />
        Randomize
      </Button>

      {currentArray && onCustomArrayChange && (
        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="h-8 gap-1.5 text-xs">
          <Edit2 size={13} />
          Edit Input
        </Button>
      )}

      <div className="flex items-center gap-2 ml-2">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium whitespace-nowrap">
          Size: {arraySize}
        </span>
        <Slider
          value={[arraySize]}
          onValueChange={([v]) => onArraySizeChange(v)}
          min={5}
          max={40}
          step={1}
          className="w-24"
        />
      </div>
    </div>
  );
}

function SearchInputs({
  arraySize,
  target,
  maxSize = 20,
  onArraySizeChange,
  onTargetChange,
  onRandomize,
  currentArray,
  onCustomArrayChange,
}: SearchInputControlsProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing && currentArray && onCustomArrayChange) {
    return (
      <div className="flex items-center gap-3 flex-wrap">
        <ArrayEditor
          currentArray={currentArray}
          onApply={(arr) => {
            onCustomArrayChange(arr);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
        <Separator orientation="vertical" className="h-4 mx-1" />
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium whitespace-nowrap">
            Target:
          </span>
          <input
            type="number"
            value={target}
            onChange={(e) => onTargetChange(parseInt(e.target.value) || 0)}
            className="w-16 h-8 px-2 text-sm font-mono rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 tabular-nums"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Button variant="outline" size="sm" onClick={onRandomize} className="h-8 gap-1.5 text-xs">
        <Shuffle size={13} />
        Randomize
      </Button>

      {currentArray && onCustomArrayChange && (
        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="h-8 gap-1.5 text-xs">
          <Edit2 size={13} />
          Edit Input
        </Button>
      )}

      <div className="flex items-center gap-2 ml-2">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium whitespace-nowrap">
          Size: {arraySize}
        </span>
        <Slider
          value={[arraySize]}
          onValueChange={([v]) => onArraySizeChange(v)}
          min={5}
          max={maxSize}
          step={1}
          className="w-20"
        />
      </div>

      <Separator orientation="vertical" className="h-4 mx-1" />

      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium whitespace-nowrap">
          Target:
        </span>
        <input
          type="number"
          value={target}
          onChange={(e) => onTargetChange(parseInt(e.target.value) || 0)}
          className="w-16 h-8 px-2 text-sm font-mono rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 tabular-nums"
        />
      </div>
    </div>
  );
}

function TwoSumInputs({
  target,
  onTargetChange,
  onRandomize,
  currentArray,
  onCustomArrayChange,
}: TwoSumInputControlsProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing && currentArray && onCustomArrayChange) {
    return (
      <div className="flex items-center gap-3 flex-wrap">
        <ArrayEditor
          currentArray={currentArray}
          onApply={(arr) => {
            onCustomArrayChange(arr);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
        <Separator orientation="vertical" className="h-4 mx-1" />
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium whitespace-nowrap">
            Target:
          </span>
          <input
            type="number"
            value={target}
            onChange={(e) => onTargetChange(parseInt(e.target.value) || 0)}
            className="w-16 h-8 px-2 text-sm font-mono rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 tabular-nums"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Button variant="outline" size="sm" onClick={onRandomize} className="h-8 gap-1.5 text-xs">
        <Dice5 size={13} />
        Random Input
      </Button>

      {currentArray && onCustomArrayChange && (
        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="h-8 gap-1.5 text-xs">
          <Edit2 size={13} />
          Edit Array
        </Button>
      )}

      <Separator orientation="vertical" className="h-4 mx-1" />

      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium whitespace-nowrap">
          Target:
        </span>
        <input
          type="number"
          value={target}
          onChange={(e) => onTargetChange(parseInt(e.target.value) || 0)}
          className="w-16 h-8 px-2 text-sm font-mono rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 tabular-nums"
        />
      </div>
    </div>
  );
}
