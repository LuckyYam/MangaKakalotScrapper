import { load } from 'cheerio'

export const parseChapterPages = (data: string): { title: string; url: string }[] => {
    const $ = load(data)
    const pages: { title: string; url: string }[] = []
    $('.img-loading').each((i, el) => {
        const title = $(el).attr('title') || ''
        const url = $(el).attr('data-src')
        if (url) pages.push({ title, url })
    })
    return pages
}
