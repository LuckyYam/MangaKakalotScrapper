import { IPagination, IMangaShortDetails } from '.'

export interface IMangaSearchResponse {
    /** Pagination of the search */
    pagination: IPagination
    /** Results of the search */
    data: IMangaShortDetails[]
}
