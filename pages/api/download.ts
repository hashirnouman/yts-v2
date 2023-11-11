import type { NextApiRequest, NextApiResponse } from "next";
import ytdl, { videoFormat } from "ytdl-core";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const link = req.query.link as string | undefined;
    const quality = (req.query.quality as string | undefined) || "highest";
    const format = req.query.format as string | undefined;

    // Validation
    if (!link) {
      throw new Error('Missing "link" query parameter.');
    }

    const info = await ytdl.getInfo(link);

    // Combine conditions for better readability
    if (!link || !info) {
      throw new Error('Missing "link" or invalid video information.');
    }

    // File extension determination
    const fileExtension =
      format === "mp4" ? "mp4" : format === "mp3" ? "mp3" : null;
    if (!fileExtension) {
      throw new Error("Unsupported format.");
    }

    // Set content disposition header
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${info.videoDetails.title}.${fileExtension}"`
    );

    // Handle different formats
    if (format === "mp4") {
      const formats = ytdl.filterFormats(info.formats, "audioandvideo");
      const selectedFormat: videoFormat | undefined = formats.find(
        (f) => f.qualityLabel === quality
      );

      if (!selectedFormat) {
        throw new Error(`No format with quality label "${quality}" found.`);
      }

      ytdl(link, { format: (selectedFormat as any).format_id }).pipe(res);
    } else if (format === "mp3") {
      // Handle mp3 format
      ytdl(link, { format: "mp3" as any, filter: "audioonly" }).pipe(res);
    } else {
      throw new Error("Unsupported format.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Could not process the request: ${error}` });
  }
}
