import { load } from 'cheerio'

export * from './Search'
export * from './Manga'
export * from './ChapterPages'
export * from './List'

export const validatePage = (data: string): boolean => !load(data)('.login').text().includes('Sorry, the page')
