import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js";
import { generateNanoId } from "../utils/helper.js";

export const createShortUrlWithoutUser= async (url) => {
    const shortUrl=generateNanoId(7)
    if(!shortUrl) 
        throw new Error("Short URL not generated")
    await saveShortUrl(shortUrl,url)
    return shortUrl
}
export const createShortUrlWithUser = async (url, userId, slug = null) => {
  const shortUrl = slug || generateNanoId(7);

  if (slug) {
    const exists = await getCustomShortUrl(slug);
    if (exists) throw new Error("This custom url already exist");
  }

  await saveShortUrl(shortUrl, url, userId);
  return shortUrl;
};
