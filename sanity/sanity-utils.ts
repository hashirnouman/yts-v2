import { PortableTextBlock } from "sanity";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: "359951dg",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false,
});
interface IGetLocale {
  lang: string;
}
export const getLocale = async (data: IGetLocale) => {
  const query = `*[_type=='locale' && language==$lang  ]{key,value}`;
  const result = await client.fetch(query, { lang: data.lang });
  return result;
};

export type Content = {
  content: PortableTextBlock[];
};
export const getContent = async (page: string) => {
  const query = `*[_type == "Content" && page == $page].content`;
  const result = await client.fetch(query, { page: page });
  return result;
};
