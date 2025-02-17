import z from 'zod'

import { createTRPCRouter, publicProcedure } from '$trpc/utils'
import { searchInputSchema } from '$core/constants/schema/searchInput'
import { codes } from '$core/constants/codes'
import { searchMain } from '$core/services/search/main'
import { searchListing } from '$core/services/search/listing'
import { searchTag } from '$core/services/search/tag'
import { getHentai } from '$core/services/getHentai'

export const hentaiRouter = createTRPCRouter({
  search: publicProcedure
    .input(searchInputSchema)
    .query(async ({ input: { mode, ...input } }) => {
      let searchFn =
        mode === 'main'
          ? searchMain
          : mode === 'listing'
            ? searchListing
            : searchTag

      return searchFn(input)
    }),
  get: publicProcedure
    .input(
      z.object({
        code: z.string().refine(o => o.length <= 6),
      })
    )
    .query(async ({ input: { code } }) => {
      const hentai = await getHentai(code)
      const excludeDatabase = codes.find(
        o => typeof o !== 'number' && o.code === Number(code)
      )

      return {
        hentai,
        excludes:
          excludeDatabase === undefined
            ? []
            : (excludeDatabase as { code: number; exclude: number[] }).exclude,
      }
    }),
})
