import { useCallback, useEffect, useState } from 'react'
import { fetchPosts } from '../services/api'
import { useAuth } from '../context/AuthContext'
import Layout from '../components/Layout'
import PostCard from '../components/PostCard'
import { EmptyState, ErrorState, PostSkeleton } from '../components/ui'

export default function Posts() {
  const { user } = useAuth()
  const [posts, setPosts] = useState(null)
  const [error, setError] = useState('')

  const load = useCallback(() => {
    setError('')
    setPosts(null)
    fetchPosts().then((d) => setPosts(d.posts)).catch((e) => setError(e.message || 'Could not load posts'))
  }, [])

  useEffect(load, [load])

  return (
    <Layout>
      <header className="mb-2 border-b border-line pb-8">
        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">Stories</h1>
      </header>

      {error && <ErrorState message={error} onRetry={load} />}
      {!posts && !error && <div aria-busy="true"><PostSkeleton /><PostSkeleton /><PostSkeleton /></div>}
      {posts?.length === 0 && (
        <EmptyState
          title="No stories yet"
          text="Be the first to publish something."
          actionTo={user ? '/posts/new' : '/signup'}
          actionLabel={user ? 'Write a story' : 'Get started'}
        />
      )}
      {posts?.map((p) => <PostCard key={p.id} post={p} />)}
    </Layout>
  )
}
