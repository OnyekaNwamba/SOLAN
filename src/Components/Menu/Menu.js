import React,{useState} from "react";
import './menu.css';

const items = ["Today","Schedule","Next 5 days"];
function MenuList(props)
{
    const listItems = props.items.map((item) =>
        <li key={item}>{item}</li>
    );
    return (
        <ul>{listItems}</ul>
    );
}
const Menu = () => {
	const [selected,setSelected] = useState(0);


	return(
            <div className={"menu-bar"}>
                <MenuList items={items}/>
                {/*{ items.map((item,index) =>  <p key={index} className={`${selected==index ? 'current':''}`} onClick={()=> {setSelected(index)}}> {item}</p> )}*/}

</div>
      
        );
};

export default Menu;