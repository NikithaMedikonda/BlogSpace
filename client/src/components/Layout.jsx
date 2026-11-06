import Navbar from './Navbar'
import { SITE_NAME } from '../siteName'

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <aside
        aria-label={`${SITE_NAME} welcome`}
        className="bg-accent px-4 py-3 text-center text-sm font-medium text-white sm:text-base"
      >
        Welcome to {SITE_NAME} — a home for stories worth sharing.
      </aside>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">{children}</main>
      <footer className="border-t border-line py-6 text-center text-sm text-muted">© {new Date().getFullYear()} {SITE_NAME}</footer>
    </div>
  )
}
