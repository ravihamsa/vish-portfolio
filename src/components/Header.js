"use client";
import * as prismic from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

import { Bounded } from "./Bounded";
import Image from "next/image";
import { createClient } from "@/prismicio";
import { usePathname, useRouter } from "next/navigation";

export function ActiveLink({ children, href }) {
  const router = useRouter();
  const pathName = usePathname();
  const className = pathName === href ? "active" : "";
  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

export async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const navigation = await client.getSingle("navigation");
  return (
    <Bounded as="header" yPadding="sm">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 leading-none ">
        <PrismicNextLink
          href="/"
          className="text-xl font-light tracking-tight flex items-center gap-2 tex text-slate-800"
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
                className="font-light tracking-tight text-primary hover:text-slate-600 transition-colors duration-200 underline-offset-4 [&_.active]:underline [&_.active]:text-slate-800"
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
