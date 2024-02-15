import { Request, Response } from "express";
import { findAll, findFavProvince } from "../services/provinces.services";

export async function find(req: Request, res: Response) {
    try {
        const { page = 1, size = 10, sortDesc = false, province } = req.query;
        if (isNaN(+page) || isNaN(+size)) return res.status(400).send("page/size must be numbers");
        if(province && typeof province !== "string") return res.status(400).send("province must be a string");

        const result = await findAll((+page - 1) * +size, +size, !!sortDesc, province);
        return res.status(200).json({
            page: +page,
            reultsPerPage: +size,
            result: result,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
}

export async function findFavorite(req: Request, res: Response) {
    try {
        return res.status(200).json(await findFavProvince());
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
}
