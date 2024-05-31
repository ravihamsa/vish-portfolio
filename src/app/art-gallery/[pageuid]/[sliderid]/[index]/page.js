import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { notFound } from "next/navigation";
import { asText } from "@prismicio/client";
import dynamic from "next/dynamic";

const GalleryNav = dynamic(() => import("@/components/GalleryNav"));

export async function generateMetadata({ params }) {
  const data = await getData(params);
  const { art } = data;
  return {
    title: `${asText(art.title)}`,
    description: art.meta_description,
    openGraph: {
      title: art.title,
      images: [
        {
          url: art.full_image.url,
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
      const prefix = art.material ? "art-gallery" : "ux-gallery";
      const nextUrl =
        artIndex < slice.items.length - 1
          ? `/${prefix}/${params.pageuid}/${params.sliderid}/${artIndex + 1}`
          : null;

      const prevUrl =
        artIndex > 0
          ? `/${prefix}/${params.pageuid}/${params.sliderid}/${artIndex - 1}`
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

export async function generateStaticParams(params) {
  const client = createClient();
  const pages = await client.getAllByType("page", {
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
  });
  const sliderPages = [];
  pages.map((page) => {
    const sliderSlices = page.data.slices.filter(
      (item) => item.slice_type === "slider",
    );
    sliderSlices.forEach((sliderSlice) => {
      sliderSlice.items.forEach((item, index) => {
        const art = item.art_work.data;
        const prefix = art.material ? "art-gallery" : "ux-gallery";
        sliderPages.push({
          uid: `/${prefix}/${page.uid}/${sliderSlice.id}/${index}`,
        });
      });
    });
  });
  return sliderPages;
}