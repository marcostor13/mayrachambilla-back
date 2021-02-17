import { Application } from "express"
import { create, all, get, patch, remove, getByUID } from "./controller";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";

export function routesGeneral(app: Application) {

app.post('/general/:collection',
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'] }),
    create
);

app.get('/general/:collection', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'] }),
    all
]);

app.get('/general/:collection/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'], allowSameUser: true }),
    get
]);

app.get('/general/:collection/uid/:uid', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'], allowSameUser: true }),
    getByUID
]);

app.patch('/general/:collection/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'] }),
    patch
]);

app.delete('/general/:collection/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'] }),
    remove
])

}


