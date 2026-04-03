import { Logo } from "@/components/ui/Logo";
import Spinner from "@/components/ui/Spinner";
import { SITE_NAME } from "@/constants";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 row-between flex-col bg-background py-16">
      <Spinner className="h-12 w-12 border-4" />

      <div className="flex items-center">
        <Logo className="mr-4 w-10 h-10" />
        <h1 className="font-asimovian text-3xl">{SITE_NAME}</h1>
      </div>
    </div>
  );
}
