import express, { Request, Response } from "express";
import { searchProperty } from "../controllers/milanuncios.controller";
import { find, findFavorite } from "../controllers/provinces.controller";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send("OK");
});

router.get("/milanuncios/properties", searchProperty);

router.get("/provinces", find);
router.get("/provinces/fav", findFavorite);

export default router;
