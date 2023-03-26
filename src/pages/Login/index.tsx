import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "../../hooks/useSignIn";

// images
import spinner from "../../assets/img/icon/spinner.gif";


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
		<div className="auth-wrapper">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-12 col-md-8 col-xl-5">
						<div className="auth-card">
							<form>
								<div className="row auth-row justify-content-center">
									<div className="col-12 text-center">
										<h3 className="">Fazer Login</h3>
										<p>IMC Dashboard</p>
									</div>
									<div className="col-10 mb-4">
										<input
											placeholder="E-mail"
											id="email"
											type="email"
											onChange={(e) => setEmail(e.target.value)}
											className="form-input"
											name="email"
											required
										/>
									</div>
									<div className="col-10 mb-4">
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
									<div className="col-10 d-flex justify-content-center">
										{isLoading ? (
											<button
												type="button"
												className="auth-btn"
												disabled
											>
												<img src={ spinner } alt="" className="load-spinner" />
											</button>
										) : (
											<button
												type="button"
												className="auth-btn"
												onClick={() => handleLogin()}
											>
												Fazer Login
											</button>
										)}
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
