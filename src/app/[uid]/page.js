import { notFound } from "next/navigation";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

/**
 * @typedef {{ uid: string }} Params
 */

/**
 * @param {{ params: Params }}
 * @returns {Promise<import("next").Metadata>}
 */
export async function generateMetadata({ params }) {
  const client = createClient();
  const page = await client
    .getByUID("page", params.uid)
    .catch(() => notFound());
  const settings = await client.getSingle("settings");

  return {
    title: `${asText(page.data.title)} | ${asText(settings.data.siteTitle)}`,
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

/**
 * @param {{ params: Params }}
 */
export default async function Page({ params }) {
  const client = createClient();
  const page = await client
    .getByUID("page", params.uid, {
      fetchLinks: [
        "slider.title",
        "slider.list",
        "ux_design.title",
        "ux_design.full_image",
        "ux_design.description",
        "ux_design.thumbnail",
        "ux_design.link",
        "art_work.title",
        "art_work.size",
        "art_work.material",
        "art_work.full_image",
        "art_work.thumbnail",
        "art_work.description",
      ],
    })
    .catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("page", {
    fetchLinks: [
      "slider.title",
      "slider.list",
      "ux_design.title",
      "ux_design.full_image",
      "ux_design.description",
      "ux_design.thumbnail",
      "ux_design.link",
      "art_work.title",
      "art_work.size",
      "art_work.material",
      "art_work.full_image",
      "art_work.thumbnail",
      "art_work.description",
    ],
  });
  return pages.map((page) => {
    return { uid: page.uid };
  });
}
