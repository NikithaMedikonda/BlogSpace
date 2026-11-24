import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { btnPrimary } from '../components/ui'
import { HOME_TITLE } from '../siteName'

export default function Home() {
  return (
    <Layout>
      <header className="mb-2 border-b border-line pb-8">
        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">{HOME_TITLE}</h1>
        <p className="mt-3 text-lg text-muted">Read what the community is writing — or write your own.</p>
        <Link to="/posts" className={`${btnPrimary} mt-5`}>Start reading</Link>
        <Link to="/hello" className={`${btnPrimary} mt-5 ml-3`}>Hello</Link>
      </header>
    </Layout>
  )
}
