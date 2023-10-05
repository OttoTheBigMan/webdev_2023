import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

export let _sessions: Map<string, {text: string, user: string}[]> = new Map();

export const load = (async () => {
    const allSessions = await prisma.session.findMany({include: {messages: true}})
    let sessionList : {name: string, creatorId: number, messages: any[]}[] = []
    allSessions.forEach(session => {
        sessionList.push({
            name: session.name,
            creatorId: session.userId,
            messages: session.messages
        });
    });
    
    return { sessionList };
}) satisfies PageServerLoad;

export const actions: Actions = {
    create: async ({request, cookies}) => {
        let data = await request.formData();
        let user = cookies.get("username");
        let sessionName = data.get("sessionName")?.toString();
        if(user == undefined) {
            return fail(400, {sessionName: "Please log in before creating a session."})
        }
        if(!sessionName){
            return fail(400, {sessionName: "Please provide a name for the session."});
        }
        else if(await prisma.session.findUnique({where: {name: sessionName}})){
            return fail(400, {sessionName: "Session already exists."})
        }
        const prismaUser = await prisma.user.findUnique({where: {name: user}});
        if(prismaUser){
            await prisma.session.create({data: {
                name: sessionName,
                userId: prismaUser.id
            }})
        }
        else{
            return fail(400, {sessionName: "Unable to find user."})
        }
    }
};