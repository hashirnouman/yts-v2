import { NextApiRequest, NextApiResponse } from "next";
import Youtube from "youtube-search";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const opts = {
    maxResults: 10,
    key: "AIzaSyDL6YwYPRDJWie5RnV-KaqNGuLvpg2Si_4",
  };

  try {
    Youtube(req.query.keyword as string, opts, function (err, results) {
      if (err) return console.log(err);

      res
        .status(200)
        .json(results?.filter((result) => result.kind != "youtube#channel"));
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
}
