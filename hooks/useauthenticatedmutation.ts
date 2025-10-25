import { FunctionReference } from "convex/server";
import { useConvexAuth, useMutation } from "convex/react";

/**
 * A wrapper around useMutation that checks authentication before allowing mutations.
 */
export function useAuthenticatedMutation<
  Mutation extends FunctionReference<"mutation">
>(mutation: Mutation) {
  const { isAuthenticated } = useConvexAuth();
  const mutateFn = useMutation(mutation);
  
  return (...args: Parameters<typeof mutateFn>) => {
    if (!isAuthenticated) {
      throw new Error("Cannot perform mutation: User not authenticated");
    }
    return mutateFn(...args);
  };
}
