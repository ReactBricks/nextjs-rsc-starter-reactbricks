import { fetchPages, fetchTags, types } from 'react-bricks/rsc'
import config from './config'

const pageTypes: types.IPageType[] = [
  {
    name: 'page',
    pluralName: 'pages',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    // customFields: [
    //   {
    //     name: 'test',
    //     type: types.SideEditPropType.Text,
    //     label: 'Test',
    //   },
    // ],
  },
  {
    name: 'blog',
    pluralName: 'Blog',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    slugPrefix: {
      default: 'news/',
      translations: {
        en: 'news/',
        it: 'novitax/',
      },
    },
    allowedBlockTypes: [
      'title',
      'paragraph',
      'big-image',
      'video',
      'code',
      'tweet',
      'tweet-light',
      'blog-title',
      'newsletter-subscribe',
      'external-data-example',
      'author-card',
      'authors-list',
    ],
    getExternalData: () =>
      fetch('https://catfact.ninja/fact')
        .then((response) => response.json())
        .then((data) => ({
          catFact: data.fact,
        })),
    customFields: [
      {
        name: 'authors',
        label: 'Authors',
        type: types.SideEditPropType.Relationship,
        relationshipOptions: {
          references: 'author',
          label: 'Author',
          multiple: true,
          embedValues: true,
        },
      },
    ],
  },

  {
    name: 'layout',
    pluralName: 'layout',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    isEntity: true,
  },

  {
    name: 'author',
    isEntity: true,
    pluralName: 'authors',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    customFields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: types.SideEditPropType.Text,
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: types.SideEditPropType.Text,
      },
      {
        name: 'photo',
        label: 'Photo',
        type: types.SideEditPropType.Image,
      },
    ],
  },
  {
    name: 'pokemon',
    pluralName: 'pokemon',
    getExternalData: (page) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${page.slug}`)
        .then((response) => response.json())
        .then((data) => ({
          ...data,
          imageUrl: `https://img.pokemondb.net/artwork/large/${data.name}.jpg`,
        })),
    // getExternalData: (_, args) => {
    //   console.log('args', args);
    //   return fetch(
    //       `https://acc-cortina-api.azurewebsites.net/api/v1/dealers/${
    //           args?.dealerId || '100438'
    //       }`
    //   )
    //       .then((response) => response.json())
    //       .then((data) => ({
    //           data,
    //       }));
  },
  {
    name: 'pokemon-list',
    pluralName: 'pokemon lists',
    getExternalData: async (page, args) => {
      // const tagArgs = args?.tag ? { tag: args.tag } : {}
      // const pages = await fetchPages(config.apiKey, {
      //   ...tagArgs,
      //   type: 'blog',
      //   pageSize: 4,
      //   sort: '-publishedAt',
      // })

      // const tags = await fetchTags(config.apiKey)

      // return {
      //   pagesByTag: pages,
      //   allTags: tags?.items || [],
      // }

      return fetchPages({
        type: 'pokemon',
        fetchExternalData: true,
        config,
      }).then((pokemons) => ({
        pokemons,
      }))
    },
  },
]

export default pageTypes
