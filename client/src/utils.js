export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

export const readingTimeMinutes = (content = '') => {
  const wordCount = content.trim().match(/\S+/g)?.length || 0
  return Math.max(1, Math.ceil(wordCount / 200))
}

export const formatReadingTime = (content) => `${readingTimeMinutes(content)} min read`
