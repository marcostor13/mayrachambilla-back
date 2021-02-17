import { Request, Response } from "express";

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'marcostor13@gmail.com',
        pass: 'gsqbceayfquoqxie'
    }
})

export async function send(req: Request, res: Response) {


    const { dest, fromname, from, subject, type, data } = req.body

    const mailOptions = {
        from: `${fromname} <${from}>`,
        to: dest,
        subject: subject,
        html: getHtml(type, data)
    };

    return transporter.sendMail(mailOptions, (erro:any, info:any) => {

        console.log('nodemailer',mailOptions)
        if (erro) {
            return handleError(res, erro.toString())
        }
        return res.status(200).send({ message: 'Mensaje enviado' });
    });   
    
}

function getHtml(type:any, data:any){

    let dat = data

    if (dat && !dat.date){
        dat = JSON.parse(dat)
    }

    switch (type) {
        case '1':            
            return `
                <h1>Mensaje de administración Mayra Chambilla</h1><br>
                <p>Tiene una solicitud de inversión<p>
                <h3 style="margin-top: 10px">Datos</h3>
                <ul>
                    <li><label style="min-width: 250px">Inversionista</label> : ${dat.username}</li>
                    <li><label style="min-width: 250px">Proyecto</label> : ${dat.title}</li>
                             
                </ul>    
                `   
        default:
            return 'Error en el mensaje, por favor contáctenos'

    }

}


function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}
