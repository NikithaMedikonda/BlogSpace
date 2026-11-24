import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { btnPrimary } from '../components/ui'
import { HOME_TITLE } from '../siteName'

export default function Home() {
  return (
    <Layout>
      <aside aria-label="Factory greeting" className="mb-6 rounded-lg bg-accent px-4 py-3 text-center font-medium text-white">
        Hello from Factory
      </aside>
      <header className="mb-2 border-b border-line pb-8">
        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">{HOME_TITLE}</h1>
        <p className="mt-3 text-lg text-muted">Read what the community is writing — or write your own.</p>
        <Link to="/posts" className={`${btnPrimary} mt-5`}>Start reading</Link>
      </header>
    </Layout>
  )
}
