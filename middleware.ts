import { NextResponse } from 'next/server';
import { auth } from './auth';

export default auth((req) => {
  if (!req.auth) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/signin';
    return NextResponse.redirect(url);
  }
});
export const config = {
  matcher: ['/me/:path*'],
};
