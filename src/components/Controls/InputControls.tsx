import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Shuffle, Dice5 } from "lucide-react";

interface BubbleSortInputControlsProps {
  type: "bubble-sort";
  arraySize: number;
  onArraySizeChange: (size: number) => void;
  onRandomize: () => void;
}

interface TwoSumInputControlsProps {
  type: "two-sum";
  target: number;
  onTargetChange: (target: number) => void;
  onRandomize: () => void;
}

type InputControlsProps = BubbleSortInputControlsProps | TwoSumInputControlsProps;

export function InputControls(props: InputControlsProps) {
  if (props.type === "bubble-sort") {
    return <BubbleSortInputs {...props} />;
  }
  return <TwoSumInputs {...props} />;
}

function BubbleSortInputs({
  arraySize,
  onArraySizeChange,
  onRandomize,
}: BubbleSortInputControlsProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Button
        variant="outline"
        size="sm"
        onClick={onRandomize}
        className="h-8 gap-1.5 text-xs"
      >
        <Shuffle size={13} />
        Randomize
      </Button>

      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium whitespace-nowrap">
          Size: {arraySize}
        </span>
        <Slider
          value={[arraySize]}
          onValueChange={([v]) => onArraySizeChange(v)}
          min={5}
          max={20}
          step={1}
          className="w-24"
        />
      </div>
    </div>
  );
}

function TwoSumInputs({
  target,
  onTargetChange,
  onRandomize,
}: TwoSumInputControlsProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Button
        variant="outline"
        size="sm"
        onClick={onRandomize}
        className="h-8 gap-1.5 text-xs"
      >
        <Dice5 size={13} />
        Random Input
      </Button>

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
