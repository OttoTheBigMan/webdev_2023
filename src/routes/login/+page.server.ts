import { fail, redirect } from '@sveltejs/kit';
import {PrismaClient} from "@prisma/client"
import type { Actions, PageServerLoad } from './$types';

const prisma = new PrismaClient();

let users : string[] = []

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
                throw fail(400, {password: "no password found :("})
            }
            if(existingUser) {  
                //when the user exists :)
                if(password == existingUser.password){
                    cookies.set("username", userName);
                    throw redirect(307, "/");
                }
                else{
                    throw fail(400, {password: "Wrong password."})
                }                
            }
            else {
                await prisma.user.create({
                    data: {name: userName, password: password}
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
        users = users.filter((e) => e != userName) //Filter username :)
    }
};