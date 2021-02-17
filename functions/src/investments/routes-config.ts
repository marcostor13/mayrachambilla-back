import { Application } from "express"
import { create, all, get, patch, remove } from "./controller";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";

export function routesInvestments(app: Application) {

app.post('/investments',
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'] }),
    create
);

app.get('/investments', [
    // isAuthenticated,
    // isAuthorized({ hasRole: ['admin'], allowSameUser: true }),
    all
]);

app.get('/investments/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'], allowSameUser: true }),
    get
]);

app.patch('/investments/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'] }),
    patch
]);

app.delete('/investments/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'] }),
    remove
])

}


