import { FunctionReference } from "convex/server";
import { useConvexAuth, useQuery } from "convex/react";
import { OptionalRestArgs } from "convex/server";

/**
 * A wrapper around useQuery that automatically checks authentication state.
 * If the user is not authenticated, the query is skipped.
 * This prevents race conditions where queries run before auth is ready.
 */
export function useAuthenticatedQuery<Query extends FunctionReference<"query">>(
  query: Query,
  ...args: OptionalRestArgs<Query> | ["skip"]
) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  
  // Skip the query if not authenticated or still loading
  return useQuery(
    query,
    isAuthenticated && !isLoading ? (args[0] === "skip" ? "skip" : args[0]) : "skip" as any
  );
}
