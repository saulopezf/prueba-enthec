import Property, { PropertyModel } from "../models/Property";
import { sessionId } from "../utils/session";

/*
    Busca en la colección "properties" filtrando por sessionId y province (si viene definida)
    Ordena por "createdAt" (timestamp)
    Pagina gracias al "skip" y "pageSize"
*/
export async function findAll(skip: number, pageSize: number, sortDesc: boolean, province?: string) {
    let query: { sessionId: string, province?: string } = { sessionId }
    if(province)
        query.province = province

    return await Property.find(query)
        .sort({ createdAt: sortDesc ? -1 : 1 })
        .skip(skip)
        .limit(pageSize);
}

/*
    Busca en la colección "properties" el id del inmueble (property.id) que mas se repite para determinar cual es su favorito
*/
export async function findFavProvince() {
    return (
        await Property.aggregate<PropertyModel>([
            {
                $match: {
                    sessionId
                }
            },
            {
                $group: {
                    _id: "$property.id",
                    count: { $sum: 1 },
                    documents: { $push: "$$ROOT" },
                },
            },
            {
                $sort: {
                    count: -1,
                },
            },
            {
                $limit: 1,
            },
            {
                $unwind: "$documents",
            },
            {
                $replaceRoot: { newRoot: "$documents" },
            },
        ])
    )[0];
}
