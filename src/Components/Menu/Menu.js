import "./menu.css";

import React, { useState } from "react";

import { Link } from "react-router-dom";

const items = [
  {
    text: "Today",
    path: "/"
  },
  {
    text: "Schedule",
    path: "/schedule"
  },
  {
    text: "Next 5 days",
    path: "/next"
  }
];

const Menu = () => {
  const [selected, setSelected] = useState(0);

  const handleClick = index => {
    setSelected(index);
  };

  const listItems = items.map((item, index) => (
    <Link to={item.path}>
      <li
        key={item}
        onClick={() => {
          handleClick(index);
        }}
        className={`${selected === index ? "selected pa-1" : "pa-1"}`}
      >
        {item.text}
      </li>
    </Link>
  ));

  return (
    <div className={"menu-bar"}>
      <ul>{listItems}</ul>
    </div>
  );
};

export default Menu;
