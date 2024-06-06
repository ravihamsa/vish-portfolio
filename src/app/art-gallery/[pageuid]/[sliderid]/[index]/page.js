import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { asText } from "@prismicio/client";
import dynamic from "next/dynamic";
import prismicData from "@/data/data.json";

const { pages } = prismicData;

const GalleryNav = dynamic(() => import("@/components/GalleryNav"));

export async function generateMetadata({ params }) {
  const data = await getData(params);
  const { art } = data;
  return {
    title: `${asText(art.title)} | VISHWANATH HEGDE`,
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
  if (!art) {
    return null;
  }
  return (
    <div className="container m-auto max-w-6xl">
      <div className="bg-white p-4 lg:p-8 z-20 pointer-events-auto">
        <GalleryNav nextUrl={nextUrl} prevUrl={prevUrl} />
        <div className="w-full">
          <PrismicNextImage field={art.full_image} className="w-full" />
        </div>
        <div className="font-base mt-10">
          <h1 className="text-2xl font-semibold">
            <PrismicRichText field={art.title} />
          </h1>
          <br />
          {art.material ? (
            <div className="mb-4">
              <strong>Medium:</strong> <PrismicRichText field={art.material} />
            </div>
          ) : null}
          {art.size ? (
            <div className="mb-8">
              <strong>Size:</strong> <PrismicRichText field={art.size} />
            </div>
          ) : null}
          {art.description ? (
            <div className="mb-4">
              <PrismicRichText field={art.description} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

async function getData(params) {
  console.log(params, "params", params.pageuid);
  const resp = pages.find((item) => item.uid === params.pageuid);
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
}

export async function generateStaticParams(params) {
  const sliderPages = [];
  pages.map((page) => {
    const sliderSlices = page.data.slices.filter(
      (item) => item.slice_type === "slider",
    );
    sliderSlices.forEach((sliderSlice) => {
      sliderSlice.items.forEach((item, index) => {
        const art = item.art_work.data;
        const prefix = art && art.material ? "art-gallery" : "ux-gallery";
        sliderPages.push({
          uid: `/${prefix}/${page.uid}/${sliderSlice.id}/${index}`,
        });
      });
    });
  });
  return sliderPages;
}
