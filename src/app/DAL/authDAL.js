import  connectToDB  from './DBHelper/dbHelper';
import sql from'mssql';

export const upsertAuthToken = async (authToken, userId) => {
    const db = await connectToDB();
    return db.request()
        .input('authToken', sql.NVarChar, authToken)
        .input('userId', sql.Int, userId)
        .execute(`AuthTokenUpsert`);
}

export const getUserByAuthToken = async (token) => {
    const db = await connectToDB();
    return db.request()
        .input('authToken', sql.NVarChar, authToken)
        .execute(`UserGetByAuthToken`);
}