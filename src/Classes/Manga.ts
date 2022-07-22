import { IMangaShortDetails } from '../Types'
import { getManga } from '../Helpers'
import { IMangaResponse } from '../Types'

export class Manga implements IMangaShortDetails {
    constructor(
        public name: string,
        public id: string,
        public author: string,
        public views: number,
        public lastUpdated: string,
        public thumbnail: string,
        public url: string
    ) {}

    /**
     * Gets the info the manga
     * @returns {Promise<IMangaResponse>}
     */
    public async getInfo(): Promise<IMangaResponse> {
        return await getManga(this.id)
    }
}
