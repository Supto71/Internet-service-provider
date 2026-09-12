import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '@/lib/db';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        phone:    { label: 'Phone',    type: 'text'     },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) return null;

        // Find user by phone in MySQL via Prisma
        const user = await db.user.findUnique({
          where: { phone: credentials.phone },
        });
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id:         String(user.id),
          name:       user.name,
          phone:      user.phone,
          email:      user.email,
          role:       user.role,
          plan:       user.plan,
          planSpeed:  user.planSpeed,
          planPrice:  user.planPrice,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role      = user.role;
        token.phone     = user.phone;
        token.plan      = user.plan;
        token.planSpeed = user.planSpeed;
        token.planPrice = user.planPrice;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role      = token.role;
      session.user.phone     = token.phone;
      session.user.plan      = token.plan;
      session.user.planSpeed = token.planSpeed;
      session.user.planPrice = token.planPrice;
      return session;
    },
  },
  pages:   { signIn: '/login' },
  session: { strategy: 'jwt' },
  secret:  process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
