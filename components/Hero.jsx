import css from "../styles/Hero.module.css";
import Cherry from "../assets/Cherry.png";
import HeroImage from "../assets/HeroImage.png";
import Image from "next/image";
import { UilPhone } from "@iconscout/react-unicons";
import Pizza from "../assets/p1.jpg";

const Hero = () => {
  return (
    <div className={css.container}>
      {/* left side */}
      <div className={css.left}>
        <div className={css.cherryDiv}>
          <span className="flex items-center">More than faster</span>
          <Image src={Cherry} alt="Cherry" width={40} height={25} />
        </div>

        <div className={css.heroText}>
          <span>Be the fastest</span>
          <span>In delivering</span>
          <span>
            Your <span className="text-red-500">Pizza</span>
          </span>
        </div>

        <span className={css.miniText}>
          Our Mission is to filling your tummy with delicious food and with fast
          and free delivery
        </span>

        <button className={`btn ${css.btn}`}>Get started</button>
      </div>
      {/* right side */}
      <div className={css.right}>
        <div className={css.imageContainer}>
          <Image src={HeroImage} alt="HeroImage" layout="intrinsic" />

          <div className={css.contactUs}>
            <span>Contact us</span>
            <div>
              <UilPhone color="white" />
            </div>
          </div>

          <div className={css.Pizza}>
            <div>
              <Image
                src={Pizza}
                alt="Pizza"
                objectFit="cover"
                layout="intrinsic"
              />
            </div>
            <div className={css.details}>
              <span>Italian Pizza</span>
              <span><span className="text-red-500">$</span> 7.49</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
