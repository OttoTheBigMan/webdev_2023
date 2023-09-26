import type { PageServerLoad } from './$types';
import { _sessions } from '../+page.server';
import { error, type Actions } from '@sveltejs/kit';
let _session : string
let messages : {text: string, user: string}[]

export const load = (async ({params, cookies}) => {
    _session = params.session;
    let username = cookies.get("username")
    if(!_sessions.has(_session)){
        throw error(404, "Session not found");
    }
    messages = _sessions.get(_session)!;
    if(messages == undefined){
        messages = []
    }
    return {session: _session, messages: messages, username};
}) satisfies PageServerLoad;

export const actions: Actions = {
    message: async ({request, cookies}) => {
        let data = await request.formData();
        let msg = data.get("message")?.toString();
        let user = cookies.get("username");
        
        if(!msg){
            msg = "I agree."    //adding some potential consequences 😱😱😱
        }
        
        if(!user){
            user = "Unknown"
        }
        let messageData = {
            text: msg,
            user: user
        }
        _sessions.get(_session)?.push(messageData);
    }
};