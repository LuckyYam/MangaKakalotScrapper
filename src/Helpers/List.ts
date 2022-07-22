import axios from 'axios'
import { parseListResults } from '../Parser'
import { IOptions, IListResponse, genres, status as Status } from '../Types'

/**
 * Gets the manga list from MangaKakalot
 * @param {IOptions} options Options for getting the list
 * @returns {Promise<IListResponse>}
 */
export const getMangaList = async (options?: IOptions): Promise<IListResponse> => {
    let url = 'https://ww3.mangakakalot.tv/manga_list/?type='
    let type: IOptions['type'] = 'latest'
    if (options?.type) type = options.type
    url += type
    const genre = options?.genre ? genres[options.genre] || genres.all : genres.all
    url += `&category=${genre}`
    const status = options?.status ? Status[options.status] || Status.all : Status.all
    url += `&state=${status}`
    const page = options?.page ? options.page : 1
    url += `&page=${page}`
    return await axios
        .get<string>(url)
        .then((res) => parseListResults(res.data))
        .catch((err) => {
            throw new Error(err.message)
        })
}
