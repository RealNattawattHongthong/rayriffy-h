import { json } from '@sveltejs/kit'

import fs from 'fs'
import path from 'path'

import { destr } from 'destr'

import { searchHentai } from '$core/services/searchHentai'
import { hentaiToMinifiedHentaiForListing } from '$core/services/hentaiToMinifiedHentaiForListing'

import type { RequestHandler } from './$types'
import type { Hentai } from '$core/@types/Hentai'

export const GET: RequestHandler = async event => {
  const query = event.url.searchParams.get('query')
  const page = event.url.searchParams.get('page')
  const filteredTags =
    JSON.parse(event.url.searchParams.get('filteredTags') as string) ?? []

  // if no search query then local search return null, otherwise return search results
  const localSearch =
    query === '' && filteredTags.length === 0
      ? null
      : searchHentai(
          query ?? '',
          Number(page),
          destr<Hentai[]>(
            await fs.promises.readFile(
              path.join(process.cwd(), 'data/searchKey.json'),
              'utf8'
            )
          ),
          filteredTags
        )

  const totalListingPages =
    localSearch?.totalPages ??
    (await fs.promises.readdir(path.join(process.cwd(), 'data/prebuiltChunks')))
      .length
  const hentais =
    (localSearch?.hentais as Hentai[]) ??
    (await fs.promises
      .readFile(
        path.join(process.cwd(), 'data/prebuiltChunks', `chunk-${page}.json`),
        'utf8'
      )
      .then(value => destr<number[]>(value))
      .then(codes =>
        Promise.all(
          codes.map(async code =>
            destr<Hentai>(
              await fs.promises.readFile(
                path.join(process.cwd(), 'data/hentai', `${code}.json`),
                'utf8'
              )
            )
          )
        )
      ))

  return json(
    {
      status: 'success',
      response: {
        data: {
          maxPage: totalListingPages,
          items: hentais.map(o => hentaiToMinifiedHentaiForListing(o)),
        },
      },
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=300',
      },
    }
  )
}
