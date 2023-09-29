import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { getContent } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PortableTextBlock } from "sanity";

const Faq = () => {
  const [content, setContent] = useState<PortableTextBlock[]>([]);
  const router = useRouter();
  const _getContent = async () => {
    getContent(router.asPath.replace("/", "")).then((data) => {
      setContent(data);
      if (typeof window != undefined) {
        console.log(window.location.host);
      }
    });
  };
  useEffect(() => {
    _getContent();
  }, []);
  return (
    <div>
      <Head>
        <title>Faq</title>
      </Head>
      <Navbar />
      <div className="w-full flex justify-center py-[30px] h-screen">
        <div className="w-[80%] bg-white p-[10px] rounded-md text-black">
          {content?.map((item, index) => (
            <PortableText key={index} value={item} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Faq;
