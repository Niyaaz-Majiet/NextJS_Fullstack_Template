import { upsertAuthToken } from './../../DAL/authDAL';

export const generateToken = (userObj, response) => {
    const token = createToken(userObj, "red#");
    return new Promise((resolve) => {
        upsertAuthToken(token, userObj.id).then(() => {
            delete userObj.password;
            resolve(response.json(
                { headers: [{ 'Access-Control-Expose-Headers': 'x-access-token' }, { 'x-access-token': token }] },
                { user: userObj },
                { status: 200 }
            ));
        }).catch((error) => {
            resolve(response.json(
                { message: error.message },
                { status: 500 }
            ));
        });
    })
}

//TODO: Update to be used as middleware on api routes
// export const verifyAuthToken = (request, response, next) => {
//     try {
//         const token = request.headers['x-access-token'];

//         if (token) {
//             getUserByAuthToken(token).then((results) => {
//                 if (results.recordset.length = 0) {
//                     console.warn('No user for this token : ' + token);
//                     response.status(401).send({ message: 'An error occured please log out and then log back in again' });
//                     return;
//                 }

//                 const currentUser = results.recordset[0];
//                 request.user = {
//                     name: currentUser.name,
//                     surname: currentUser.surname,
//                     role: currentUser.role,
//                     email: currentUser.email,
//                 };

//                 next();
//             }).catch((error) => {
//                 console.error(error.message);
//                 response.status(401).send({ message: error.message })
//             });
//         } else {
//             console.warn('Authentication Token Required');
//             response.status(401).send({ message: 'Authentication Token Required' });
//         }
//     } catch (e) {
//         console.warn('Threw an exception : ' + e);
//         response.status(500).send(e);
//     }

// }

const createToken = (userObject, secret) => {
    const jwt = require('jsonwebtoken');
    return jwt.sign(userObject, secret, {
        expiresIn: '9999999m' // expires in 228 months
    });
};