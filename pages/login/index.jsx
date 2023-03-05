import React from "react";
import back from "../../assets/my-account.jpg";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import Image from "next/image";
import { useWindowSize } from "../../lib/hooks";
import { useRouter } from "next/router";
const Login = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(authActions.login());
		{
			typeof window !== "undefined" && localStorage.setItem("isLogin", true);
		}
		router.push("/");
	};
	const mobile = useWindowSize().width < 768;

	return (
		<section className=" md:mx-14 mx-3 bg-white min-h-screen">
			<Image src={back} alt="" height={mobile ? 800 : 500} />
			<form
				className="border border-1 flex flex-col md:my-10 my-2 bg-white md:px-10 px-4 md:w-[760px] mx-auto text-left md:py-10 rounded-2xl py-10"
				onSubmit={handleSubmit}
			>
				<div className="mb-3 md:mb-6 flex flex-col">
					<span>Username or Email address</span>
					<input
						className="mt-1 border-2 p-3 outline-none rounded-md"
						type="text"
						required
					/>
				</div>
				<div className="mb-3 md:mb-6 flex flex-col">
					<span>Password * </span>
					<input
						className="mt-1 border-2 p-3 outline-none rounded-md"
						type="password"
						required
					/>
				</div>
				<button className="bg-black text-white p-3 rounded-md">Log in </button>
			</form>
		</section>
	);
};

export default Login;
