import { userModelToLocalhost } from '../mappers/user-to-localhost.mapper';
import {User} from '../models/user'

/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async(userLike) => {

    const user = new User(userLike);

    if (!user.firstName || !user.lastName) 
        throw 'First and Last Name are requiered'
    
    const userToSave = userModelToLocalhost(user);

    if(user.id){
        throw 'No implementada la actualización'
        return;
    }

    const updatedUser = await createUser(userToSave);
    return updatedUser;
    
}

/**
 * 
 * @param {Lile<User>} user 
 */
const createUser = async(user) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const newUser = await res.json();
    console.log({newUser});
    return newUser;
}