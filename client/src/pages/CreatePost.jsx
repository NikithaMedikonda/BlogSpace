import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost, fetchCategories } from '../services/api'
import Layout from '../components/Layout'
import Alert from '../components/Alert'
import { btnPrimary } from '../components/ui'
import { predefinedCategories } from '../categories'

export default function CreatePost() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', content: '', category: '' })
  const [categories, setCategories] = useState(predefinedCategories)
  const [categoryError, setCategoryError] = useState('')
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let active = true
    fetchCategories().then((data) => {
      if (active) setCategories([...new Set([...predefinedCategories, ...data.categories])])
    }).catch(() => {
      if (active) setCategoryError('Could not load previously created categories. You can still enter one.')
    })
    return () => { active = false }
  }, [])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function onSubmit(e) {
    e.preventDefault()
    setFormError('')
    const v = {}
    if (form.title.trim().length < 3) v.title = 'Title must be at least 3 characters'
    if (form.content.trim().length < 10) v.content = 'Story must be at least 10 characters'
    if (!form.category.trim() || form.category.trim().length > 50) v.category = 'Category must be 1-50 characters'
    setErrors(v)
    if (Object.keys(v).length) return
    setSubmitting(true)
    try {
      const d = await createPost(form)
      navigate(`/posts/${d.post.id}`, { state: { message: d.message } })
    } catch (err) {
      setErrors(err.fieldErrors || {})
      if (!err.fieldErrors || !Object.keys(err.fieldErrors).length) setFormError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <Layout>
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <Alert>{formError}</Alert>
        <div>
          <label htmlFor="title" className="sr-only">Title</label>
          <input
            id="title" name="title" value={form.title} onChange={onChange} maxLength={255} placeholder="Title"
            aria-invalid={!!errors.title}
            className="w-full border-0 border-b border-line bg-transparent pb-3 font-serif text-4xl font-bold tracking-tight outline-none placeholder:text-line focus:border-ink"
          />
          {errors.title && <p className="mt-1.5 text-sm text-red-600">{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="content" className="sr-only">Story</label>
          <textarea
            id="content" name="content" rows={14} value={form.content} onChange={onChange} maxLength={20000}
            placeholder="Tell your story..." aria-invalid={!!errors.content}
            className="w-full resize-y border-0 bg-transparent font-serif text-xl leading-relaxed outline-none placeholder:text-line"
          />
          {errors.content && <p className="mt-1.5 text-sm text-red-600">{errors.content}</p>}
          <p className="mt-1 text-right text-xs text-muted">{form.content.length}/20000</p>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium">Category</label>
          <input id="category" name="category" value={form.category} onChange={onChange} maxLength={50}
            list="category-suggestions" aria-invalid={!!errors.category} className="w-full border border-line p-2" />
          <datalist id="category-suggestions">
            {categories.map((category) => <option key={category} value={category} />)}
          </datalist>
          <p className="mt-1 text-sm text-muted">Choose a suggestion or enter a new category.</p>
          {categoryError && <p role="status" className="mt-1 text-sm text-red-600">{categoryError}</p>}
          {errors.category && <p className="mt-1.5 text-sm text-red-600">{errors.category}</p>}
        </div>
        <button disabled={submitting} className={btnPrimary}>{submitting ? 'Publishing...' : 'Publish'}</button>
      </form>
    </Layout>
  )
}
