import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
//
import { POST_REQUEST } from "@/resources";
import { endpoints, PATHS } from "@/config";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                const { username } = credentials;

                let api_url = endpoints["login"];
                let api_payload = {
                    username,
                };

                try {
                    const response = await POST_REQUEST(api_url, api_payload);

                    if (response?.status) {
                        return response?.data;
                    } else {
                        return {
                            error: response?.message || "Invalid Credentials",
                        };
                    }
                } catch (error) {
                    return { error: "Login failed. Please try again." };
                }
            },
        }),
    ],
    seccion: {
        strategy: "jwt",
    },
    page: {
        signin: PATHS["login"],
        signout: PATHS["login"],
        error: PATHS["login"],
    },
    callbacks: {
        async signIn({ user }) {
            if (user?.error) {
                throw new Error(user?.error);
            }

            return user;
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token = { ...user };
            }

            if (trigger === "update") {
                return {
                    ...token,
                    ...session.user,
                };
            }

            return token;
        },
        async session({ session, token }) {
            session.user = token;

            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
