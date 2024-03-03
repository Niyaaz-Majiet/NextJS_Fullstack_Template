import { doesUserExist, insertUser } from "@/app/DAL/userDAL";
import { NextRequest, NextResponse } from "next/server";

type data = {
    email: string;
    password: string;
    name: string;
    surname: string;
    role: string;
}

export const POST = async (request: NextRequest) => {
    const data = await request.json() as data;
    
    try {
        const doesUserExistData = await doesUserExist(data) as any;
        if (doesUserExistData) {
            if (doesUserExistData.recordset[0]['doesExists'] !== 0) {
                return NextResponse.json(
                    { error: 'Email already exists' },
                    { status: 409 }
                ) as NextResponse;
            } else {
                const user = {
                    name: data.name,
                    surname: data.surname,
                    role: data.role,
                    password: data.password,
                    email: data.email,
                }
 
                const insertUserResult = await insertUser(user);
                if(insertUserResult) {
                    return NextResponse.json(
                        { message: 'success' },
                        { status: 200 }
                    ) as NextResponse;
                }
            }
        }
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        ) as NextResponse;
    }
}
