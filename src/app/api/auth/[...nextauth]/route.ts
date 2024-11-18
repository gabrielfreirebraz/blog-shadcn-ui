import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.PRIVATE_GOOGLE_CLIENT_ID || !process.env.PRIVATE_GOOGLE_CLIENT_SECRET || !process.env.NEXTAUTH_SECRET) {
    throw new Error("Missing necessary environment variables for NextAuth configuration.");
}

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.PRIVATE_GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.PRIVATE_GOOGLE_CLIENT_SECRET ?? '',
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
