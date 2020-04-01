import "./menu.css";

import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

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
    classes: "ml-5",
    path: "/next"
  }
];

const Menu = () => {
  const location = useLocation().pathname;

  const [selected, setSelected] = useState(location);

  useEffect(() => {
    setSelected(location);
  }, [location]);

  const handleClick = index => {
    setSelected(items[index].path);
  };

  const listItems = items.map((item, index) => (
    <Link
      to={item.path}
      onClick={() => {
        handleClick(index);
      }}
    >
      <li
        key={`${item.text}-${item.path}`}
        onClick={() => {
          handleClick(index);
        }}
        className={`${item.classes ? item.classes : ""} ${
          selected === item.path ? "selected pa-1" : "pa-1"
        }`}
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
