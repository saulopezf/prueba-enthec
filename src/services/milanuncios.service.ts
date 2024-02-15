import Property from "../models/Property";
import { Article } from "../types/article.interface";
import { MilanunciosScraper } from "../utils/scrapper";
import { sessionId } from "../utils/session";
import { userAgents } from "../utils/user-agents";

const baseUrl = "https://www.milanuncios.com/inmobiliaria";
const method = "GET";

export async function searchPropertyByProvince(
    provinceName: string,
): Promise<Article> {
    const params = new URLSearchParams();
    params.append("s", `provincia ${provinceName}`);

    const url = new URL(baseUrl);
    url.search = params.toString();

    // User-Agent random porque milanuncios detectaba que era un robot al hacer varias llamadas seguidas
    const response = await fetch(url.toString(), {
        method,
        headers: [
            [
                "User-Agent",
                userAgents[Math.floor(Math.random() * userAgents.length)],
            ],
            [
                "Accept-Encoding",
                "gzip, deflate, br"
            ]
        ],
    });
    const milanuncios = new MilanunciosScraper(await response.text());

    const newRecord = new Property({
        url: url.toString(),
        method,
        statusHttp: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers),
        province: provinceName,
        property: milanuncios.articles[0],
        sessionId,
        createdAt: Date.now(),
    });
    newRecord.save();

    return milanuncios.articles[0];
}
