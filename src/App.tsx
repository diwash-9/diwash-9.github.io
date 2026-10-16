import { lazy } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { Layout } from "@/components/layout"

const Home = lazy(() => import("@/pages/home"))
const Projects = lazy(() => import("@/pages/projects"))
const ProjectDetail = lazy(() => import("@/pages/project"))
const Tools = lazy(() => import("@/pages/tools"))
const Archive = lazy(() => import("@/pages/archive"))
const Teaching = lazy(() => import("@/pages/teaching"))
const Credentials = lazy(() => import("@/pages/credentials"))
const About = lazy(() => import("@/pages/about"))
const NotFound = lazy(() => import("@/pages/not-found"))

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="tools" element={<Tools />} />
          <Route path="archive" element={<Archive />} />
          <Route path="teaching" element={<Teaching />} />
          <Route path="credentials" element={<Credentials />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
