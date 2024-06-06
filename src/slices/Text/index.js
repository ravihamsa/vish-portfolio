import clsx from "clsx";

import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";

const Text = ({ slice }) => {
  return (
    <Bounded
      as="section"
      yPadding="sm"
      className="bg-white leading-relaxed mx-6"
    >
      <div
        className={clsx(
          slice.variation === "twoColumns" && "md:columns-2 md:gap-6",
        )}
      >
        <div className="px-6">
          <PrismicRichText field={slice.primary.text} />
        </div>
      </div>
    </Bounded>
  );
};

export default Text;
