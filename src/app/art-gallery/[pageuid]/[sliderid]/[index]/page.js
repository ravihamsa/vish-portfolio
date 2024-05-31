import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { notFound } from "next/navigation";
import { asText } from "@prismicio/client";
import dynamic from "next/dynamic";

const GalleryNav = dynamic(() => import("@/components/GalleryNav"));

export async function generateMetadata({ params }) {
  const client = createClient();
  const page = await client
    .getByUID("page", params.pageuid)
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

export default async function Page({ params }) {
  const data = await getData(params);
  const { prevUrl, nextUrl, art, artIndex } = data;
  return (
    <div className="container m-auto max-w-6xl">
      <div className="bg-white p-4 lg:p-8 z-20 pointer-events-auto">
        <GalleryNav nextUrl={nextUrl} prevUrl={prevUrl} />
        <div className="w-full">
          <PrismicNextImage field={art.full_image} className="w-full" />
        </div>
        <div className="font-base">
          <h1 className="text-2xl font-semibold">
            <PrismicRichText field={art.title} />
          </h1>
          <br />
          {art.material ? (
            <div className="mb-8">
              <strong>Medium:</strong> <PrismicRichText field={art.material} />
            </div>
          ) : null}
          {art.size ? (
            <div className="mb-8">
              <strong>Size:</strong> <PrismicRichText field={art.size} />
            </div>
          ) : null}

          {art.link ? <PrismicLink field={art.link}> Test</PrismicLink> : null}
        </div>
      </div>
    </div>
  );
}

function getData(params) {
  const client = createClient();
  console.log(params, "params", params.pageuid);
  return client
    .getByUID("page", params.pageuid, {
      fetchLinks: [
        "slider.title",
        "slider.list",
        "ux_design.uid",
        "ux_design.title",
        "ux_design.full_image",
        "ux_design.description",
        "ux_design.thumbnail",
        "ux_design.link",
        "art_work.title",
        "art_work.uid",
        "art_work.size",
        "art_work.material",
        "art_work.full_image",
        "art_work.thumbnail",
        "art_work.description",
      ],
    })
    .then((resp) => {
      const { data } = resp;
      const slice = data.slices.find(
        (item) => item.id === decodeURIComponent(params.sliderid),
      );
      const artIndex = +params.index;
      const art = slice.items[artIndex].art_work.data;
      const nextUrl =
        artIndex < slice.items.length - 1
          ? `/art-gallery/${params.pageuid}/${params.sliderid}/${artIndex + 1}`
          : null;

      const prevUrl =
        artIndex > 0
          ? `/art-gallery/${params.pageuid}/${params.sliderid}/${artIndex - 1}`
          : null;
      return {
        prevUrl,
        nextUrl,
        art,
        artIndex,
      };
    })
    .catch((e) => {
      console.log(e);
      return <div>ravi</div>;
    });
}
