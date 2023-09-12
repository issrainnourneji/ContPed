import React from "react";
import { Card, Image } from "react-bootstrap";

//image
import user1 from "../../../../assets/images/user/01.jpg";
import user2 from "../../../../assets/images/user/02.jpg";
import user3 from "../../../../assets/images/user/03.jpg";
import user4 from "../../../../assets/images/user/04.jpg";
import user5 from "../../../../assets/images/user/11.jpg";
import user6 from "../../../../assets/images/user/12.jpg";

const RightSidebar = () => {
  const minirightsidebar = () => {
    document.getElementById("rightSidebar").classList.toggle("right-sidebar");
    document.body.classList.toggle("right-sidebar-close");
  };
  return <></>;
};

export default RightSidebar;
