import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageLoaderProps {
  label?: string;
  fullScreen?: boolean;
  className?: string;
}

export function PageLoader({
  label = "Loading...",
  fullScreen = false,
  className,
}: PageLoaderProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-3 text-gray-500",
        fullScreen ? "min-h-screen" : "min-h-[60vh]",
        className
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
