<script lang="ts">
  import PlusIcon from '$icons/plus.svelte'
  import MinusIcon from '$icons/minus.svelte'

  import { collection } from '$nanostores/collection'

  import type { Hentai } from '$core/@types/Hentai'

  export let hentai: Hentai

  $: isFavorited =
    $collection.find(o => Number(o.id) === Number(hentai.id)) !== undefined

  const onToggleCollection = () => {
    // if exist then remove hentai from collection, otherwise add hentai to collection
    if (isFavorited) {
      collection.set(
        collection.get().filter(o => Number(o.id) !== Number(hentai.id))
      )
    } else {
      collection.set([
        {
          id: hentai.id,
          internal: false,
          data: { ...hentai, images: { ...hentai.images, pages: [] } },
        },
        ...collection.get(),
      ])
    }
  }
</script>

<button class="btn btn-square btn-secondary" on:click={onToggleCollection}>
  {#if isFavorited}
    <MinusIcon class="w-8" />
  {:else}
    <PlusIcon class="w-7" />
  {/if}
</button>
