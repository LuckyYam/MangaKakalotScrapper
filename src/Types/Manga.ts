import { Chapter } from '../Classes'
import { genres, status } from './Enums'

export interface IMangaResponse extends IMangaShortDetails {
    /** Summary of the manga */
    summary: string
    /** Status of the manga */
    status: status
    /** Genres of the manga */
    genres: genres[]
    /** Alternate names of the manga */
    alternateNames: string[]
    /** Chapters of the manga */
    chapters: Chapter[]
}

export interface IMangaShortDetails {
    /** Name of the manga */
    name: string
    /** ID of the manga */
    id: string
    /** Author of the manga */
    author: string
    /** Total views count of the manga */
    views: number
    /** Moment of when the manga was updated */
    lastUpdated: string
    /** Thumbnail of the manga */
    thumbnail: string
    /** URL of the manga */
    url: string
}

export interface IChapter {
    /** Chapter number */
    chapter: number
    /** Title of the chapter */
    title: string
    /** ID of the chapter */
    id: string
    /** Total views of the chapter */
    views: number
    /** Moment of which the chapter was uploaded */
    uploadedAt: string
    /** URL of the chapter */
    url: string
}
