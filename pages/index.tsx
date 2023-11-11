import DownloadSection from "@/components/home/DownloadSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLocale } from "@/context/LocaleContent";
import axios from "axios";
import { useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const { t } = useLocale();
  return (
    <>
      <Head>
        <title>Yts1</title>
      </Head>
      <Navbar />
      <main className="flex flex-col item-center">
        <div className="mt-[50px] flex justify-center">
          <DownloadSection />
        </div>
        <section className="text-center text-midnight-blue font-ariel mt-[50px]">
          <p className=" text-[20px] lg:text-[25px]"></p>
          <p className=" text:[14px] lg:text-[18px]">
            {/* {translationObj.value} */}
            {/* It&apos;s so simple, you can download your videos and audios in
            three easy steps */}
          </p>
        </section>
        <section className="  flex flex-col lg:flex-row justify-around my-[50px] px-[10px] lg:px-0">
          <div className="flex text-midnight-blue  items-center gap-[15px] ">
            <p className="text-sea-green font-garet text-[45px]">1</p>
            <p className="max-w-[300px]  ">
              {t(
                "SEARCH_BY_NAME" ||
                  " Search by name or directly paste the link of video you want to convert"
              )}
            </p>
          </div>
          <div className="flex text-midnight-blue items-center gap-[15px] ">
            <p className="text-bright-yellow font-garet  text-[45px]">2</p>
            <p className="max-w-[300px]  ">
              Search by name or directly paste the link of video you want to
              convert
            </p>
          </div>
          <div className="flex text-midnight-blue items-center gap-[15px] ">
            <p className="text-midnight-blue font-garet  font-bold text-[45px]">
              3
            </p>
            <p className=" max-w-[300px]  ">
              Search by name or directly paste the link of video you want to
              convert
            </p>
          </div>
        </section>
        <section>
          <p className="text-center text-midnight-blue text-[17.7px] font-ariel">
            {t(
              "BEST_FEATURES" ||
                "Our youtube downloader converter best features"
            )}
          </p>
          <br />
          <div className="flex flex-col lg:flex-row justify-evenly items-center lg:item-start">
            <div className="flex flex-col items-center max-w-[300px]">
              <img
                src="/images/quick-download.png"
                alt="quick donwload"
                className="w-[40px] object-cover"
              />
              <p className="text-sea-green font-ariel text-[18px]">
                {t("QUICK_EASY_DOWNLOADS") || "Quick & Easy Downloads"}
              </p>
              <p className="text-center text-15px ">
                {t("FULLY_COMPAITABLE") ||
                  "Fully Compatible With all Browsers & Devices"}
              </p>
            </div>

            <div className="flex flex-col items-center max-w-[300px]">
              <img
                src="/images/unlimited-downloads.png"
                alt="quick donwload"
                className="w-[40px] object-cover"
              />
              <p className="text-sea-green font-ariel text-[18px]">
                {t("UNLIMITED_DOWNLOAD") || "Unlimited Downloads"}
              </p>
              <p className="text-center text-15px ">
                {t("UNLIMITED_DOWNLOAD_CONVERSION") ||
                  "Unlimited Downloads & Conversions Registration is not required"}
              </p>
            </div>

            <div className="flex flex-col items-center max-w-[300px]">
              <img
                src="/images/free-downloads.png"
                alt="quick donwload"
                className="w-[40px] object-cover"
              />
              <p className="text-sea-green font-ariel text-[18px]">
                Quick & Easy Downloads
              </p>
              <p className="text-center text-15px ">
                It is free. You can save as many audio, video files as you want.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
