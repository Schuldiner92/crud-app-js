import {localHostUserToModel} from '../mappers/localhost-user-mapper'

/**
 * 
 * @param {Number} page 
 * @returns {Promise<User[]>}
 */
export const loadUsersByPage = async(page = 1) => {
    
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`
    const res = await fetch(url);
    const data = await res.json();

    if ( page > data.last ) return []; // Evitar que "muestre" páginas que no existen

    const users = data.map(localHostUserToModel);
    // console.log(users);

    return users;
}