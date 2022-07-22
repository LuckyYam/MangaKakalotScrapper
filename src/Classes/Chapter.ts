import { getChapterPages } from '../Helpers'
import { Pages } from '.'
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
     * @returns {Promise<Pages>}
     */
    public getPages = async (): Promise<Pages> => await getChapterPages(this.id)
}
