import { milanunciosBodyMock } from "../tests/milanuncios.mock";
import { MilanunciosScraper } from "./scrapper";

describe("Milanuncios Scrapper (unit test)", () => {
    it("should return the first article of the page", () => {
        const milanuncios = new MilanunciosScraper(milanunciosBodyMock);
        expect(milanuncios.articles[0]).toStrictEqual({
            id: "480093599",
            titulo: "Las Rozas de Madrid - De Atenas",
            precio: "350.000 €",
            metros: "1051 m²",
            desc: "Ref: JARE-1163. Investment Group10 vende local en planta baja de centro comercial con una superficie de 1051 m², ubicado en Avenida Atenas en la localidad de Las Rozas provincia Madrid. Si necesita mas información no dude en llamarnos al: 617.60. 27.81 // 825.93. 36.75 ¡ESTAREMOS ENCANTADOS DE ATENDERL@S! (También atendemos vía WhatsApp).",
        });
    });
});
