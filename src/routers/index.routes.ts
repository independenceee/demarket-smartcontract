import {Express} from "express"
import assetRouter from "./assets.routes";

const router = function (app: Express) {
    app.use("/asset_address", assetRouter)
};

export default router;