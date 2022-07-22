# MangaKakalotScrapper

[![NPM](https://img.shields.io/badge/Available%20On-NPM-lightgrey.svg?logo=npm&logoColor=339933&labelColor=white&style=flat-square)](https://www.npmjs.com/package/mangakakalot-scrapper)

A scrapper for [MangaKakalot](https://ww3.mangakakalot.tv)

[Documentation](https://luckyyam.github.io/MangaKakalotScrapper/)

---

## Installation
```
yarn add mangakakalot-scrapper
```
## Usage Examples
```ts
import { searchManga } from 'mangakakalot-scrapper'
;(async () => {
    //searches for manga
    const { data } = await searchManga(
        'Fairy Tail' /** name of the manga to search */,
        1 /** Page number of the search*/
    )
    const manga = data[0]
    //gets the details of the manga
    const details = await manga.getInfo()
    const chapters = details.chapters
    console.log(`${details.name} has ${chapters.length} chapters.`)
    const chapter = chapters[0]
    //gets the pages of the chapter
    const pages = await chapter.getPages()
    console.log(pages)
    //downloads the chapter pages and saves it in a folder
    await pages.download('Fairy Tail Ch-1') 
})()
```

```ts
import { getManga } from 'mangakakalot-scrapper'

//id of the manga from mangakakalot --> https://ww3.mangakakalot.tv/manga/manga-kw951979
const id = 'kw951979'
getManga(id)
    .then((res) => console.log(res))
    .catch((err) => console.error(err))
```

```ts
import { getChapterPages } from 'mangakakalot-scrapper'

//id of the chapter --> https://ww3.mangakakalot.tv/chapter/manga-kw951979/chapter-228
const id = 'kw951979/chapter-228'
getChapterPages(id)
    .then(async (res) => {
        console.log(res)
        //builds a PDF of the chapter pages and saves it
        await res.PDF('Nisekoi-228.pdf') //it will return a Buffer if no filename is provided
    })
    .catch((err) => console.error(err))
```