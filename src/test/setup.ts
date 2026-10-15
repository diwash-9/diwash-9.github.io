import "@testing-library/jest-dom/vitest"
import { afterEach } from "vitest"
import { cleanup } from "@testing-library/react"

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!("ResizeObserver" in window)) {
  // @ts-expect-error - test environment shim
  window.ResizeObserver = ResizeObserverMock
}

afterEach(() => {
  cleanup()
})
