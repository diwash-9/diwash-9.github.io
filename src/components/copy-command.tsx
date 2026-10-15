import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      toast.success("Copied to clipboard")
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error("Could not copy")
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/60 py-1.5 pr-1.5 pl-3">
      <code className="flex-1 overflow-x-auto font-mono text-xs whitespace-nowrap text-muted-foreground">
        {command}
      </code>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={copy}
        aria-label="Copy command"
        className="shrink-0 gap-1.5 font-mono text-xs"
      >
        {copied ? (
          <Check className="size-3.5" />
        ) : (
          <Copy className="size-3.5" />
        )}
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  )
}
