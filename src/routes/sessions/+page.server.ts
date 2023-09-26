import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export let _sessions: Map<string, {text: string, user: string}[]> = new Map();

export const load = (async () => {
    return { _sessions };
}) satisfies PageServerLoad;

export const actions: Actions = {
    create: async ({request}) => {
        let data = await request.formData();
        let sessionName = data.get("sessionName")?.toString();
        if(!sessionName){
            return fail(400, {sessionName: "Please provide a name for the session."});
        }
        else if(_sessions.has(sessionName)){
            return fail(400, {sessionName: "Session already exists."})
        }
        _sessions.set(sessionName, []);
    }
};