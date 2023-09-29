import { useLocale } from "@/context/LocaleContent";
import { useDebounce } from "@/hooks/useDebounce";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import {
  ILabels,
  IResult,
  IVideoDetailsResponse,
  searchData,
  videoDetails,
} from "@/services/viewDetails";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { BiLoader } from "react-icons/bi";
import { BsVolumeMuteFill } from "react-icons/bs";
const DownloadSection = () => {
  const { t } = useLocale();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [data, setData] = useState<IVideoDetailsResponse | null>();
  const [formats, setFormats] = useState<ILabels[]>();
  const [option, showOptions] = useState(false);
  const ref = useOutsideClick(() => showOptions(false));
  const [label, setLabel] = useState<ILabels>();
  const [sizes, setSizes] = useState<string[]>([]);
  const [searchResponse, setSearchResponse] = useState<IResult[]>([]);
  const [isError, setError] = useState(false);
  const getVideoDetails = (link: string) => {
    videoDetails(link).then((response) => {
      if (response?.data.error) {
        setLoading(false);
        setError(true);
        setData(null);
        return;
      }

      setFormats(response?.data?.labels);
      setLabel(response?.data?.labels[0]);
      setData(response?.data);
      setSizes(response?.data?.sizes || []);
      setError(false);
      setLoading(false);
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.length == 0) {
      return;
    }
    setLoading(true);
    setError(false);
    const link = searchTerm.trim();
    getVideoDetails(link);
  };

  const debouncedTerm = useDebounce(searchTerm);
  const search = async () => {
    if (searchTerm.length == 0) {
      setSearchResponse([]);
      return;
    }
    setData(null);
    searchData(searchTerm).then((data) => {
      setSearchResponse(data?.results || []);
    });
  };
  const download = async (format: string) => {
    const link = searchTerm.trim();
    if (format == "mp3") {
      router.push(
        `https://yts-v2.vercel.app/api/download?link=${link}&format=mp3&quality=highest`
      );
    } else
      router.push(
        `https://yts-v2.vercel.app/api/download?link=${searchTerm}&format=${format}&quality=${label?.qualityLabel}`
      );
  };
  // useEffect(() => {
  //   search();
  // }, [debouncedTerm]);
  return (
    <div className="w-full flex flex-col items-center gap-[10px]">
      <section className="w-[90%] lg:w-[60%] rounded-[10px] shadow-lg py-[30px] flex flex-col items-center bg-white h-full gap-[15px] text-midnight-blue">
        <h1 className="text-[14px] lg:text-[25px] font-ariel ">
          {t("YOUTUBE_CONVERTER_DOWNLOADER") ||
            "Youtube Downloader - Youtube Converter"}
        </h1>
        <p className="text-center  text-[12px] lg:text-[14px]">
          {t("CONVERT_DOWNLOAD_FORMATS") ||
            "Download and Convert Youtube Videos in MP3, MP4, MKV, 3GP, & many more formats."}
        </p>
        <form
          className="flex border-midnight-blue border-[5px] font-normal rounded-[5px] w-[90%] lg:w-[70%] justify-center h-[60px]"
          dir="ltr"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="search"
            placeholder={t(
              "SEARCH_PASTE_LINK" || "Search or paste video link here"
            )}
            className="w-full h-full outline-none px-[5px] bg-grey-base-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="w-[25%] h-full font-ariel gap-[5px] flex items-center justify-center text-white lg:text-[15px] bg-midnight-blue"
            type="submit"
          >
            <span className="hidden  lg:block">
              {t("DOWNLOAD" || "Download")}
            </span>
            <div className="min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px]">
              <img src="/images/download-icon.png" alt="download" />
            </div>
          </button>
        </form>
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
      {isError && (
        <p className="text-vivid-red text-[12px]">Video unavailable</p>
      )}
      {!loading ? (
        <>
          {data && (
            <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:items-start gap-[20px]">
              <div>
                <iframe src={data?.iframe} className="rounded"></iframe>
              </div>
              <div>
                <div className="flex w-[120px]  flex-col gap-[10px]">
                  <div className="outline-none w-full h-[30px] relative">
                    <div
                      className="bg-white rounded cursor-pointer flex px-[5px] gap-[20px] items-center"
                      onClick={() => showOptions(!option)}
                    >
                      {label?.qualityLabel}
                      {!label?.hasAudio && <BsVolumeMuteFill />}
                    </div>
                    {option && (
                      <div
                        className="rounded bg-midnight-blue  max-h-[140px] overflow-y-auto"
                        ref={ref}
                      >
                        {formats &&
                          formats
                            .sort((a, b) => {
                              if (a.hasAudio === b.hasAudio) {
                                return 0;
                              } else if (a.hasAudio) {
                                return -1;
                              } else {
                                return 1;
                              }
                            })
                            ?.map((video, index) => (
                              <>
                                <div
                                  className="  h-[30px] hover:bg-white   text-white hover:text-midnight-blue cursor-pointer flex items-center gap-[20px] "
                                  key={index}
                                  onClick={() => setLabel(video)}
                                >
                                  {video.qualityLabel}

                                  {!video.hasAudio ? (
                                    <BsVolumeMuteFill />
                                  ) : null}
                                </div>
                              </>
                            ))}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  className="w-[120px] bg-white text-black rounded"
                  onClick={() => {
                    download("mp3");
                  }}
                >
                  download in mp3
                </button>
              </div>
            </div>
          )}
          {searchResponse && (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-[20px] ">
              {searchResponse.map((data, index) => (
                <div
                  key={index}
                  className="w-[200px] h-[180px] rounded flex flex-col items-center bg-white px-[5px]"
                >
                  <div className="w-full h-[130px] rounded">
                    <img
                      src={data.thumbnails.high.url}
                      alt="thumbnail"
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="w-[90px] truncate">{data.title}</div>
                  <button
                    className="bg-vivid-red w-[90px] rounded text-white h-[20px]"
                    onClick={() => getVideoDetails(data.link)}
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="animate-spin">
          <BiLoader size={40} className="text-vivid-red" />
        </div>
      )}
    </div>
  );
};

export default DownloadSection;
