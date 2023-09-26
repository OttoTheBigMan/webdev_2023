import { _totalVisits } from "./+page.server";
import {json, type RequestHandler} from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    return json({ totalVisits: _totalVisits});
};