import { useEffect } from "react"

const BASE_URL = "https://diwash-9.github.io"

type MetaAttr = "name" | "property"

function upsertMeta(attr: MetaAttr, key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  )
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement("link")
    el.setAttribute("rel", "canonical")
    document.head.appendChild(el)
  }
  el.setAttribute("href", href)
}

/**
 * Updates the document head for each route. Values are written onto the static
 * tags already present in index.html (rather than rendered as new React tags)
 * so crawlers that do not execute JavaScript still get sensible defaults and
 * no duplicate <title>/<meta> elements are created.
 */
export function Seo({
  title,
  description,
  path = "/",
  ogImage = "/og.png",
}: {
  title: string
  description: string
  path?: string
  /** Path to a social preview image, e.g. "/og/projects.png". */
  ogImage?: string
}) {
  useEffect(() => {
    const url = `${BASE_URL}${path}`
    const image = `${BASE_URL}${ogImage}`
    document.title = title
    upsertMeta("name", "description", description)
    upsertMeta("property", "og:title", title)
    upsertMeta("property", "og:description", description)
    upsertMeta("property", "og:url", url)
    upsertMeta("property", "og:image", image)
    upsertMeta("name", "twitter:title", title)
    upsertMeta("name", "twitter:description", description)
    upsertMeta("name", "twitter:image", image)
    upsertCanonical(url)
  }, [title, description, path, ogImage])

  return null
}
