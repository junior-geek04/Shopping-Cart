import React, { useState } from "react";

const ItemInfo = (props) => {
  const [isReadMoreShown, setIsReadMoreShown] = useState(false);
  let { title, description, price } = props;

  return (
    <div>
      <div className="col-12 col-md-12 col-lg-12 item-data">
        <div className="main-title pt-4 pb-3">
          <h5>{title}</h5>

          {isReadMoreShown ? description : description.slice(0, 150)}
          <span onClick={() => setIsReadMoreShown(!isReadMoreShown)}>
            {" "}
            {isReadMoreShown ? "... show less" : "... Read more"}
          </span>
        </div>
        <div className="menu-price-book">
          <div className="price-book-divide d-flex justify-content-between ">
            <h2>Price : {price}$ </h2>
       
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemInfo;
