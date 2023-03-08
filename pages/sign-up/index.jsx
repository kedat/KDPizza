import React, { useState } from "react";
import back from "../../assets/my-account.jpg";
import { useDispatch } from "react-redux";
import { login, setUser } from "../../store/authSlice";
import Image from "next/image";
import { useWindowSize } from "../../lib/hooks";
import { useRouter } from "next/router";
import { client } from "../../lib/client";
import Link from "next/link";

const Login = ({ users }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const mobile = useWindowSize().width < 768;
	const [name, setName] = useState("");
	const [pass, setPass] = useState("");
	const [wrongInfo, setWrongInfo] = useState(false);
	console.log("🚀 ~ file: index.jsx:17 ~ Login ~ wrongInfo:", wrongInfo);

	const handleSubmit = (e) => {
		e.preventDefault();
		users.map((user, id) => {
			if (user.name == name && user.password == pass) {
				setWrongInfo(false);
				// dispatch(login());
				// dispatch(setUser(user.name));
				// {
				// 	typeof window !== "undefined" &&
				// 		localStorage.setItem("isLogin", true);
				// }
				// router.push("/");
			} else setWrongInfo(true);
		});
	};

	return (
		<section className=" md:mx-14 mx-3 bg-white ">
			<Image src={back} alt="" height={mobile ? 800 : 500} />
			<form
				className="border border-1 flex flex-col md:my-10 my-2 bg-white md:px-10 px-4 md:w-[760px] mx-auto text-left md:py-10 rounded-2xl py-10"
				onSubmit={handleSubmit}
			>
				<h2 className="text-center md:text-2xl text-xl md:-mt-2 -mt-3 mb-3">
					SIGN UP
				</h2>
				<div className="mb-3 md:mb-6 flex flex-col">
					<span>Username</span>
					<input
						className="mt-1 border-2 p-3 outline-none rounded-md"
						type="text"
						required
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
				</div>
				<div className="mb-3 md:mb-6 flex flex-col">
					<span>Email</span>
					<input
						className="mt-1 border-2 p-3 outline-none rounded-md"
						type="email"
						required
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
				</div>
				<div className="mb-3 md:mb-6 flex flex-col">
					<span>Password * </span>
					<input
						className="mt-1 border-2 p-3 outline-none rounded-md"
						type="password"
						required
						onChange={(e) => {
							setPass(e.target.value);
						}}
					/>
				</div>
				<div className="mb-3 md:mb-6 flex flex-col">
					<span>Confirm Password * </span>
					<input
						className="mt-1 border-2 p-3 outline-none rounded-md"
						type="password"
						required
						onChange={(e) => {
							setPass(e.target.value);
						}}
					/>
				</div>
				{wrongInfo && <p>Wrong user name or password</p>}
				<button className="bg-black text-white p-3 rounded-md">Sign up</button>
				<p className="md:mx-10 mx-2 text-center md:mt-6 mt-3 ">
					By clicking the Sign Up button above, you agree to our Terms and
					Conditions and Policy Privacy
				</p>
				<Link href="login">
					<p className="text-blue-700 mx-auto md:mt-6 mt-3 cursor-pointer">
						Already have an account? Login here
					</p>
				</Link>
			</form>
		</section>
	);
};

export default Login;

export const getServerSideProps = async () => {
	const userQuery = '*[_type=="users"]';
	const users = await client.fetch(userQuery);
	return {
		props: {
			users,
		},
	};
};
