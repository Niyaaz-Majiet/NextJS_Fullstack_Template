import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    if (request.cookies.get('loggedIn')?.value) {
        const isLoggedIn = request.cookies.get('loggedIn')?.value;

        switch (isLoggedIn) {
            case 'true':
                return NextResponse.next();
            case 'false':
                //replace with base url the string '<baseUrl>'
                if (request.url == 'http://localhost:3000/') {
                    return NextResponse.next();
                } else {
                    return NextResponse.redirect(new URL('/', request.url));
                }
            default:
                return NextResponse.redirect(new URL('/', request.url));
        }
    } else {
        return NextResponse.next()
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}