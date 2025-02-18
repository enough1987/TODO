'use server'

import { SafeParseReturnType } from "zod";
import { API_DELAY, BASE_API, IAuthState, IUser } from "./dictioneries"
import { ERROR_SIGNIN, ERROR_SIGNUP, authSchema } from "./validation";
import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers'
import { permanentRedirect } from 'next/navigation'
import { revalidateTag } from "next/cache";

export async function getUser (email: string, password: string): Promise<IUser | null> {
    // TODO: remove for prod
    await new Promise(resolve => setTimeout(resolve, API_DELAY));

    try {
        const res: IUser[] = await fetch(`${BASE_API}/users?email=${email}&password=${password}`, { 
            cache: 'force-cache', 
            next: { 
                tags: ['/users'],
                revalidate: 600
            } 
        }).then(res => res.json());

        console.info('getUser : ', res[0] || null);
        return res[0] || null;
    } catch (_error: unknown) {
        console.info('getUser error', (_error as Error)?.message);
        return null;
    }
}

export const signupApi = async (data: Omit<IUser, 'id'>): Promise<IAuthState> => {
    // TODO: remove for prod
    await new Promise(resolve => setTimeout(resolve, API_DELAY));

    const validated: SafeParseReturnType<Omit<IUser, 'id'>, object> = authSchema.safeParse(data);

    
    if (!validated.success) {
        console.info('signupApi 1 error', validated.error);
        return { error: ERROR_SIGNUP, data: null};
    }

    let user: IUser | null = null;
    try {
        user = await getUser(data.email, data.password);
    } catch (_error: unknown) {
        console.info('signupApi 2 error', (_error as Error)?.message);
        return { data: null, error: ERROR_SIGNUP };
    }

    if(!user) {
        console.info('signupApi 3 error', 'User already exists');
        return { data: null, error: ERROR_SIGNUP };
    }

    console.info('signupApi user', user);

    (await cookies()).set('authorization', user.id);
    revalidateTag('/users');
    permanentRedirect('/');
}

export const signinApi = async (data: Omit<IUser, 'id'>): Promise<IAuthState> => {
    // TODO: remove for prod
    await new Promise(resolve => setTimeout(resolve, API_DELAY));

    const validated: SafeParseReturnType<Omit<IUser, 'id'>, object> = authSchema.safeParse(data);
    
    if (!validated.success) {
        console.info('signinApi 1 error', validated.error);
        return { error: ERROR_SIGNIN, data: null};
    }

    try {
        const user = await getUser(data.email, data.password);
        if(user) {
            console.info('signinApi 2 error', 'User already exists');
            return { data: null, error: ERROR_SIGNIN };
        }
    } catch (_error: unknown) {
        console.info('signinApi 3 error', (_error as Error)?.message);
        return { data: null, error: ERROR_SIGNIN };
    }

    const user = {
        id: uuidv4(),
        email: data.email,
        password: data.password
    }

    try {
        await fetch(`${BASE_API}/users`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json());
    } catch (_error: unknown) {
        console.info('signinApi 4 error', (_error as Error)?.message);
        return { data: null, error: ERROR_SIGNIN };
    }

    console.info('signupApi user', user);

    (await cookies()).set('authorization', user.id);
    revalidateTag('/users');
    permanentRedirect('/');
}

export const logOut = async () => {
    console.info('logOut');

    (await cookies()).delete('authorization');
    permanentRedirect('/auth/signup');
}