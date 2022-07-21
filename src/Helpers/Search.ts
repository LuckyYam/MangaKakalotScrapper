import axios from 'axios'
import { parseSearcResults } from '../Parser'
import { IMangaSearchResponse } from '../Types'

/**
 * Searches manga of the given query in Mangakahalot
 * @param {string} term The search term
 * @param {number} page The page number of the search
 * @returns {Promise<IMangaSearchResponse>}
 */
export const searchManga = async (term: string, page = 1): Promise<IMangaSearchResponse> => {
    if (!term || typeof term !== 'string')
        throw new Error(`The type of parameter 'id' should be type string. Recieved ${typeof term}`)
    const url = `https://ww3.mangakakalot.tv/search/${term}?page=${page}`
    return await axios
        .get<string>(url)
        .then(({ data }) => {
            const results = parseSearcResults(data)
            return results
        })
        .catch((err) => {
            throw new Error(err.message)
        })
}
