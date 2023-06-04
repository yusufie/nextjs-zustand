import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import yourAuthenticationLogic from ".././server/auth.js";



const options = {
  providers: [
    Providers.Credentials({
      // Credentials provider configuration
      credentials: {
        // Implement your own credential authentication logic
        authorize: async (credentials) => {
          const user = await yourAuthenticationLogic(credentials);
          if (user) {
            // Return the user object if authentication succeeds
            return user;
          } else {
            // Return null or throw an error if authentication fails
            throw new Error('Invalid credentials');
          }
        },
      },
    }),
    // Add other providers if needed (e.g., Google, GitHub, etc.)
  ],
  database: 'mongodb://127.0.0.1:27017/usersdata',
  // Other NextAuth options like session configuration, callbacks, etc.

  callbacks: {
    async signIn(credentials) {
      const user = await yourAuthenticationLogic(credentials);
      if (user) {
        return Promise.resolve(user);
      } else {
        return Promise.resolve(null);
      }
    },

    async redirect(url, baseUrl) {
      // Add custom redirect logic here if needed
      return url.startsWith(baseUrl) ? url : baseUrl;
    },

    async session(session, user) {
      // Add custom session logic here if needed
      return session;
    },

    async jwt(token, user, account, profile, isNewUser) {
      // Add custom jwt logic here if needed
      return token;
    },


  },

  pages: {
    // Configure custom pages here
  },

};

export default (req, res) => NextAuth(req, res, options);
