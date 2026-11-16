import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { repostPost, unrepostPost } from '../services/api'
import { useAuth } from '../context/AuthContext'
import RepostIcon from './RepostIcon'

export default function RepostButton({ postId, reposted, count = 0, onChange }) {
  const { user } = useAuth()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const pending = useRef(false)

  async function toggle() {
    if (pending.current) return
    pending.current = true
    setBusy(true); setError('')
    try {
      const result = await (reposted ? unrepostPost(postId) : repostPost(postId))
      onChange(result)
    } catch (e) {
      setError(e.message || 'Could not update repost')
    } finally {
      pending.current = false
      setBusy(false)
    }
  }

  const label = `${count} ${count === 1 ? 'repost' : 'reposts'}`
  if (!user) return <span className="text-sm text-muted"><RepostIcon /> {label} · <Link to="/login" className="font-medium text-ink underline">Sign in to repost</Link></span>
  return (
    <span className="inline-flex items-center gap-2">
      <button type="button" onClick={toggle} disabled={busy} aria-pressed={!!reposted} className="text-sm text-muted hover:text-ink disabled:opacity-60">
        <RepostIcon /> {reposted ? 'Undo repost' : 'Repost'} · {label}
      </button>
      {error && <span role="alert" className="text-sm text-red-600">{error}</span>}
    </span>
  )
}
