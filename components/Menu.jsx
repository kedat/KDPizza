import css from "../styles/Menu.module.css";
import Image from "next/image";
import { urlFor } from "../lib/client";
import Link from "next/link";

const Menu = ({ pizzas }) => {
	return (
		<div className={css.container}>
			<div className={css.heading}>
				<span className="text-red-500 text-[1rem] mb-[2rem] -mt-20">
					OUR MENU
				</span>
				<span className="text-[2rem]">Menu That Always</span>
				<span className="text-[2rem]">Make you Fall in Love</span>
			</div>
			<select className="w-50">
				<option>Default</option>
				<option value="ascending">Alphabetically, A-Z</option>
				<option value="descending">Alphabetically, Z-A</option>
				<option value="high-price">High Price</option>
				<option value="low-price">Low Price</option>
			</select>
			{/* pizzas */}
			<div className={css.menu}>
				{pizzas.map((pizza, id) => {
					const src = urlFor(pizza.image).url();
					return (
						<div className={`${css.pizza}`} key={id}>
							<Link href={`./pizza/${pizza.slug.current}`}>
								<div className={css.ImageWrapper}>
									<Image
										loader={() => src}
										src={src}
										alt="pizza"
										objectFit="cover"
										layout="fill"
										className="hover:scale-[1.1] hover:cursor-pointer"
										unoptimized
									/>
								</div>
							</Link>
							<span>{pizza.name}</span>
							<span>
								<span className="text-red-500">$</span> {pizza.price[1]}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default Menu;
