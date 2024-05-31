import ArtGalleryPage from "@/app/art-gallery/[pageuid]/[sliderid]/[index]/page";
import { createClient } from "@/prismicio";

/**
 * @param {{ params: Params }}
 */
export default ArtGalleryPage;

export async function generateStaticParams(params) {
  const client = createClient();
  const pages = await client.getAllByType("page", {});
  const sliderPages = [];
  pages.map((page) => {
    const sliderSlices = page.data.slices.filter(
      (item) => item.slice_type === "slider",
    );
    sliderSlices.forEach((sliderSlice) => {
      sliderSlice.items.forEach((item, index) => {
        sliderPages.push({
          uid: `/ux-gallery/${page.uid}/${sliderSlice.id}/${index}`,
        });
      });
    });
  });
  return sliderPages;
}
