import Image from "next/image";
import React, { FC } from "react";

const CardCell = ({ avatar }) => {
	return (
		<div
			className={`rounded-lg bg-white mb-8 bg-gradient-to-r from-purple-500 to-pink-500 gap-1 2xl:h-[700px]`}
		>
			<Image
				alt="user-avatar-review"
				src={avatar}
				width="1700%"
				height={700}
			/>
		</div>
	);
};

export default CardCell;
