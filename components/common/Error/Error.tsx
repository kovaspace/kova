import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  title?: string;
  message?: string;
  retry?: () => void;
}

export default function Error({
  title = "Error",
  message = "Something went wrong",
  retry,
}: ErrorProps) {
  return (
    <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <AlertCircle className="h-8 w-8 text-destructive" />
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      {retry && (
        <Button variant="outline" onClick={retry}>
          Try again
        </Button>
      )}
    </div>
  );
}
