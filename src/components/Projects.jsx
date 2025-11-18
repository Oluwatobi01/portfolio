import React, { useEffect, useMemo, useState } from 'react'
import { projects as staticProjects } from '../data/projects.js'
import { netlify as netlifyMap } from '../data/netlify.js'
import { projectMeta } from '../data/projectMeta.js'

function concise(text = '', max = 160) {
  const clean = text.replace(/\s+/g, ' ').trim()
  return clean.length > max ? clean.slice(0, max - 1).trimEnd() + '…' : clean
}

function normalizeRepo(repo) {
  const title = repo.name?.replace(/[-_]/g, ' ') ?? 'Untitled'
  const description = concise(repo.description || 'Small project with a focused scope.')
  const tags = []
  if (repo.language) tags.push(repo.language)
  if (/next|react/i.test(description) || /next|react/i.test(repo.name)) tags.push('React')
  if (/vite/i.test(description)) tags.push('Vite')
  if (/node|express/i.test(description)) tags.push('Node.js')
  const homepage = repo.homepage?.trim() || ''
  const isNetlify = /netlify\.app/i.test(homepage)
  return {
    title,
    description,
    tags: Array.from(new Set(tags)).slice(0, 4),
    link: homepage || null,
    isNetlify,
    repo: repo.html_url,
    repoName: repo.name,
    stars: repo.stargazers_count || 0,
    updated: repo.updated_at,
  }
}

function hostnameToTitle(url = '') {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/\.netlify\.app$/i, '')
    return host.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  } catch {
    return 'Project'
  }
}

function applyNetlifyMap(items) {
  if (!Array.isArray(netlifyMap) || netlifyMap.length === 0) return items
  const byRepo = new Map(items.map(p => [p.repo?.toLowerCase(), p]))
  const byName = new Map(items.map(p => [p.repoName?.toLowerCase(), p]))

  // First, update any existing items from the mapping
  for (const n of netlifyMap) {
    const keyRepo = n.repo?.toLowerCase()
    const keyName = n.repoName?.toLowerCase()
    const match = (keyRepo && byRepo.get(keyRepo)) || (keyName && byName.get(keyName))
    if (match && n.url) {
      match.link = n.url
      match.isNetlify = /netlify\.app/i.test(n.url)
      if (n.repo) match.repo = n.repo
    }
  }

  // Then, add missing entries from mapping as synthetic items
  const existingUrls = new Set(items.map(p => p.link))
  const augmented = [...items]
  for (const n of netlifyMap) {
    if (!n.url) continue
    if (!existingUrls.has(n.url)) {
      augmented.push({
        title: hostnameToTitle(n.url),
        description: 'Deployed preview on Netlify.',
        tags: [],
        link: n.url,
        isNetlify: /netlify\.app/i.test(n.url),
        repo: n.repo || null,
        repoName: n.repoName || null,
        stars: 0,
        updated: null,
      })
    }
  }
  return augmented
}

function applyProjectMeta(items) {
  if (!Array.isArray(projectMeta) || projectMeta.length === 0) return items
  const bySub = new Map(projectMeta.map(m => [m.subdomain?.toLowerCase(), m]))
  return items.map(p => {
    let sub = ''
    try { sub = new URL(p.link).hostname.replace(/\.netlify\.app$/i, '').toLowerCase() } catch {}
    const meta = bySub.get(sub)
    if (!meta) return p
    return {
      ...p,
      description: meta.description || p.description,
      tags: Array.isArray(meta.tags) && meta.tags.length ? meta.tags : p.tags
    }
  })
}

export default function Projects() {
  const [fetched, setFetched] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        const res = await fetch('https://api.github.com/users/Oluwatobi01/repos?per_page=100', {
          headers: { 'User-Agent': 'portfolio-site' },
        })
        if (!res.ok) throw new Error(`GitHub: ${res.status}`)
        const json = await res.json()
        const mapped = (json || []).map(normalizeRepo)
        if (!cancelled) setFetched(mapped)
      } catch (e) {
        if (!cancelled) setError('Unable to load GitHub projects right now.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const merged = useMemo(() => {
    // Prefer GitHub data; fall back to static items (dedupe by title)
    const byTitle = new Map()
    fetched.forEach(p => byTitle.set(p.title.toLowerCase(), p))
    staticProjects.forEach(p => {
      const key = p.title.toLowerCase()
      if (!byTitle.has(key)) byTitle.set(key, p)
    })
    return applyProjectMeta(applyNetlifyMap(Array.from(byTitle.values())))
  }, [fetched])

  const displayed = useMemo(() => merged.filter(p => p.isNetlify && p.link), [merged])

  const order = useMemo(() => ['masdrive','tubestamp','constbuild','flocare','bullo','tobiai','tobiapclone'], [])

  function subdomainFromLink(link) {
    try {
      const host = new URL(link).hostname
      const sub = host.replace(/\.netlify\.app$/i, '')
      return sub.toLowerCase()
    } catch { return '' }
  }

  const ordered = useMemo(() => {
    const rank = new Map(order.map((k, i) => [k, i]))
    return [...displayed].sort((a, b) => {
      const ka = subdomainFromLink(a.link)
      const kb = subdomainFromLink(b.link)
      const ia = rank.has(ka) ? rank.get(ka) : Number.MAX_SAFE_INTEGER
      const ib = rank.has(kb) ? rank.get(kb) : Number.MAX_SAFE_INTEGER
      if (ia !== ib) return ia - ib
      return (a.title || '').localeCompare(b.title || '')
    })
  }, [displayed, order])

  return (
    <section id="projects" className="section alt">
      <div className="container">
        <h2>Projects</h2>
        {error && <p className="muted small" role="status">{error}</p>}
        {loading && <p className="muted small" role="status">Loading…</p>}
        {(!loading && displayed.length === 0) && (
          <p className="muted small" role="status">No Netlify-hosted projects to show yet.</p>
        )}
        <div className="grid-3">
          {ordered.map(p => (
            <article key={p.title} className="card">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              {Array.isArray(p.tags) && p.tags.length > 0 && (
                <ul className="tags small">
                  {p.tags.map(t => <li key={t}>{t}</li>)}
                </ul>
              )}
              <div className="card__actions">
                <a className="btn btn--sm" href={p.link} target="_blank" rel="noreferrer">Live on Netlify</a>
                {p.repo && (
                  <a className="btn btn--sm btn--ghost" href={p.repo} target="_blank" rel="noreferrer">Code</a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
