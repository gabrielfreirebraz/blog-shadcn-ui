import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.PRIVATE_GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.PRIVATE_GOOGLE_CLIENT_SECRET ?? '',
        }),
        // FacebookProvider({
        //     clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
        //     clientSecret: process.env.FACEBOOK_SECRET ?? '',
        // }),
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID ?? '',
        //     clientSecret: process.env.GITHUB_SECRET ?? '',
        // }),    
    ],
    pages: {
        signIn: '/auth/signin',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

console.log("GOOGLE_CLIENT_ID:", process.env.PRIVATE_GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.PRIVATE_GOOGLE_CLIENT_SECRET);
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
