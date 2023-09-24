// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import ytdl from "ytdl-core";

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { link } = req.body;
    const resp = await ytdl.getBasicInfo(link);
    const metaInfo = await ytdl.getInfo(link);

    const sizes = metaInfo.formats.map((item) => {
      if (item.hasVideo) {
        let size: number =
          ((item.bitrate as number) *
            ((item.approxDurationMs as unknown as number) / 1000)) /
          8;
        return formatBytes(size);
      }
    });
    res.status(200).json({
      iframe: resp.videoDetails.embed.iframeUrl,
      labels: metaInfo.formats.filter((item) => {
        if (item.hasVideo) {
          return item.qualityLabel;
        }
      }),
      size: sizes.filter((size) => size != null),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not get response" });
  }
}
