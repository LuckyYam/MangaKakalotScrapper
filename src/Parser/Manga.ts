import { load } from 'cheerio'
import { genres, IMangaResponse, status as Status } from '../Types'

export const parseMangaInfo = (data: string): IMangaResponse => {
    const $ = load(data)
    const detailsElement = $('.manga-info-text').find('li')
    const namesElement = detailsElement.first()
    const name = namesElement.find('h1').text()
    let author = ''
    let genres: genres[] = []
    let lastUpdated = ''
    let views = 0
    let status: Status = Status.unknown
    const thumbnailSlug = $('.manga-info-pic').find('img').attr('src')
    const thumbnail = thumbnailSlug
        ? `https://ww3.mangakakalot.tv${thumbnailSlug}`
        : 'https://ww3.mangakakalot.tv/static/images/404-avatar.png'
    const alternateNames = namesElement.find('.story-alternative').text().trim().split(';')
    const slug = $('head > link:nth-child(1)').attr('href')
    const id = slug ? slug.split('manga-')[1] : ''
    const url = `https://ww3.mangakakalot.tv${slug || '/'}`
    detailsElement.each((i, el) => {
        const text = $(el).text().trim()
        if (text.includes('Author(s)'))
            author = text
                .replace('Author(s) :', '')
                .split('\n')
                .map((x) => x.trim())
                .filter((x) => x !== '')[0]
        if (text.includes('Status')) status = text.replace('Status :', '') as Status
        if (text.includes('Last updated')) lastUpdated = text.replace('Last updated :', '').trim()
        if (text.includes('View')) views = Number(text.replace('View : ', '').replace(/,/g, '').trim())
        if (text.includes('Genres'))
            genres = text
                .replace('Genres :', '')
                .replace(/,/g, '')
                .split('\n')
                .map((x) => x.trim())
                .filter((x) => x !== '') as genres[]
    })
    const summary = $('#noidungm').text().split('summary:', 2)[1].trim()
    const chapters: IMangaResponse['chapters'] = []
    $('.chapter-list > .row').each((i, el) => {
        let title = ''
        let views = 0
        let uploadedAt = ''
        let chapter = 0
        let id = ''
        let url = 'https://ww3.mangakakalot.tv'
        $(el)
            .find('span')
            .each((i, el) => {
                switch (i) {
                    case 0:
                        {
                            chapter = Number($(el).text().trim().replace('Chapter ', ''))
                            title = $(el).find('a').text().trim()
                            const slug = $(el).find('a').attr('href')
                            if (slug) {
                                id = slug.split('manga-')[1]
                                url += slug
                            }
                        }
                        break
                    case 1:
                        views = Number($(el).text().trim().replace(/,/g, ''))
                        break
                    case 2:
                        uploadedAt = $(el).text().trim()
                }
            })
        chapters.push({ chapter, title, id, views, uploadedAt, url })
    })
    return {
        name,
        id,
        author,
        views,
        lastUpdated,
        summary,
        status,
        genres,
        alternateNames,
        chapters: chapters.reverse(),
        thumbnail,
        url
    }
}
