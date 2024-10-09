import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth,{ AuthOptions } from "next-auth";
import prisma  from "@/app/libs/prismadb"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
export const authOptions :AuthOptions = {
    adapter:PrismaAdapter(prisma),
    providers:[
        GithubProvider({
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name:"credencials",
            credentials:{
                email:{label:"email",type:"text"},
                password:{label:"password",type:"password"}
            },
            async authorize(credencials){
                if (!credencials?.email || !credencials.password) {
                    throw new Error("Credenciais inválidas");

                }
                const user = await prisma.user.findUnique({
                    where:{
                        email:credencials.email
                    }
                }) 

                if (!user || !user.hashedPassword) {
                    throw new Error("Usuário ou senha inválidos. Por favor, tente novamente.")
                }

                const isPasswordCorrect = await bcrypt.compare(credencials.password,user.hashedPassword)
                if (!isPasswordCorrect) {
                    throw new Error("Usuário ou senha inválidos. Por favor, tente novamente.")
                }
                return user
            }
        })
    ],
    pages:{
        signIn:"/",
    },
    debug: process.env.NODE_ENV === "development",
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)