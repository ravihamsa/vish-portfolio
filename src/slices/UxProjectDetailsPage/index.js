/**
 * @typedef {import("@prismicio/client").Content.UxProjectDetailsPageSlice} UxProjectDetailsPageSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<UxProjectDetailsPageSlice>} UxProjectDetailsPageProps
 * @param {UxProjectDetailsPageProps}
 */
const UxProjectDetailsPage = ({ slice }) => {
  console.log({ slice });
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for ux_project_details_page (variation:{" "}
      {slice.variation}) Slices
    </section>
  );
};

export default UxProjectDetailsPage;
