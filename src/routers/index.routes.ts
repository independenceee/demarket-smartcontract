import { Express } from "express"
import assetRouter from "./assets.routes";

const router = function (app: Express) {
    app.use("/asset_smartcontract", assetRouter)
};

export default router;