export default function Spinner({ className }: { className: string }) {
  return (
    <div className="flex-1 row-center justify-center">
      <div
        className={`animate-spin rounded-full border-foreground/10 border-t-foreground ${className}`}
      ></div>
    </div>
  );
}
