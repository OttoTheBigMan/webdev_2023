import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
let totalVisitors = 0;
export let _totalVisits = 0;

export const load = (async ({cookies}) => {
    _totalVisits++;
    let user = cookies.get("user");
    if(user == undefined){
        totalVisitors++;
        let userData = {
            id: totalVisitors,
            visits: 1
        }
        cookies.set("user", JSON.stringify(userData), {path: "/", expires: new Date(2024,10,10), secure: false});
        user = JSON.stringify(userData);
    }
    else {
        let userData = JSON.parse(user);
        userData.visits++;
        cookies.set("user", JSON.stringify(userData), {path: "/", expires: new Date(2024,10,10), secure: false});
        user = JSON.stringify(userData)
    }

    let username = cookies.get("username");
    if(!username) {
        throw redirect(303, "/login")
    } 

    return {_totalVisits, user, totalVisitors, username};
}) satisfies PageServerLoad;