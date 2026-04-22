import { cn } from "@/lib/cn";

interface SpinnerProps {
  className?: string;
  label?: string;
}

export default function Spinner({
  className,
  label = "Loading",
}: SpinnerProps) {
  return (
    <div className="flex-1 row-center" role="status" aria-label={label}>
      <div
        className={cn(
          "animate-spin rounded-full border-foreground/10 border-t-foreground",
          className,
        )}
      />
    </div>
  );
}
