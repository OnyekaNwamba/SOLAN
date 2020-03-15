import "./menu.css";

import { Link, useLocation, useParams, useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { useStore } from "../../stores/root";

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
  const location = useLocation().pathname;

  const [selected, setSelected] = useState(location);

  useEffect(() => {
    setSelected(location);
  }, [location]);

  const handleClick = index => {
    setSelected(index);
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
        className={`${selected === item.path ? "selected pa-1" : "pa-1"}`}
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
