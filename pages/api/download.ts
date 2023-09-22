// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import ytdl from "ytdl-core";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const link = req.query.link as string | undefined;
    const quality = (req.query.quality as string | undefined) || "highest";
    const format = req.query.format as string | undefined;

    if (!link) {
      throw new Error('Missing "link" query parameter.');
    }

    const info = await ytdl.getInfo(link);

    if (format === "mp4") {
      const formats = ytdl.filterFormats(info.formats, "audioandvideo");
      let selectedFormat;

      if (quality === "highest") {
        selectedFormat = formats[0];
      } else {
        selectedFormat = formats.find((f) => f.qualityLabel === quality);
      }

      if (!selectedFormat) {
        throw new Error(`No format with quality label "${quality}" found.`);
      }

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${info.videoDetails.title}.mp4"`
      );

      ytdl(link, { format: (format as any).format_id }).pipe(res);
    } else if (format === "mp3") {
      const audioFormats = ytdl.filterFormats(info.formats, "audioonly");

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${info.videoDetails.title}.mp3"`
      );

      ytdl(link, { format: (format as any).format_id }).pipe(res);
    } else {
      throw new Error("Unsupported format.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not process the request" });
  }
}
