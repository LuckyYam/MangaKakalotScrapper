import axios from 'axios'
import { validatePage, parseMangaInfo } from '../Parser'
import { IMangaResponse } from '../Types'

/**
 * Gets the info of the manga by ID
 * @param {string} id The ID of the manga
 * @returns {Promise<IMangaResponse>}
 */
export const getManga = async (id: string): Promise<IMangaResponse> => {
    if (!id || typeof id !== 'string')
        throw new Error(`The type of parameter 'id' should be type string. Recieved ${typeof id}`)
    const url = `https://ww3.mangakakalot.tv/manga/manga-${id}`
    return await axios
        .get<string>(url)
        .then(({ data }) => {
            const valid = validatePage(data)
            if (!valid) throw new Error('Invalid Manga ID')
            return parseMangaInfo(data)
        })
        .catch((err) => {
            throw new Error(err.message)
        })
}
