import { useContextSelector } from "use-context-selector";
import { AuthContext } from "../context/auth";

export function useSignIn() {

	const isLoading = useContextSelector(AuthContext, (signIn) => signIn.load);

	const signIn = useContextSelector(AuthContext, (signIn) => signIn.signIn);

	return {
		isLoading,
		signIn
	};
}
