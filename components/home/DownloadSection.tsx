import { useLocale } from "@/context/LocaleContent";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
interface IGetDetailsFormat {
  iframe: string;
}
const DownloadSection = () => {
  const { t } = useLocale();
  const [url, setUrl] = useState("");
  const router = useRouter();
  const getDetails = async () => {
    if (url.length == 0) {
      return;
    }
    const link = url.trim();
    const response = await axios.post("/api/view", { link });
    console.log(response.data);
  };
  const download = async () => {
    router.push(
      "http://localhost:3000/api/download?link=https://www.youtube.com/watch?v=otf7IgEJbU4&format=mp3&quality=highest"
    );
  };

  return (
    <section className="w-[90%] lg:w-[60%] rounded-[10px] shadow-lg py-[30px] flex flex-col items-center bg-white h-full gap-[15px] text-midnight-blue">
      <h1 className="text-[14px] lg:text-[25px] font-ariel ">
        {t("YOUTUBE_CONVERTER_DOWNLOADER") ||
          "Youtube Downloader - Youtube Converter"}
      </h1>
      <p className="text-center  text-[12px] lg:text-[14px]">
        {t("CONVERT_DOWNLOAD_FORMATS")}
      </p>
      <div
        className="flex border-midnight-blue border-[5px] font-normal rounded-[5px] w-[90%] lg:w-[70%] justify-center h-[60px]"
        dir="ltr"
      >
        <input
          type="search"
          placeholder={t(
            "SEARCH_PASTE_LINK" || "Search or paste video link here"
          )}
          className="w-full h-full outline-none px-[5px] bg-grey-base-200"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className="w-[25%] h-full font-ariel gap-[5px] flex items-center justify-center text-white lg:text-[15px] bg-midnight-blue"
          onClick={download}
        >
          <span className="hidden  lg:block">
            {t("DOWNLOAD" || "Download")}
          </span>
          <div className="min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px]">
            <img src="/images/download-icon.png" alt="download" />
          </div>
        </button>
      </div>
      <p className="w-full text-center text-[12px] lg:text-[14px]">
        {t("BY_USING_OUR" || "By using our service you are accepting our")}
        &nbsp;
        <Link href="/privacy-policy" className="mx-[1px] text-blue-500">
          Privacy Policy
        </Link>
        &nbsp; {t("AND") || "and"} &nbsp;
        <Link href="terms-of-service" className="text-blue-500">
          Terms of Use.
        </Link>
      </p>
    </section>
  );
};

export default DownloadSection;
