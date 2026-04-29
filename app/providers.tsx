"use client";

import { ApolloProvider } from "@apollo/client/react";
import { useMemo } from "react";

import { getApolloClient } from "@/lib/apollo-client";
import { LanguageProvider } from "@/lib/LanguageContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => getApolloClient(), []);

  return (
    <LanguageProvider>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </LanguageProvider>
  );
}
