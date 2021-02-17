import { Request, Response } from "express";
import * as admin from 'firebase-admin'

const collection = 'investmentsRequest'

export async function create(req: Request, res: Response) {
    try {       
        const { uid, investmentid, amount } = req.body

        const snapshot = await admin.firestore().collection(collection).where('uid', '==', uid).where('investmentid', '==', investmentid).get()
        if (!snapshot.empty) {
            return res.status(200).send({ message: 'Ya tiene una solicitud para este proyecto' })
        }   
        
        
        const user = await admin.auth().getUser(uid)
        const dataUser = mapUser(user)

        const investment:any = await admin.firestore().collection('investments').doc(investmentid).get()
        const dataInvestment = investment.data()
       

        const data = {
            uid,
            investmentid,
            amount,
            dataUser: dataUser,
            dataInvestment: dataInvestment,
        }

        await admin.firestore().collection(collection).add(data)
        return res.status(200).send({ message: 'OK' })
    } catch (err) {
        return handleError(res, err)
    }
}


function mapUser(user: admin.auth.UserRecord) {
    const customClaims = (user.customClaims || { role: '' }) as { role?: string }
    const role = customClaims.role ? customClaims.role : ''
    return {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        role: role,
        lastSignInTime: user.metadata.lastSignInTime,
        creationTime: user.metadata.creationTime
    }
}



function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}

export async function all(req: Request, res: Response) {    
    const snapshot = await admin.firestore().collection(collection).get()
    if (snapshot.empty) {
        return res.status(200).send([])
    }
    const results: any = [];
    snapshot.forEach((doc) => {
        results.push({
            id: doc.id,
            data: doc.data()
        });
    });
    return res.status(200).json(results);
}

export async function get(req: Request, res: Response) {
    const { id } = req.params
    const snapshot = await admin.firestore().collection(collection).doc(id).get()
    if (!snapshot.exists) {
        return res.status(200).send([])
    }
    return res.status(200).json({
        id: snapshot.id,
        data: snapshot.data(),
    });
}

export async function getByUser(req: Request, res: Response) {
    const { uid } = req.params
    const snapshot = await admin.firestore().collection(collection).get()
    if (snapshot.empty) {
        return res.status(200).send([])
    }
    const results: any = [];
    snapshot.forEach((doc) => {
        const dataCollection = doc.data()
        if (dataCollection.dataUser.uid === uid){
            results.push({
                id: doc.id,
                data: doc.data()
            });
        }
    });
    return res.status(200).json(results);
}

export async function patchState(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { state, amount } = req.body
        const data = {
            state: state,
            amount: amount
        }
        return await admin.firestore().collection(collection).doc(id).update(data).then(_ => {
            return res.status(200).send({ message: 'Estado actualizado' })
        })
    } catch (err) {
        return handleError(res, err)
    }
}

export async function patch(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { data } = req.body
        return await admin.firestore().collection(collection).doc(id).update(data).then(_ => {
            return res.status(200).send({ message: 'Información actualizada' })
        })
    } catch (err) {
        return handleError(res, err)
    }
}

export async function remove(req: Request, res: Response) {
    try {
        const { id } = req.params
        return await admin.firestore().collection(collection).doc(id).delete().then(_ => {
            return res.status(200).send({ message: 'Información eliminada' })
        })
    } catch (err) {
        return handleError(res, err)
    }
}