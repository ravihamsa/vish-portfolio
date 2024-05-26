"use client";
import { components } from "@/slices";
import { PrismicLink, PrismicRichText, SliceZone } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { useState } from "react";

const ArtWorkModal = ({ art, onNext, onPrev, onClose }) => {
  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-10"
        onClick={onClose}
      ></div>
      <div className="fixed top-0 left-0 w-full z-10 pointer-events-none p-4 lg:p-20 flex justify-center">
        <div className="bg-white p-4 lg:p-8 z-20 pointer-events-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1 lg:col-span-2 ">
              <PrismicNextImage
                field={art.full_image}
                className="w-[345px] md:w-[500px] lg:w-[800px] h-full object-contain"
              />
            </div>
            <div className="relative col-span-1">
              <div className="w-full flex justify-between py-4">
                <button
                  onClick={onPrev}
                  disabled={onPrev === null}
                  className="disabled:opacity-0"
                >
                  <svg
                    width="18"
                    height="15"
                    viewBox="0 0 18 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 1L1.5 7.5L8 14"
                      stroke="#7F7F7F"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="2"
                      y1="7.25"
                      x2="18"
                      y2="7.25"
                      stroke="#7F7F7F"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>
                <button
                  onClick={onNext}
                  disabled={onNext === null}
                  className="disabled:opacity-0"
                >
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5 1L17 7.5L10.5 14"
                      stroke="#7F7F7F"
                      strokeWidth="1.5"
                    />
                    <line
                      y1="-0.75"
                      x2="16"
                      y2="-0.75"
                      transform="matrix(-1 0 0 1 16.5 8)"
                      stroke="#7F7F7F"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>
              </div>
              <div className="font-base">
                <h1 className="text-2xl font-semibold">
                  <PrismicRichText field={art.title} />
                </h1>
                <br />
                {art.material ? (
                  <div className="mb-8">
                    <strong>Medium:</strong>{" "}
                    <PrismicRichText field={art.material} />
                  </div>
                ) : null}
                {art.size ? (
                  <div className="mb-8">
                    <strong>Size:</strong> <PrismicRichText field={art.size} />
                  </div>
                ) : null}

                {art.link ? (
                  <PrismicLink field={art.link}> Test</PrismicLink>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * @typedef {import("@prismicio/client").Content.SliderSlice} SliderSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SliderSlice>} SliderProps
 * @param {SliderProps}
 */
const Slider = ({ slice }) => {
  const [selectedArt, setSelectedArt] = useState(null);
  const [selectedArtIndex, setSelectedArtIndex] = useState(-1);
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="container m-auto">
        <h1 className="text-xl uppercase m-8">
          <PrismicRichText field={slice.primary.title} />
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 m-8">
          {slice.items.map((item, index) => {
            let art = item.art_work.data;
            if (!art) return null;
            return (
              <div
                key={index}
                className="relative"
                onClick={() => {
                  setSelectedArt(art);
                  setSelectedArtIndex(index);
                }}
              >
                <PrismicNextImage field={art.thumbnail} className="w-full" />
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
      {selectedArt ? (
        <ArtWorkModal
          art={selectedArt}
          onNext={
            selectedArtIndex < slice.items.length - 1
              ? () => {
                  setSelectedArtIndex(selectedArtIndex + 1);
                  setSelectedArt(
                    slice.items[selectedArtIndex + 1].art_work.data,
                  );
                }
              : null
          }
          onPrev={
            selectedArtIndex > 0
              ? () => {
                  setSelectedArtIndex(selectedArtIndex - 1);
                  setSelectedArt(
                    slice.items[selectedArtIndex - 1].art_work.data,
                  );
                }
              : null
          }
          onClose={() => {
            setSelectedArt(null);
            setSelectedArtIndex(-1);
          }}
        />
      ) : null}
    </section>
  );
};

export default Slider;
