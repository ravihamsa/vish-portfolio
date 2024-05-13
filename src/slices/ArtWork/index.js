/**
 * @typedef {import("@prismicio/client").Content.ArtWorkSlice} ArtWorkSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ArtWorkSlice>} ArtWorkProps
 * @param {ArtWorkProps}
 */
const ArtWork = ({ slice }) => {
  let data = slice.art_work;
  return (
    <section
      data-slice-type={data.slice_type}
      data-slice-variation={data.variation}
    >
      <img src={data.data.thumbnail.url} />
    </section>
  );
};

export default ArtWork;
