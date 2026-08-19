import { cn } from "@/lib/utils";
import { IconFolderOpen } from "@tabler/icons-react";

interface FileLabelProps extends React.ComponentProps<"div"> {
  name: string;
}

function FileLabel({ name, className, ...props }: FileLabelProps) {
  return (
    <div
      className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}
      {...props}
    >
      <IconFolderOpen size={16} />
      <span className="truncate max-w-75">{name}</span>
    </div>
  );
}

export { FileLabel };
