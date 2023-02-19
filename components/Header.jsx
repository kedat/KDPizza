import Image from "next/image";
import css from "../styles/Header.module.css";
import Logo from "../assets/Logo.png";
import { UilShoppingBag, UilReceipt } from "@iconscout/react-unicons";
import { useStore } from "../store/store";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  // state
  const [order, setOrder] = useState("");
  useEffect(() => {
    setOrder(localStorage.getItem("order"));
  }, []);
  const items = useStore((state) => state.cart.pizzas.length);
  return (
    <div className={css.header}>
      {/* logo side */}
      <div className={css.logo}>
        <Image src={Logo} alt="Logo" width={50} height={50} />
        <span className="hidden md:block">Ke Dat</span>
      </div>

      {/* menu side */}
      <ul className={css.menu}>
        <Link href="../">Home</Link>
        <Link href="../">Menu</Link>
        <Link href="../">Contact</Link>
      </ul>

      {/* right side */}
      <div className={css.rightSide}>
        <Link href="/cart" className="cursor-pointer">
          <div className={css.cart}>
            <UilShoppingBag size={35} color="2E2E2E" />
            <div className={css.badge}>{items}</div>
          </div>
        </Link>
        {order && (
          <Link href={`/order/${order}`} className="cursor-pointer">
            <div className={css.cart}>
              <UilReceipt size={35} color="2E2E2E" />
              {order != "" && <div className={css.badge}>1</div>}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;

// import { useDispatch, useSelector } from "react-redux";
// import { Badge, Box, IconButton } from "@mui/material";
// import {
//   PersonOutline,
//   ShoppingBagOutlined,
//   MenuOutlined,
//   SearchOutlined,
// } from "@mui/icons-material";
// // import { useNavigate } from "react-router-dom";
// // import { shades } from "../../theme";
// // import { setIsCartOpen } from "../../state";

// function Navbar() {
//   // const navigate = useNavigate();
//   // const dispatch = useDispatch();
//   // const cart = useSelector((state) => state.cart.cart);

//   return (
//     <Box
//       display="flex"
//       alignItems="center"
//       width="100%"
//       height="60px"
//       backgroundColor="rgba(255, 255, 255, 0.95)"
//       color="black"
//       position="fixed"
//       top="0"
//       left="0"
//       zIndex="1"
//     >
//       <Box
//         width="80%"
//         margin="auto"
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         <Box
//           // onClick={() => navigate("/")}
//           sx={{ "&:hover": { cursor: "pointer" } }}
//           // color={shades.secondary[500]}
//         >
//           ECOMMER
//         </Box>
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           columnGap="20px"
//           zIndex="2"
//         >
//           <IconButton sx={{ color: "black" }}>
//             <SearchOutlined />
//           </IconButton>
//           <IconButton sx={{ color: "black" }}>
//             <PersonOutline />
//           </IconButton>
//           <Badge
//             badgeContent={3}
//             color="secondary"
//             // invisible={cart.length === 0}
//             sx={{
//               "& .MuiBadge-badge": {
//                 right: 5,
//                 top: 5,
//                 padding: "0 4px",
//                 height: "14px",
//                 minWidth: "13px",
//               },
//             }}
//           >
//             <IconButton
//               // onClick={() => dispatch(setIsCartOpen({}))}
//               sx={{ color: "black" }}
//             >
//               <ShoppingBagOutlined />
//             </IconButton>
//           </Badge>
//           <IconButton sx={{ color: "black" }}>
//             <MenuOutlined />
//           </IconButton>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default Navbar;
