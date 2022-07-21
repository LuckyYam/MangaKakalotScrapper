import { getChapterPages } from '../Helpers'
import { IChapter } from '../Types'

export class Chapter implements IChapter {
    constructor(
        public chapter: number,
        public title: string,
        public id: string,
        public views: number,
        public uploadedAt: string,
        public url: string
    ) {}

    /**
     * Gets the pages of the chapter
     * @returns {Promise<{ title: string; url: string }[]>}
     */
    public getPages = async (): Promise<{ title: string; url: string }[]> => await getChapterPages(this.id)
}
