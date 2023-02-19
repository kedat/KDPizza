import css from "../styles/Hero.module.css";
import Cherry from "../assets/Cherry.png";
import HeroImage from "../assets/HeroImage.png";
import Image from "next/image";
import { UilPhone } from "@iconscout/react-unicons";
import Pizza from "../assets/p1.jpg";
import { useWindowSize } from "../lib/hooks";

const Hero = () => {
  const mobile = useWindowSize().width < 768;

  return (
    <div className={`${css.container} md:flex-row flex-col`}>
      {/* left side */}
      <div className={css.left}>
        <div className={css.cherryDiv}>
          <span className="flex items-center">More than faster</span>
          <Image src={Cherry} alt="Cherry" width={40} height={25} />
        </div>

        <div className={`${css.heroText} lg:text-6xl text-3xl`}>
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
          <Image
            src={HeroImage}
            alt="HeroImage"
            layout="intrinsic"
            width={mobile ? 300 : 600}
            height={mobile ? 300 : 600}
          />

          <div className={`${css.contactUs} hidden md:block md:absolute`}>
            <span>Contact us</span>
            <div>
              <UilPhone color="white" />
            </div>
          </div>

          <div className={`${css.Pizza} !hidden lg:block lg:absolute`}>
            <div>
              <Image
                src={Pizza}
                alt="Pizza"
                objectFit="cover"
                layout="intrinsic"
              />
            </div>
            <div>
              <span>Italian Pizza</span>
              <span>
                <span className="text-red-500">$</span> 7.49
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
