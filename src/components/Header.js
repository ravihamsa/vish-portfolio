import * as prismic from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

import { Bounded } from "./Bounded";
import Image from "next/image";
import dynamic from "next/dynamic";
import prismicData from "@/data/data.json";

const { settings, navigation } = prismicData;

const ActiveLink = dynamic(() => import("@/components/ActiveLink"));

export async function Header() {
  return (
    <Bounded as="header" yPadding="sm">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 leading-none ">
        <PrismicNextLink
          href="/"
          className="text-xl tracking-tight flex items-center gap-2 tex text-slate-800"
        >
          <Image
            src={"/assets/images/logo.png"}
            alt="Logo"
            width={32}
            height={50}
          />
          <PrismicText field={settings.data.siteTitle} />
        </PrismicNextLink>
        <nav>
          <ul className="flex flex-wrap gap-6 md:gap-10">
            {navigation.data?.links.map((item) => (
              <li
                key={prismic.asText(item.label)}
                className="tracking-tight text-primary hover:text-slate-600 transition-colors duration-200 underline-offset-4 [&_.active]:underline [&_.active]:text-slate-800"
              >
                <ActiveLink href={prismic.asLink(item.link)}>
                  {prismic.asText(item.label)}
                </ActiveLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Bounded>
  );
}
