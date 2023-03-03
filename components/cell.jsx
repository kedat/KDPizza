import Image from "next/image";
import React, { FC } from "react";
import { useWindowSize } from "../lib/hooks";

const CardCell = ({ customer, avatar, comment }) => {
	const mobile = useWindowSize().width < 768;

	return (
		<div
			className={`rounded-lg bg-white mb-8 mr-3 md:mr-1 bg-gradient-to-r from-purple-500 to-pink-500 gap-1`}
		>
			<div className={`${mobile ? "h-[266px]" : ""} p-7 pb-10`}>
				<div className="flex items-center mb-5">
					<Image
						alt="user-avatar-review-viewpals"
						className="w-10 h-10 rounded-full"
						src={avatar}
						width="41"
						height="41"
					/>
					<div className="flex flex-col ml-4">
						<h6 className="font-medium text-black-russian text-base md:text-lg">
							{customer}
						</h6>
					</div>
				</div>
				<div>
					<span className="text-base font-normal text-gray-smoky leading-7.5">
						{comment}
					</span>
				</div>
			</div>
		</div>
	);
};

export default CardCell;
