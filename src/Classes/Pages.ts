import { join } from 'path'
import { writeFile, mkdir, stat, unlink, readFile } from 'fs/promises'
import { existsSync, createWriteStream } from 'fs'
import axios from 'axios'
import { tmpdir } from 'os'
import PDFDocument from 'pdfkit'

export class Pages {
    /**
     * @param {{title: string; url: string}[]} pages Pages of the manga chapter
     */
    constructor(public pages: { title: string; url: string }[]) {}

    /**
     * Downloads the pages of the manga chapter and saves it in a folder
     * @param {string} folderName Name of the folder to save the the downloaded chapter pages
     * @returns {Promise<void>}
     */
    public download = async (folderName: string): Promise<void> => {
        if (!folderName) throw new Error('No folder name provided to save the downloaded pages')
        if (!existsSync(folderName)) await mkdir(folderName, { recursive: true })
        const isDirectory = (await stat(folderName)).isDirectory()
        if (!isDirectory) throw new Error('Expected a directory for saving the downloads, but recieved a file.')
        for (const { url, title } of this.pages) {
            const filename = this.pages.findIndex((x) => x.title === title) + 1
            const extension = url.includes('jpg') ? 'jpg' : 'png'
            const { data } = await axios.get<Buffer>(url, { responseType: 'arraybuffer' })
            await writeFile(join(folderName, `${filename}.${extension}`), data)
        }
    }

    /**
     * Builds the PDF of the chapter pages
     * @param {string | undefined} filename Filename of the PDF
     * @returns {Promise<Buffer | string>} Will return a Buffer if the filename is not provided and string if the filename's provided
     */
    public PDF = async (filename?: string): Promise<Buffer | string> => {
        const pdf = new PDFDocument({ autoFirstPage: false })
        const file = filename
            ? `${filename}${filename.endsWith('.pdf') ? '' : '.pdf'}`
            : `${tmpdir()}/${Math.random().toString(36)}.pdf`
        pdf.pipe(createWriteStream(file))
        for (const { url } of this.pages) {
            const { data } = await axios.get<Buffer>(url, { responseType: 'arraybuffer' })
            const filename = `${tmpdir()}/${Math.random().toString(36)}.${url.includes('jpg') ? 'jpg' : 'png'}`
            await writeFile(filename, data)
            const img = (pdf as any).openImage(filename)
            pdf.addPage({ size: [img.width, img.height] })
            pdf.image(img, 0, 0)
            await unlink(filename)
            const index = this.pages.findIndex((x) => x.url === url)
            if (index === this.pages.length - 1) pdf.end()
        }
        if (filename) return file
        const buffer = await readFile(file)
        await unlink(file)
        return buffer
    }
}
