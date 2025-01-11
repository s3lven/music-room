import NextAuth, { type DefaultSession } from "next-auth";
import Spotify from "next-auth/providers/spotify";

const scopes = ["playlist-read-private", "user-read-email"].join(",");

const params = {
  scope: scopes,
};

const SPOTIFY_AUTH_URL =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams(params).toString();

// Add accessToken to the session type 
declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string | unknown;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Spotify({
      authorization: SPOTIFY_AUTH_URL,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
