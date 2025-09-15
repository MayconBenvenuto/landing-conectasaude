import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://belz-conecta-saude.vercel.app'
  return [
    {
      url: base + '/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    }
  ]
}
