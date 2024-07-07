// import React, { useState } from "react";
// import { useStyles5 } from "../sidebarstyles";

// const Sidebar = ({ children }) => {
//   const classes = useStyles5();
//   let OpenFlag = false;
//   const [isOpen, setIsOpen] = useState(false);

//   const openNav = () => {
//     setIsOpen(!isOpen);
//     if (!isOpen) {
//       document.getElementById("mySidebar").style.width = "250px";
//       document.getElementById("main").style.marginLeft = "250px";
//     } else {
//       document.getElementById("mySidebar").style.width = "0";
//       document.getElementById("main").style.marginLeft = "0";
//       setIsOpen(false);
//     }
//   };

//   // const closeNav = () => {
//   //   document.getElementById("mySidebar").style.width = "0";
//   //   document.getElementById("main").style.marginLeft = "0";
//   // };

//   return (
//     <div className={classes.pageContainer}>
//       <div id="mySidebar" className={classes.sidebar}>
//         <h2 className={classes.sidebarHeading}>Viscadia Forecast Platform</h2>
//         <a href="#" className={classes.sidebarLink}>
//           Home
//         </a>
//         <a href="#" className={classes.sidebarLink}>
//           Video tutorials
//         </a>
//         <a href="#" className={classes.sidebarLink}>
//           Documentation
//         </a>
//         <a href="#" className={classes.sidebarLink}>
//           Support
//         </a>
//         <a href="#" className={classes.sidebarLink}>
//           Buy a pack
//         </a>
//         <a href="#" className={classes.sidebarLink}>
//           Billing
//         </a>
//         <a href="#" className={classes.sidebarLink}>
//           Estimate your cost
//         </a>
//         <a href="#" className={classes.sidebarLink}>
//           Token counter
//         </a>
//         <a href="#" className={classes.sidebarLink}>
//           API keys
//         </a>
//         <a href="#" className={classes.sidebarLink}>
//           What's new
//         </a>
//         <a href="#" className={classes.sidebarLink}>
//           Sign up for updates
//         </a>
//       </div>

//       <div id="main" className={classes.main}>
//         <div className={classes.topSection}>
//           <button className={classes.openbtn} onClick={openNav}>
//             &#9776;
//           </button>
//           <h2 className={classes.mainHeading}>Viscadia Cloud Platform</h2>
//           <div className={classes.content}>{children}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
