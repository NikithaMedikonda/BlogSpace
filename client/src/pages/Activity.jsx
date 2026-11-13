import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { btnGhost, EmptyState, ErrorState, Spinner } from '../components/ui'
import { fetchActivity } from '../services/api'

const verbs = { post: 'published', comment: 'commented on', like: 'liked' }

export default function Activity() {
  const [entries, setEntries] = useState(null)
  const [hasMore, setHasMore] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    let active = true
    fetchActivity().then((data) => {
      if (active) { setEntries(data.activity); setHasMore(data.hasMore) }
    }).catch((e) => { if (active) setError(e.message || 'Could not load activity') })
    return () => { active = false }
  }, [version])

  function refresh() {
    setEntries(null)
    setError('')
    setHasMore(false)
    setVersion((v) => v + 1)
  }

  async function loadMore() {
    setLoading(true)
    setError('')
    try {
      const data = await fetchActivity(entries.length)
      setEntries((current) => [...current, ...data.activity])
      setHasMore(data.hasMore)
    } catch (e) { setError(e.message || 'Could not load activity') }
    finally { setLoading(false) }
  }

  return (
    <Layout>
      <header className="mb-6 flex items-center justify-between border-b border-line pb-6">
        <h1 className="font-serif text-4xl font-bold">Activity</h1>
        <button className={btnGhost} onClick={refresh} disabled={loading}>Refresh</button>
      </header>
      {error && <ErrorState message={error} onRetry={entries ? loadMore : refresh} />}
      {!entries && !error && <Spinner />}
      {entries?.length === 0 && <EmptyState title="No activity yet" text="Your posts and engagement will appear here." />}
      {entries?.map((entry) => (
        <article key={`${entry.type}-${entry.event_id}`} className="border-b border-line py-5">
          <p><strong>{entry.actor_name}</strong> {verbs[entry.type]} <Link className="underline" to={`/posts/${entry.post_id}`}>{entry.post_title}</Link></p>
          {entry.comment && <p className="mt-2 whitespace-pre-wrap text-muted">{entry.comment}</p>}
          <time className="mt-2 block text-sm text-muted" dateTime={entry.created_at}>{new Date(entry.created_at).toLocaleString()}</time>
        </article>
      ))}
      {entries && hasMore && !error && <button className={`${btnGhost} mt-6`} onClick={loadMore} disabled={loading}>{loading ? 'Loading…' : 'Load more'}</button>}
    </Layout>
  )
}
