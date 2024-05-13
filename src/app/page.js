import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

const tmp = {
  title: [
    { type: "heading1", text: "VISHWANATH HEDGE", spans: [], direction: "ltr" },
  ],
  parent: { link_type: "Document" },
  slices: [
    {
      variation: "default",
      version: "sktwi1xtmkfgx8626",
      items: [{}],
      primary: {
        text: [
          {
            type: "heading1",
            text: "VISHWANATH HEDGE",
            spans: [],
            direction: "ltr",
          },
        ],
        buttonLink: { link_type: "Any" },
        buttonText: "Learn more",
        backgroundImage: {
          dimensions: { width: 1375, height: 500 },
          alt: null,
          copyright: null,
          url: "https://images.prismic.io/vish-website/ZkHD5UFLKBtrWzhU_hero.png?auto=format,compress",
          id: "ZkHD5UFLKBtrWzhU",
          edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
        },
      },
      id: "hero$66fcce87-7373-4231-b967-1de3a69c1fef",
      slice_type: "hero",
      slice_label: null,
    },
    {
      variation: "default",
      version: "initial",
      items: [
        {
          art_works: {
            id: "ZkHIThEAAEToUL-S",
            type: "art_work",
            tags: [],
            lang: "en-us",
            slug: "-",
            first_publication_date: "2024-05-13T07:59:36+0000",
            last_publication_date: "2024-05-13T08:02:49+0000",
            uid: "art1",
            link_type: "Document",
            isBroken: false,
          },
        },
        {
          art_works: {
            id: "ZkHIbBEAAPLoUL_H",
            type: "art_work",
            tags: [],
            lang: "en-us",
            slug: "-",
            first_publication_date: "2024-05-13T08:00:18+0000",
            last_publication_date: "2024-05-13T08:03:02+0000",
            uid: "art2",
            link_type: "Document",
            isBroken: false,
          },
        },
      ],
      primary: {
        title: [
          {
            type: "paragraph",
            text: "Work Of Art",
            spans: [],
            direction: "ltr",
          },
        ],
      },
      id: "art_work_list$0ff74d00-3451-4ee8-b9ca-9a365e35dfad",
      slice_type: "art_work_list",
      slice_label: null,
    },
  ],
  meta_title: "VISHWANATH HEDGE",
  meta_description: "VISHWANATH HEDGE",
  meta_image: {
    dimensions: { width: 2400, height: 1260 },
    alt: null,
    copyright: null,
    url: "https://images.prismic.io/vish-website/ZkHD5UFLKBtrWzhU_hero.png?auto=format%2Ccompress&rect=211%2C0%2C952%2C500&w=2400&h=1260",
    id: "ZkHD5UFLKBtrWzhU",
    edit: { x: 211, y: 0, zoom: 1, background: "transparent" },
  },
};

/**
 * @returns {Promise<import("next").Metadata>}
 */
export async function generateMetadata() {
  const client = createClient();
  const page = await client.getByUID("page", "home", {
    fetchLinks: [],
  });

  return {
    title: page.data.title,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title,
      images: [
        {
          url: page.data.meta_image.url,
        },
      ],
    },
  };
}

export default async function Page() {
  const page = await getData();
  return (
    <>
      <SliceZone slices={page.data.slices} components={components} />
    </>
  );
}

async function getData() {
  const client = createClient();
  const page = await client
    .getByUID("page", "home", {
      fetchLinks: [
        "slider.title",
        "slider.list",
        "art_work.title",
        "art_work.size",
        "art_work.material",
        "art_work.full_image",
        "art_work.thumbnail",
        "art_work.description",
      ],
    })
    .catch(() => notFound());
  console.log(JSON.stringify(page, null, 2));
  return page;
}
