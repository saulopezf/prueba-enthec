import { Request, Response } from "express";
import { searchPropertyByProvince } from "../services/milanuncios.service";

export async function searchProperty(req: Request, res: Response) {
    try {
        const { province } = req.query;
        if (typeof province !== "string") return res.status(400).send();

        return res.status(201).json(await searchPropertyByProvince(province));
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
}
