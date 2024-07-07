// import React from "react";
// // import { useStyles } from "./styles";
// import "boxicons/css/boxicons.min.css";
// import { useStyles16 } from "./sidebarteststyles";

// const Sidebartest = () => {
//   const classes = useStyles16();

//   const menuItems = [
//     { icon: "bx bx-grid-alt", text: "Dashboard" },
//     { icon: "bx bx-collection", text: "Category" },
//     { icon: "bx bx-cog", text: "Settings" },
//     { icon: "bx bx-user", text: "Profile" },
//     { icon: "bx bx-calendar", text: "Calendar" },
//     { icon: "bx bx-message", text: "Messages" },
//     { icon: "bx bx-bell", text: "Notifications" },
//     { icon: "bx bx-book", text: "Documents" },
//     { icon: "bx bx-photo-album", text: "Gallery" },
//     { icon: "bx bx-help-circle", text: "Help" },
//   ];

//   return (
//     <div className={classes.sidebar}>
//       <div className={classes.topSection}>
//         <img src="/../assets/Viscadia_V_Logo.png" className={classes.profileImage} />
//       </div>
//       <div className={classes.menuSection}>
//         {menuItems.map((item, index) => (
//           <button key={index} className={classes.menuItem}>
//             <i className={item.icon}></i>
//             <span className={classes.tooltip}>{item.text}</span>
//           </button>
//         ))}
//       </div>
//       <div className={classes.bottomSection}>
//         <button className={classes.menuItem}>
//           <i className="bx bx-log-out"></i>
//           <span className={classes.tooltip}>Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebartest;
