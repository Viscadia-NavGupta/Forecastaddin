// import React, { useState } from "react";
// import { useStyles15 } from "../sidebarnewstyles";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import Collapse from "@mui/material/Collapse";
// import { ExpandLess, ExpandMore } from "@mui/icons-material";
// import "boxicons/css/boxicons.min.css";

// const Sidebarnew = () => {
//   const classes = useStyles15();
//   const [isOpen, setIsOpen] = useState(false);
//   const [openSubMenu, setOpenSubMenu] = useState(false);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const toggleSubMenu = () => {
//     setOpenSubMenu(!openSubMenu);
//   };

//   return (
//     <div className={classes.root}>
//       <div className={`${classes.sidebar} ${isOpen ? "" : "close"}`}>
//         <div className={`${classes.logoDetails} ${isOpen ? "" : "close"}`}>
//           <i className="bx bxl-c-plus-plus"></i>
//           <span className="logo_name">CodingLab</span>
//         </div>
//         <List className={classes.navLinks}>
//           <ListItem button className={classes.linkItem}>
//             <ListItemIcon className={classes.listItemIcon}>
//               <i className="bx bx-grid-alt"></i>
//             </ListItemIcon>
//             <ListItemText primary="Dashboard" className={`${classes.listItemText} ${isOpen ? "" : "collapsedText"}`} />
//           </ListItem>
//           <ListItem button onClick={toggleSubMenu} className={classes.linkItem}>
//             <ListItemIcon className={classes.listItemIcon}>
//               <i className="bx bx-collection"></i>
//             </ListItemIcon>
//             <ListItemText primary="Category" className={`${classes.listItemText} ${isOpen ? "" : "collapsedText"}`} />
//             {openSubMenu ? <ExpandLess /> : <ExpandMore />}
//           </ListItem>
//           <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding className={classes.subMenu}>
//               <ListItem button className={classes.linkItem}>
//                 <ListItemText primary="HTML & CSS" className={`${classes.listItemText} ${isOpen ? "" : "collapsedText"}`} />
//               </ListItem>
//               <ListItem button className={classes.linkItem}>
//                 <ListItemText primary="JavaScript" className={`${classes.listItemText} ${isOpen ? "" : "collapsedText"}`} />
//               </ListItem>
//               <ListItem button className={classes.linkItem}>
//                 <ListItemText primary="PHP & MySQL" className={`${classes.listItemText} ${isOpen ? "" : "collapsedText"}`} />
//               </ListItem>
//             </List>
//           </Collapse>
//         </List>
//         <div className={`${classes.profileDetails} ${isOpen ? "" : "close"}`}>
//           <div className="profile-content">
//             <img src="path_to_image" alt="profileImg" />
//           </div>
//           <div className="name-job">
//             <div className="profile_name">Prem Shahi</div>
//             <div className="job">Web Designer</div>
//           </div>
//           <i className="bx bx-log-out"></i>
//         </div>
//       </div>
//       <div className={`${classes.homeSection} ${isOpen ? "" : "close"}`}>
//         <div className={classes.homeContent}>
//           <IconButton onClick={toggleSidebar}>
//             <MenuIcon />
//           </IconButton>
//           <span className="text">Drop Down Sidebar</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebarnew;
