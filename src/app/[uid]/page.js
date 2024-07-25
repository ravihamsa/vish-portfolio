import { notFound } from "next/navigation";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import * as prismic from "@prismicio/client";
import dynamic from "next/dynamic";
import prismicData from "@/data/data.json";

const ActiveLink = dynamic(() => import("@/components/ActiveLink"));
const InfoIcon = (
  <svg
    width="49"
    height="37"
    viewBox="0 0 49 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24.5 2L2 35.9623H47L24.5 2Z" stroke="#444444" strokeWidth="2" />
    <path
      d="M25.9718 12.4937L25.619 25.4647H22.3084L21.9466 12.4937H25.9718ZM23.9637 31.2537C23.3667 31.2537 22.8542 31.0426 22.426 30.6205C21.9979 30.1924 21.7868 29.6798 21.7929 29.0828C21.7868 28.4919 21.9979 27.9853 22.426 27.5632C22.8542 27.1411 23.3667 26.93 23.9637 26.93C24.5366 26.93 25.0401 27.1411 25.4743 27.5632C25.9085 27.9853 26.1286 28.4919 26.1346 29.0828C26.1286 29.4808 26.0231 29.8456 25.818 30.1773C25.619 30.5029 25.3567 30.7653 25.0311 30.9643C24.7055 31.1572 24.3497 31.2537 23.9637 31.2537Z"
      fill="#444444"
    />
  </svg>
);

/**
 * @typedef {{ uid: string }} Params
 */

/**
 * @param {{ params: Params }}
 * @returns {Promise<import("next").Metadata>}
 */
export async function generateMetadata({ params }) {
  const client = createClient();
  const page = await client
    .getByUID("page", params.uid)
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

const workOfArtsRoutes = [
  "work-of-art",
  "work-of-art-page-2023",
  "work-of-art-page-older",
];

const PageHeader = async ({ params, title }) => {
  const client = createClient();
  let subNav = { data: { links: [] } };
  if (workOfArtsRoutes.includes(params.uid)) {
    subNav = await client.getSingle("art_work_navigation");
  }
  const showPipe = subNav.data.links.length > 0;
  return (
    <div className="container m-auto max-w-6xl px-6 mt-5">
      <div className="flex flex-wrap justify-start">
        <div className="flex items-center w-full md:w-auto mb-2 md:mb-0">
          <h1 className="font-semibold uppercase mr-5 text-xl md:text-2xl">
            {title}
          </h1>
          {showPipe && <span className="hidden md:visible">|</span>}
        </div>
        <nav className="md:ml-5">
          <ul className="flex flex-wrap gap-6 md:gap-10 h-full items-end">
            {subNav.data?.links.map((item) => (
              <li
                key={prismic.asText(item.label)}
                className="text-base tracking-tight text-primary hover:text-slate-600 transition-colors duration-200 underline-offset-4 [&_.active]:underline [&_.active]:text-slate-800 align-bottom mb-1"
              >
                <ActiveLink href={prismic.asLink(item.link)}>
                  {prismic.asText(item.label)}
                </ActiveLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

/**
 * @param {{ params: Params }}
 */
export default async function Page({ params }) {
  const client = createClient();
  const page = await client
    .getByUID("page", params.uid, {
      fetchLinks: [
        "slider.title",
        "slider.list",
        "ux_design.uid",
        "ux_design.title",
        "ux_design.full_image",
        "ux_design.description",
        "ux_design.thumbnail",
        "ux_design.link",
        "art_work.uid",
        "art_work.title",
        "art_work.size",
        "art_work.material",
        "art_work.full_image",
        "art_work.thumbnail",
        "art_work.description",
      ],
    })
    .catch(() => notFound());

  const title = asText(page.data.title);
  if (params.uid === "ux-design-protected") {
    return (
      <>
        <PageHeader params={params} title={title} />
        <div className="container m-auto max-w-6xl px-6 mt-5 h-[500px] flex justify-center">
          <div className="flex flex-col gap-4 h-full justify-center items-center ">
            <div className="flex gap-4 items-end">
              {InfoIcon}
              <h2 className="text-2xl font-semibold text-nowrap">
                Password protected
              </h2>
            </div>
            <input
              className={"border-2 border-black/60 w-full p-3"}
              placeholder="Enter password"
              type="password"
            />
            <button className="w-full bg-primary text-white text-2xl p-3">
              ENTER
            </button>
            <div>
              Request password:{" "}
              <a href="mailto:vinahe@gmail.com">vinahe@gmail.com</a>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <PageHeader params={params} title={title} />
      <SliceZone slices={page.data.slices} components={components} />
    </>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("page", {});
  return pages.map((page) => {
    return { uid: page.uid };
  });
}
