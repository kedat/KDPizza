import Image from "next/image";
import React from "react";

import { Container, Row, Col } from "reactstrap";

import categoryImg01 from "../assets/category-01.png";
import categoryImg02 from "../assets/category-02.png";
import categoryImg03 from "../assets/category-03.png";
import categoryImg04 from "../assets/category-04.png";

// import "../styles/category.css";

const categoryData = [
	{
		display: "Fastfood",
		imgUrl: categoryImg01,
	},
	{
		display: "Pizza",
		imgUrl: categoryImg02,
	},

	{
		display: "Asian Food",
		imgUrl: categoryImg03,
	},

	{
		display: "Row Meat",
		imgUrl: categoryImg04,
	},
];

const Category = () => {
	return (
		<div className="flex">
			{categoryData.map((item, index) => (
				<div className="mb-4 flex" key={index}>
					<Image src={item.imgUrl} alt="category__item" />
					<h6>{item.display}</h6>
				</div>
			))}
		</div>
	);
};

export default Category;
