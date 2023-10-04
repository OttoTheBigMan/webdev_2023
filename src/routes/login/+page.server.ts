import { fail, redirect } from '@sveltejs/kit';
import {PrismaClient} from "@prisma/client"
import type { Actions, PageServerLoad } from './$types';
import * as crypto from "crypto";


const prisma = new PrismaClient();

export const load = (async ({cookies}) => {
    let username = cookies.get("username");
    if(username){
        throw redirect(303, "/")
    }
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    login: async ({request, cookies}) => {
        let data = await request.formData();
        let userName = data.get("username")?.toString();
        let password = data.get("password")?.toString();

        console.log(userName + " " + password)
 
        if(userName){

            const existingUser = await prisma.user.findUnique({
                where: {name: userName}
            });
            console.log(existingUser)
            if(!password){
                return fail(400, {password: "no password found :("})
            }
            if(existingUser) {  
                //when the user exists :)

                let passMatch = validatePassword(password, existingUser.salt, existingUser.password);

                if(passMatch){
                    cookies.set("username", userName);
                    throw redirect(307, "/");
                }
                else{
                    console.log("Wrong password")
                    return fail(400, {userName: "Wrong password."})
                }                
            }
            else {
                const pass = hashPassword(password);
                await prisma.user.create({
                    data: {name: userName, password: pass.hash, salt: pass.salt}
                });
                cookies.set("username", userName);
                throw redirect(307, "/");
            }

        }
    },
    logout: async ({request, cookies}) => {

        let userName = cookies.get("username");
        if(!userName){
            return fail(400, {userName: "No username to be found :("})
        }
        cookies.delete("username")
    }
};

function hashPassword(password : crypto.BinaryLike){
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return { salt, hash };
}
function validatePassword(inputPassword : crypto.BinaryLike, storedSalt : crypto.BinaryLike, storedHash : string) {
    const hash = crypto.pbkdf2Sync(inputPassword, storedSalt, 1000, 64, 'sha512').toString('hex');
    return storedHash === hash;
}
