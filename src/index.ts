import * as dotenv from "dotenv"
import cors from "cors";
import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import configs from "./configs";
import router from "./routers/index.routes";


dotenv.config()
const app: Express = express();


const start = function () {
    if (!process.env.PORT) {
        process.exit(1);
    }

    const PORT: number = parseInt(process.env.PORT as string, 10);

    app.use(cors(configs.corsOptions));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    router(app);
    app.get("/", (request: Request, response: Response) => {
        response.send("Hello")
    })
    app.listen(PORT, function () {
        console.log(`http://localhost:${PORT}`);
    });
};

(function () {
    start();
})();

export default app;