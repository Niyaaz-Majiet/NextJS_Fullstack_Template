import  connectToDB  from './DBHelper/dbHelper';
import sql from 'mssql';

export const insertUser = async (user) => {
    const db = await connectToDB();
    return db.request()
    .input('name', sql.NVarChar, user.name)
    .input('surname', sql.NVarChar, user.surname)
    .input('role', sql.NVarChar, user.role)
    .input('password', sql.NVarChar, user.password)
    .input('email', sql.NVarChar, user.email)
        .execute(`UserInsert`);
}

export const doesUserExist = async (user) => {
    const db = await connectToDB();
    return db.request()
    .input('email', sql.NVarChar, user.email)
        .execute(`CheckUserExistance`);
}

export const getUserByEmail = async (user) => {
    const db = await connectToDB();
    return db.request()
    .input('email', sql.NVarChar, user.email)
        .execute(`UserGetByEmail`);
}
