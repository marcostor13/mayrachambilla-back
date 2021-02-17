import { Application } from "express"
import { create, all, get, patch, remove, patchState, getByUser } from "./controller";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";

export function routesInvestmentsRequest(app: Application) {

app.post('/investments-request',
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'] }),
    create
);

app.get('/investments-request', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'] }),
    all
]);

app.get('/investments-request/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'], allowSameUser: true }),
    get
]);

app.get('/investments-request-by-user/:uid', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'], allowSameUser: true }),
    getByUser
]);

app.patch('/investments-request-update-state/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'] }),
    patchState
]);

app.patch('/investments-request/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'] }),
    patch
]);

app.delete('/investments-request/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'] }),
    remove
])

}


