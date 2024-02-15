import { HTMLElement, Node, parse } from "node-html-parser";
import { Article } from "../types/article.interface";

export class MilanunciosScraper {
    public readonly htmlBody: string;
    public readonly body: HTMLElement;
    public readonly articles: Article[];

    // La lista de articulos es un <div> con un identificador de clase "ma-AdList"
    private readonly idListadoInmuebles = "ma-AdList";

    // Los articulos son etiquetas <article> con un identificador de clase "ma-AdCardV2"
    private readonly idArticle = "ma-AdCardV2";

    // El id del inmueble solo lo he podido encontrar en el "href" del <a> con identificador de clase  "ma-AdCardListingV2-TitleLink" de cada articulo
    private readonly idIdentificador = "ma-AdCardListingV2-TitleLink";

    // Los demás datos estan en los textos planos de los respectivos elementos html con estos identificadores de clase
    private readonly idTitulo = "ma-AdCardV2-title";
    private readonly idPrecio = "ma-AdPrice-value";
    private readonly idMetros = "ma-AdTag-label";
    private readonly idDescripcion = "ma-AdCardV2-description";

    constructor(htmlBody: string) {
        this.htmlBody = htmlBody;
        this.body = parse(this.htmlBody);
        const articlesNode = this.searchNodeWithClassId(
            this.body,
            this.idListadoInmuebles,
        );
        this.articles = articlesNode ? this.mapArticles(articlesNode) : [];
    }

    private mapArticles(nodeWithArticles: HTMLElement) {
        return nodeWithArticles.childNodes
            .filter<HTMLElement>(
                (articleNode): articleNode is HTMLElement =>
                    articleNode instanceof HTMLElement &&
                    this.nodeHasClassId(articleNode, this.idArticle),
            )
            .map((article) => {
                return {
                    id: this.getIdFromUrl(
                        this.searchNodeWithClassId(
                            article,
                            this.idIdentificador,
                        )?.attributes?.href,
                    ),
                    titulo:
                        this.searchNodeWithClassId(article, this.idTitulo)
                            ?.rawText.trim()
                            .replace(/\s+/g, " ") || null,
                    precio:
                        this.searchNodeWithClassId(article, this.idPrecio)
                            ?.rawText || null,
                    metros:
                        this.searchNodeWithClassId(article, this.idMetros)
                            ?.rawText || null,
                    desc:
                        this.searchNodeWithClassId(article, this.idDescripcion)
                            ?.rawText.trim()
                            .replace(/\s+/g, " ") || null,
                };
            });
    }

    private getIdFromUrl(url: string | undefined): string | null {
        if (!url) return null;
        const urlSplitted = url.split("-");
        return urlSplitted[urlSplitted.length - 1].replace(".htm", "");
    }

    private nodeHasClassId(node: HTMLElement, classId: string) {
        return !!node.classList.value.find((name) => name === classId);
    }

    private searchNodeWithClassId(
        node: HTMLElement | Node,
        id: string,
    ): HTMLElement | null {
        if (!node) return null;
        if (!(node instanceof HTMLElement)) return null;

        if (this.nodeHasClassId(node, id)) {
            return node;
        }

        for (const childNode of node.childNodes) {
            const foundNode = this.searchNodeWithClassId(childNode, id);
            if (foundNode) return foundNode;
        }

        return null;
    }
}
