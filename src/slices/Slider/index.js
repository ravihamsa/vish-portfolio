import { PrismicLink, PrismicRichText } from "@prismicio/react";
import dynamic from "next/dynamic";
import { asText } from "@prismicio/client";

const ArtLink = dynamic(() => import("@/components/ArtLink"));

/**
 * @typedef {import("@prismicio/client").Content.SliderSlice} SliderSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SliderSlice>} SliderProps
 * @param {SliderProps}
 */
const Slider = ({ slice }) => {
  const titleText = asText(slice.primary.title);
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-12"
    >
      <div className="container m-auto max-w-6xl">
        {titleText !== "" && (
          <div className="flex items-center gap-x-4 m-6 my-8">
            <h1 className="text-2xl font-semibold">
              <PrismicRichText field={slice.primary.title} />
            </h1>
            <span>|</span>
            <PrismicLink field={slice.primary.more_link}>
              {"More >"}
            </PrismicLink>
          </div>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 m-6">
          {slice.items.map((item, index) => {
            let art = item.art_work.data;
            if (!art) return null;
            return (
              <div key={index} className="relative">
                <ArtLink art={art} slice={slice} index={index} />
                <div className="w-full text-d-gray mb-3">
                  <h1 className="font-semibold">
                    <PrismicRichText field={art.title} />
                  </h1>
                  <PrismicRichText field={art.material} />
                  <PrismicRichText field={art.size} />
                  {art.link ? (
                    <PrismicLink field={art.link}> Test</PrismicLink>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Slider;
