import { Request, Response } from "express";
import { Lucid, Blockfrost, Data } from "lucid-cardano";
import readValidator from "../utils/readValidator";
import { Datum } from "../constants/Datum";

class AssetController {
  async getAssetsFromSmartContract(request: Request, response: Response) {
    try {
      const lucid = await Lucid.new(
        new Blockfrost(
          "https://cardano-preprod.blockfrost.io/api/v0",
          "preprodMLN0qpW8GZENdqNe4ot6pwRLku7hXAF6"
        ),
        "Preprod"
      );
      const validator = await readValidator();

      const contractAddress = lucid.utils.validatorToAddress(validator);
      const scriptAssets = await lucid.utxosAt(contractAddress);

      const assets = scriptAssets.map(function (asset: any, index: number) {
        const datum = Data.from<Datum>(asset.datum, Datum);
        return datum;
      });

      const results = assets.map((asset) => ({
        policyId: asset.policyId,
        assetName: asset.assetName,
        seller: asset.seller,
        author: asset.author,
        price: Number(asset.price),
        royalties: Number(asset.royalties), 
      }));

      response.status(200).json(results);
    } catch (error) {
      console.error("Error in getAssetsFromSmartContract:", error);

      response.status(500).json({
        error: "Internal Server Error",
        message: "An unexpected error occurred while fetching assets.",
      });
    }
  }
}

export default new AssetController();
