
import { getUserByEmail } from "@/app/DAL/userDAL";
import { generateToken } from "@/app/logic/common/commonLogic";
import { NextRequest, NextResponse } from "next/server";

type data = {
    email: string;
    password: string;
}

export const POST = async (request: NextRequest) => {
    const data = await request.json() as data;

    try {
        const getData = await getUserByEmail(data);

        if (getData.recordset.length === 0) {
            return NextResponse.json(
                { message: 'User does not exist.' },
                { status: 401 }
            ) as NextResponse;
        } else {
            const userObj = getData.recordset[0];
            if (userObj.password === data.password) {
                const res = await generateToken(userObj, NextResponse);

                return res as NextResponse;
            } else {
                return NextResponse.json(
                    { message: 'Wrong password.' },
                    { status: 401 }
                ) as NextResponse;
            }
        }
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        ) as NextResponse;
    }
}
