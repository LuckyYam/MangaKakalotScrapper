export * from './Search'
export * from './Manga'
export * from './Enums'
export * from './List'

import { genres, status } from '.'

export interface IPagination {
    /** Current page of the search */
    currentPage: number
    /** Total pages count of the search */
    totalPages: number
    /** Will be true if it has a next page */
    hasNextPage: boolean
}

export interface IOptions {
    /** Page number of the list */
    page?: number
    /** Genre to be filtered in the list */
    genre?: keyof typeof genres
    /** Type of the manga */
    type?: 'newest' | 'latest' | 'topview'
    /** Status to be filtered of the manga */
    status?: keyof typeof status
}
