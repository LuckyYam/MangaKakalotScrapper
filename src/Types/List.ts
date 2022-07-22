import { IPagination } from '.'

export interface IListResponse {
    pagination: IPagination
    data: IListManga[]
}

export interface IListManga {
    /** Name of the manga */
    name: string
    /** ID of the manga */
    id: string
    /** Views of the manga */
    views: number
    /** Summary of the manga */
    summary: string
    /** Thumbnail of the manga */
    thumbnail: string
    /** URL of the manga */
    url: string
}
