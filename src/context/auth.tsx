import React, { ReactNode, useState, useContext } from "react";

import api from "../services/api";

import { createContext } from "use-context-selector";

interface SignInCredentials {
	email: string;
	password: string;
}

interface AuthProviderProps {
	children: ReactNode;
}

interface AuthContextData {
	signIn: (credentials: SignInCredentials) => void;
	load: boolean;
	EnableLoad: () => void;
	DisableLoad: () => void;
	isSigned: any;
	SignOut: () => void;
}

export const AuthContext = createContext<AuthContextData>(
	{} as AuthContextData
);

export function AuthProvider({ children }: AuthProviderProps) {

	const [load, setLoad] = useState<boolean>(false);
	const [isSigned, setIsSigned] = useState<boolean>(false);

	function signIn({ email, password }: SignInCredentials) {
		EnableLoad();

		api.post("/Auth/LogIn", {
			username: email,
			password: password,
		})
			.then((response) => {
				const { Authorization } = response.data;
				console.log("--- Authorization ---", Authorization);
				setIsSigned(true);
				localStorage.setItem("@leadsoft:Authorization", Authorization);
				api.defaults.headers.common[
					"Authorization"
				] = `Bearer ${Authorization}`;
			})
			.catch((error) => {
				const { message } = error.response.data;
				console.log(error, message);
				alert(message);
			})
			.finally(() => {
				DisableLoad();
			});
	}

	function SignOut() {
		localStorage.removeItem("@leadsoft:Authorization");
		api.defaults.headers.common["Authorization"] = `Bearer `;
	}

	function EnableLoad() {
		setLoad(true);
	}

	function DisableLoad() {
		setLoad(false);
	}

	return (
		<AuthContext.Provider
			value={{
				signIn,
				load,
				EnableLoad,
				DisableLoad,
				isSigned,
				SignOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
