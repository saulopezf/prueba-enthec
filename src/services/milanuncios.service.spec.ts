import Property from "../models/Property";
import { milanunciosBodyMock } from "../tests/milanuncios.mock";
import { searchPropertyByProvince } from "./milanuncios.service";

// Mock fetch
global.fetch = jest.fn(
    (input: string | URL | globalThis.Request, init?: RequestInit) =>
        Promise.resolve({
            status: 200,
            statusText: "OK",
            headers: [],
            text: () => Promise.resolve(milanunciosBodyMock),
        }),
) as jest.Mock;

// Mock Property model
jest.mock("../models/Property", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => ({
            save: jest.fn(),
        })),
    };
});

describe("Milanuncios Service (integration test)", () => {
    it("should be defined", () => {
        expect(searchPropertyByProvince).toBeDefined();
    });

    it("search, scraps the page, and saves the data", async () => {
        const provinceName = "madrid";
        const articles = await searchPropertyByProvince(provinceName);

        expect(fetch).toHaveBeenCalledWith(
            "https://www.milanuncios.com/inmobiliaria?s=provincia+madrid",
            expect.any(Object),
        );
        expect(Property).toHaveBeenCalledTimes(1);
        expect(Array.isArray(articles)).toBe(true);
        expect(articles[0]).toStrictEqual({
            id: "480093599",
            titulo: "Las Rozas de Madrid - De Atenas",
            precio: "350.000 €",
            metros: "1051 m²",
            desc: "Ref: JARE-1163. Investment Group10 vende local en planta baja de centro comercial con una superficie de 1051 m², ubicado en Avenida Atenas en la localidad de Las Rozas provincia Madrid. Si necesita mas información no dude en llamarnos al: 617.60. 27.81 // 825.93. 36.75 ¡ESTAREMOS ENCANTADOS DE ATENDERL@S! (También atendemos vía WhatsApp).",
        });
    });
});
