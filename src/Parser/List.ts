import { load } from 'cheerio'
import { IListResponse } from '../Types/List'

export const parseListResults = (data: string): IListResponse => {
    const $ = load(data)
    const mangaData: IListResponse['data'] = []
    const pageElements = $('.group_page')
    const currentPage = Number($(pageElements).find('.page_select').text())
    const totalPages = Number(
        ($(pageElements)
            .find('.page_blue.page_last')
            .text()
            .match(/(-\d+|\d+)/g) || ['1'])[0]
    )
    $('.list-truyen-item-wrap').each((i, el) => {
        const detailsElement = $(el).find('a')
        const slug = detailsElement.attr('href')
        const id = slug ? slug.split('manga-')[1] : ''
        const url = `https://ww3.mangakakalot.tv${slug || '/'}`
        const name = detailsElement.attr('title') || ''
        const thumbnailSlug = detailsElement.find('.img-loading').attr('data-src')
        const thumbnail = `https://ww3.mangakakalot.tv${thumbnailSlug || '/static/images/404-avatar.png'}`
        const views = Number($(el).find('.aye_icon').text().replace(/,/g, '').trim())
        const summary = $(el).find('p').text().trim()
        mangaData.push({ name, id, views, thumbnail, summary, url })
    })
    return {
        pagination: {
            currentPage,
            hasNextPage: currentPage < totalPages,
            totalPages
        },
        data: mangaData
    }
}
