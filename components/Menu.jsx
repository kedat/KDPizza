import css from "../styles/Menu.module.css";
import Image from "next/image";
import { urlFor } from "../lib/client";
import Link from "next/link";
import { useCallback, useState } from "react";

const Menu = ({ pizzas, categories }) => {
	const [category, setCategory] = useState(0);
	const onChangeCategory = useCallback((e) => {
		setCategory(e.target.value);
	}, []);
	const newPizzas = pizzas.filter((item) => {
		if (item.categoryId == category) {
			return item;
		}
	});
	
	return (
		<div className={css.container}>
			<div className={css.heading}>
				<span className="text-red-500 text-[1rem] mb-[2rem] -mt-20">
					OUR MENU
				</span>
				<span className="text-[2rem] text-black dark:text-white">Menu That Always</span>
				<span className="text-[2rem] text-black dark:text-white">Make you Fall in Love</span>
			</div>
			<select className="w-48" onChange={onChangeCategory}>
				<option value={0}>Default</option>
				{categories.length > 0 &&
					categories.map((category, id) => {
						return (
							<option value={category.id} key={category.id}>
								{category.name}
							</option>
						);
					})}
			</select>
			{/* pizzas */}
			<div className={css.menu}>
				{newPizzas.length > 0
					? newPizzas.map((pizza, id) => {
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
					  })
					: pizzas.map((pizza, id) => {
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
