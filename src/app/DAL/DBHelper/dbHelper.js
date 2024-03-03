import sql from 'mssql';

 const connectToDB = async () => {
    try {
        let pool = await sql.connect(require('../DB/database'));
        return pool;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export default connectToDB;