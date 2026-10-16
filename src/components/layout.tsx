import { Suspense } from "react"
import { Link, NavLink, Outlet } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageFallback } from "@/components/page-fallback"
import { Toaster } from "@/components/ui/sonner"
import { useClock } from "@/hooks/use-clock"
import { navItems, site } from "@/data/site"
import { cn } from "@/lib/utils"

function Header() {
  const time = useClock(site.timeZone)

  return (
    <header className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-6 lg:max-w-7xl lg:px-10">
        <div className="flex items-center justify-between gap-4 py-3.5">
          <Link to="/" className="font-mono text-sm font-medium tracking-tight">
            {site.handle}
            <span className="text-muted-foreground">
              .{site.domain.replace(site.handle + ".", "")}
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <p className="hidden font-mono text-xs text-muted-foreground sm:block">
              {site.location} · {time}
            </p>
            <ThemeToggle />
          </div>
        </div>
        <nav
          aria-label="Site"
          className="flex flex-wrap gap-1 pb-3 font-mono text-xs"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-2.5 py-1.5 transition-colors",
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:max-w-7xl lg:px-10">
        <p>
          <span>{new Date().getFullYear()}</span> {site.name}
        </p>
      </div>
    </footer>
  )
}

export function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Header />
      <main
        id="content"
        className="mx-auto w-full max-w-6xl flex-1 px-6 py-14 lg:max-w-7xl lg:px-10"
      >
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
