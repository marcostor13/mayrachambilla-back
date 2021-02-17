
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

import { routesConfig } from './users/routes-config';
import { routesConfigNodeMailer } from './nodemailer/routes-config';
import { routesGeneral } from './general/routes-config';
import { routesInvestments } from './investments/routes-config';
import { routesInvestmentsRequest } from './investments-request/routes-config';



const app = express();

app.use(express.json())
app.use(cors({ origin: true }))
routesConfig(app)
routesGeneral(app)
routesConfigNodeMailer(app)
routesInvestments(app)
routesInvestmentsRequest(app)




//LOCAL

const serviceAccount: any = {
    "type": "service_account",
    "project_id": "mayra-chambilla",
    "private_key_id": "2ed71deb845570b562895db0fe1d8aa240165b08",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQca2bGm+AmbKu\nvHYzL72I1YZ8IcW6og34FWdMQHOFT53qTu7Eobs9KOEOOWyFMCEUDsZoMrK/VfLf\nd6NM9Uls3UXpo4rWbOGKEh8o8xgaqiQhzUYpq/W4rmyG+b8viGXZ7/i4jubN8rsl\nFvrEFS0DizotNg+LmCmi2ivS20JcwHZUqZmllH/G3vqzuSAPs/WyQ+y25PO+vbUt\ntbfJ348hhhr+08Sp1/KclK5wAcMUfHckEFCKP1RyNiu7nkAYWnB4K/nfVHPAZ+wo\n1jRt3QpXDVdla+4D9N090Ere83UwN/0iDsRHLHhb4P638Zntsfuz7/O0ANuMIUu3\nF2cY/opxAgMBAAECggEAAJ8WlWm0lAUamKfGVT514QBJ15/1vRxG9bESNyjPU8IL\nDpfNQpgPXsozBq1D/IzflY8h4Xn3XNKf4gApJL1+QICcCoRp5mCEoLlm0YBTPhkg\nNkDZyzfaeFNlc41gmicgHg214EW6yTp2PZN8MSAGCANUikmBYV2+bx05GKCux/NJ\nNLBkix9ZG1TG400KUD9ENPnxBI6uH3gckwNytlJ9Sfv/5pABZ2ZqHvX+UFwod8XV\nB3HfJUnzTNpwWuGH1BnfFFqb7mO2GXxJ2y8uhYcR5Q6QJBrd1bHgON4dGtUZxBEE\n8xwZHRk2kQj75Tbp6h4f191T9uyCux4QylLFu3QL6QKBgQDEfavQMAzP1AqlTMqu\nsa7lIQXovKbRicCn/iTEYR+OrSdaHqVPh4JVC6Up3LBxd4GBPSDl2lznww24roum\nEdaNb4zCpZEIk8P+RKFu8jLkkiXYjY4lF7xCHkanUOA6QcTtaA1Ye2yl4xUPbubq\nydNKW/AuIc8u4kLaGmMa++Z0OQKBgQC8MLY6Lj35Z33EcKS4dHTbr8nEbE/AFwpn\ncxyHuYZI4uBQdldE/F2xMynBKXSBm39SG9ZAvQm5sk7PS17A8nj6n+MDoDsMkgO/\nKE4BtWMFTw/yJluqEqetLJ/yN0tRx944lHjWt0nxfp1QmD5ID5hc/c6FJM9wZYEp\nV8up/ll3+QKBgEErDRj3Vsh3IzC/z1kxRThpQ3R1XT6R2XveJoObUsQXWb3h/CHs\nZ6WdPyIrN7nqUOF0TLzvN3EGmD5wZZCmyeoO3TiRgRC/MXnbeU86tPZqInM4P7S9\nsoqbUAOeJ0ArIA09PW/jP52lOw7rUVr9pT48T+R9AiIimNmNduE0OrLBAoGAeVgn\niChdCb4zmEDR1aYx253jyeXVHpU8viu5T8LO1ZyE6x0DdJYNi77jw4uJdjDfzf/p\nDOFXrgdNTdjZhixS2bfS13mv2ZElHVNNyUg+SyQJsigNnwJcYAuQLsx8ooTvwyfp\nKvoQkckEgv1H24tCwWNekPeFUoIA4Lmdt0UsR3ECgYEAgRVOFApBz7dRb1S63hB1\n6yRON3w7lMhNCVY8ONUSKzoajf0Ml6C97/77Iwl+d1SJiBx7zKEwUxfJ9MXh1SS3\nv/ImOTcdgH8zjbOhrYHXx/i6geUpG+F2z77sL3rFDCkf9r2C7OVlzmDpOmc845fR\nfh27YOn53BsxccjjI+vIjhw=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-ii7md@mayra-chambilla.iam.gserviceaccount.com",
    "client_id": "113675878997060935494",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ii7md%40mayra-chambilla.iam.gserviceaccount.com"
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mayra-chambilla.firebaseio.com"
});





async function main() {
    app.set('port', 3000)
    app.listen(app.get('port'))
    console.log('Server on port ', app.get('port'))
}

main()
export default app




//FUNCTIONS
// import * as functions from 'firebase-functions';
// admin.initializeApp(functions.config().firebase);
// export const webApi = functions.https.onRequest(app);
