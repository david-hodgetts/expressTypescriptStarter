import express, { Application, Request, Response } from "express";

export const app: Application = express();
const port = 3000;

app.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res.json("hello world");
});

try {
    app.listen(port, (): void => {
        console.log(`server running on port ${port}`);
    });
} catch (error:any) {
    console.error(`server init failed: ${error.message}`);
}
