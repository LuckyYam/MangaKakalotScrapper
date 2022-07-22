import { load } from 'cheerio'
import { Pages } from '../Classes'

export const parseChapterPages = (data: string): Pages => {
    const $ = load(data)
    const pages: { title: string; url: string }[] = []
    $('.img-loading').each((i, el) => {
        const title = $(el).attr('title') || ''
        const url = $(el).attr('data-src')
        if (url) pages.push({ title, url })
    })
    return new Pages(pages)
}
