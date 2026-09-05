import {
  SESSION_STATUS_LABELS,
  type LiveSessionListItem,
} from "@/app/live-sessions/types/live-session"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface LiveSessionPickerProps {
  sessions: LiveSessionListItem[]
  selectedSessionId: string
  onSessionChange: (sessionId: string) => void
}

export function LiveSessionPicker({
  sessions,
  selectedSessionId,
  onSessionChange,
}: LiveSessionPickerProps) {
  return (
    <Select value={selectedSessionId} onValueChange={onSessionChange}>
      <SelectTrigger
        size="sm"
        className="h-8 min-w-0 max-w-[min(100%,12rem)] font-semibold sm:max-w-[min(100%,16rem)] md:max-w-[min(100%,20rem)]"
        aria-label="Chọn kịch bản live"
      >
        <SelectValue placeholder="Chọn kịch bản" />
      </SelectTrigger>
      <SelectContent align="start">
        {sessions.map((session) => (
          <SelectItem key={session.id} value={session.id}>
            {session.name} · {SESSION_STATUS_LABELS[session.status]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
