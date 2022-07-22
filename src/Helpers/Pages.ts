import axios from 'axios'
import { parseChapterPages, validatePage } from '../Parser'
import { Pages } from '../Classes'

/**
 * Gets the pages of the manga chapter
 * @param {string} id The ID of the chapter
 * @returns {Promise<Pages>}
 */
export const getChapterPages = async (id: string): Promise<Pages> => {
    if (!id || typeof id !== 'string')
        throw new Error(`The type of parameter 'id' should be type string. Recieved ${typeof id}`)
    const url = `https://ww3.mangakakalot.tv/chapter/manga-${id}`
    return await axios
        .get<string>(url)
        .then(({ data }) => {
            const valid = validatePage(data)
            if (!valid) throw new Error('Invalid ID of a manga chapter.')
            const results = parseChapterPages(data)
            if (!results.pages.length) throw new Error('Invalid ID of a manga chapter.')
            return results
        })
        .catch((err) => {
            throw new Error(err.message)
        })
}
