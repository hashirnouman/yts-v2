import { NextApiRequest, NextApiResponse } from "next";
import Youtube from "youtube-search";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const opts = {
    maxResults: 10,
    key: process.env.YOUTUBE_API_KEY,
  };

  try {
    Youtube(
      req.query.keyword as string,
      opts,
      function (err: any, results: any) {
        if (err) return console.log(err);
        res.status(200).json({ results });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
}
