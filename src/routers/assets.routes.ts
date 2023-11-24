import {Router} from "express"
import assetController from "../controllers/AssetController";

const router = Router();

router.get("/", assetController.getAssetsFromSmartContract)

export default router;