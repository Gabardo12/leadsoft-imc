import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "../../hooks/useSignIn";


function Login() {
	const [email, setEmail] = useState<string>("test@leadsoft.inf.br");
	const [password, setPassword] = useState<string>("LeadSoft_Is_The_Best");
	const { isLoading, signIn } = useSignIn();
	const navigate = useNavigate();

	function handleNavigation(string: string) {
		navigate(string);
	}

	useEffect(() => {
		const token = localStorage.getItem("@leadsoft:Authorization");
		if (token) {
			handleNavigation("/");
		}
	}, [localStorage.getItem("@leadsoft:Authorization")]);

	function handleLogin() {
		signIn({ email, password });
	}

	return (
		<div id="authDiv" className="login_bg">
			<form className="login_form">
				<div className="row">
					<div className="col-12">
						<h1 className="auth_title text-white">Fazer Login</h1>
					</div>
					<div className="col-12">
						<input
							placeholder="E-mail, Username ou Telefone"
							id="email"
							type="email"
							onChange={(e) => setEmail(e.target.value)}
							className="form-control"
							name="email"
							required
						/>
					</div>
					<div className="col-12">
						<input
							placeholder="Senha"
							id="password"
							type="password"
							onChange={(e) => setPassword(e.target.value)}
							className="form-control"
							name="password"
							required
						/>
					</div>
					<div className="col-12">
						{isLoading ? (
							<button
								type="button"
								className="btn btn_auth"
								disabled
							>
								<i className="pi pi-spin pi-spinner"></i>
							</button>
						) : (
							<button
								type="button"
								className="btn btn_auth"
								onClick={() => handleLogin()}
							>
								Fazer Login
							</button>
						)}
					</div>
				</div>
			</form>
		</div>
	);
}

export default Login;
