import { useEffect, useState } from "react"

export function useClock(timeZone: string) {
  const [time, setTime] = useState("--:--")

  useEffect(() => {
    function tick() {
      try {
        const now = new Date()
        const formatted = new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone,
        }).format(now)
        setTime(`${formatted} NPT`)
      } catch {
        setTime("--:--")
      }
    }
    tick()
    const id = window.setInterval(tick, 30000)
    return () => window.clearInterval(id)
  }, [timeZone])

  return time
}
