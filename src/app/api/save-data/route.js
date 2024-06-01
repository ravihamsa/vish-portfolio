import { createClient } from "@/prismicio";
import { NextResponse } from "next/server";
import fs from "fs";
import { resolve } from "path";

export async function GET(request) {
  const filePath = resolve("src/data/pages.json");
  const client = createClient();
  const pages = await client.getAllByType("page", {
    fetchLinks: [
      "slider.title",
      "slider.list",
      "ux_design.uid",
      "ux_design.title",
      "ux_design.full_image",
      "ux_design.description",
      "ux_design.thumbnail",
      "ux_design.link",
      "art_work.title",
      "art_work.uid",
      "art_work.size",
      "art_work.material",
      "art_work.full_image",
      "art_work.thumbnail",
      "art_work.description",
    ],
  });
  console.log(filePath);
  fs.writeFileSync(filePath, JSON.stringify(pages));
  return NextResponse.json(pages);
}
