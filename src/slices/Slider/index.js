import { components } from "@/slices";
import { PrismicLink, PrismicRichText, SliceZone } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.SliderSlice} SliderSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SliderSlice>} SliderProps
 * @param {SliderProps}
 */
const Slider = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div>
        <h1 className="text-xl uppercase mb-2">
          <PrismicRichText field={slice.primary.title} />
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {slice.items.map((item, index) => {
            let art = item.art_work.data;
            if (!art) return null;
            return (
              <div key={index} className="relative">
                <PrismicNextImage field={art.thumbnail} />
                <div className="w-full h-full text-d-gray mb-3">
                  <PrismicRichText field={art.title} />
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
