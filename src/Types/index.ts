export * from './Search'
export * from './Manga'
export * from './Enums'

export interface IPagination {
    /** Current page of the search */
    currentPage: number
    /** Total pages count of the search */
    totalPages: number
    /** Will be true if it has a next page */
    hasNextPage: boolean
}
