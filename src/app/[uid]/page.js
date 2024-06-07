import { notFound } from "next/navigation";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import * as prismic from "@prismicio/client";
import dynamic from "next/dynamic";

const ActiveLink = dynamic(() => import("@/components/ActiveLink"));

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
