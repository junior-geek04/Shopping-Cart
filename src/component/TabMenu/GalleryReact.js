import React, { useEffect, useState } from "react";
import "../TabMenu/tab.css";
import ItemInfo from "./ItemInfo";
import Menu from "./menu";
import Button from '@mui/material/Button';  
import { VictoryPie } from "victory-pie";
const GalleryReact = () => {
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [modal,setModal]=useState(false);
  const fetchData = () => {
    let url =
      category === "all"
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/category/${category}`;
    fetch(url)
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("server responded with error");
        }
        return res.json();
      })
      .then(
        (json) => {
          console.log(json);
          setItems(json);
          setData(json)
        },
        (err) => {
          console.log(err);
        }
      );
  };

  let fetchCategories = () => {
    let url = "https://fakestoreapi.com/products/categories";
    fetch(url)
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("server responded with error");
        }
        return res.json();
      })
      .then(
        (json) => {
          console.log(json);
          setCategories(json);
        },
        (err) => {
          console.log(err);
        }
      );
  };
  // const filterItem = (categItem) => {
  //   console.log(categItem)
  //   if (categItem === "all"){
  //     setItems(data)
  //     return
  //   }
  //   console.log("called cateegory");
  //   const updatedItems = data.filter((curElem) => {
  //     return curElem.category === categItem;
  //   });

  //   setItems(updatedItems);

  // };

  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(()=>{
    fetchData();
  },[category])

  const searchItem = () => {
    const newItem = data.filter((val) => {
      if(searchTerm == ""){
        return val;
      }else if(val.title?.toLowerCase().includes(searchTerm?.toLowerCase())){
        return val;
        
      }
    })
    setItems(newItem)
  }
  const myData = [
    { x: "electronics", y: 9 },
    { x: "jewelery", y: 4 },
    { x: "womens wear", y: 3},
  ];
  const chartPie=()=>{
    console.log("called")
    setModal(!modal)


  };

  return (
    <>
       
      <h1 className="mt-5 text-center main-heading">
        Order Your Product
      </h1>
      <hr />
      <div className="but" >
        <Button variant="contained" className="but1" onClick={chartPie }>ANALYSE</Button>  
        {modal && (
        <div className="modal">
          <div onClick={chartPie} className="overlay"></div>
          <div className="modal-content">
          <div style={{ height: 620 }}>
        <VictoryPie
          data={myData}
          colorScale={["blue", "yellow", "red"]}
          radius={100}
        />
      </div>
            <button className="close-modal" onClick={chartPie}>
              CLOSE
            </button>
          </div>
        </div>
      )}</div>
      <div className="towards">
      <div className="templateContainer">
        <div className="searchInput_Container">
          <input id="searchInput" type="text" placeholder="Search here..." onChange={(event) => {
            setSearchTerm(event.target.value);
            searchItem()
          }} />
        </div>
      </div>
      <div className="menu-tabs container">
        <div className="menu-tab d-flex justify-content-around">
          {categories ? (
            <select className="menu"
              onChange={(e) => {
                console.log(e.target.value)
                setCategory(e.target.value);
              }}
            >
            {categories.map((elem)=>{
              return (<option
                value={elem}
              >
               {elem}
              </option>)
            })}
              <option
                value="all"
              >
                All
              </option>
            </select>
          ) : (
            <div>Loading....</div>
          )}
        </div>
      </div>
</div>
      {/* my main items section  */}
      <div className="menu-items container-fluid mt-5">
        <div className="row">
          <div className="col-11 mx-auto">
            <div className="row my-5">
              {items ? (
                items.map((elem) => {
                  const { id, title, image, description, price, category } =
                    elem;

                  return (
                    <div className="col-12 col-md-6 col-lg-6 col-xl-4 my-5 item-box">
                      <div className="img-div">
                        <img src={image} alt={title} className="img-fluid" />
                      </div>
                      <div className="row Item-inside">
                        {/* for images */}

                        {/* menu items description */}

                        <ItemInfo
                          title={title}
                          description={description}
                          price={price}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
       
        </div>
        
  
      </div>
   
    </>
  );
};

export default GalleryReact;