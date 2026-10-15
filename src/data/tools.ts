export type Tool = {
  id: string
  name: string
  alias?: string
  status: string
  description: string
  stack: string
  command?: string
  repo: string
}

export const tools: Tool[] = [
  {
    id: "omarchy-bsdate",
    name: "omarchy-bsdate",
    status: "Maintained",
    description:
      "Nepali date widget and calendar popup for the Omarchy bar. Shows Bikram Sambat alongside the English date, works offline, supports Roman and Devanagari.",
    stack: "QML, Bash, Quickshell",
    command:
      "omarchy plugin add https://github.com/diwash-9/omarchy-bsdate --enable",
    repo: "https://github.com/diwash-9/omarchy-bsdate",
  },
  {
    id: "omarchy-minimize",
    name: "omarchy-minimize",
    alias: "OmaVeil",
    status: "Maintained",
    description:
      "Minimize and restore workflow for Hyprland. Super+H hides a window, Super+I finds it again, Super+U brings back the last one. Written in Bash, no daemon.",
    stack: "Bash, hyprctl, jq",
    repo: "https://github.com/diwash-9/omarchy-minimize",
  },
  {
    id: "omarchy-ytmp3",
    name: "omarchy-ytmp3",
    status: "Maintained",
    description:
      "YouTube to MP3 and MP4 downloader for Omarchy, with launcher and terminal use. Handles playlists and adds basic metadata. Available on the AUR.",
    stack: "Bash, yt-dlp, ffmpeg",
    command: "yay -S omarchy-ytmp3",
    repo: "https://github.com/diwash-9/omarchy-ytmp3",
  },
]
