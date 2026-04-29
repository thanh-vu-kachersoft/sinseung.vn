import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { HttpLink } from "@apollo/client/link/http";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

function assertGraphQLEndpoint() {
  if (!GRAPHQL_ENDPOINT) {
    throw new Error(
      "Missing NEXT_PUBLIC_WORDPRESS_API_URL. Set it in `.env.local` (e.g. https://example.com/graphql).",
    );
  }
}

export function createApolloClient() {
  assertGraphQLEndpoint();

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: GRAPHQL_ENDPOINT,
      headers: {
        "Content-Type": "application/json",
      },
    }),
    cache: new InMemoryCache(),
  });
}

let globalApolloClient;

/**
 * Returns a singleton ApolloClient in the browser.
 * On the server, always returns a new instance per request.
 */
export function getApolloClient() {
  if (typeof window === "undefined") return createApolloClient();

  if (!globalApolloClient) globalApolloClient = createApolloClient();
  return globalApolloClient;
}
