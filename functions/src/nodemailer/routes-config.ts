import { Application } from "express";
import { send } from "./controller";

export function routesConfigNodeMailer(app: Application) {
    app.post('/nodemailer',
        send
    );
    
}