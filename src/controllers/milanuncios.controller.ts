import { Request, Response } from "express";
import { searchPropertyByProvince } from "../services/milanuncios.service";

export async function searchProperty(req: Request, res: Response) {
    try {
        const { province } = req.query;
        if (typeof province !== "string") return res.status(400).send("province must be a string");

        const properties = await searchPropertyByProvince(province);
        if(properties.length === 0) return res.status(404).send("No se ha encontrado ningun inmueble");

        return res.status(201).json(properties[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
}
