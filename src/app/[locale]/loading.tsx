import { Logo } from "@/components/ui/Logo";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 row-between flex-col bg-background py-16">
      <div className="flex-1 row-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-foreground/10 border-t-foreground"></div>
      </div>

      <div className="flex items-center">
        <Logo className="mr-4 w-10 h-10" />
        <h1 className="font-asimovian text-3xl">sahif</h1>
      </div>
    </div>
  );
}
