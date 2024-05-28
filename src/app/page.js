import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

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
  console.log(JSON.stringify(page, null, 2));
  return page;
}
