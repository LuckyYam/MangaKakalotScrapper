import { IPagination } from '.'
import { Manga } from '../Classes'

export interface IMangaSearchResponse {
    /** Pagination of the search */
    pagination: IPagination
    /** Results of the search */
    data: Manga[]
}
