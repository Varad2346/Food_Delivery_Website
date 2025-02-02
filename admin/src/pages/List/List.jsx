import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";

const List = () => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`http://localhost:3000/api/food/list`);
    if (response.data.success) {
      console.log(response.data);
      setList(response.data.data);
    } else {
      console.log("failed");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  const removeFood=async(foodId)=>{
    const response=await axios.post(`http://localhost:3000/api/food/remove`,{_id:foodId});
    console.log(response);
    if(response.data.success){
        const updatedList=list.filter((item)=>{
            return item._id!==foodId
        })
        setList(updatedList);
    }
  }



  return (
    <div className="list add flex-col">
      <p>Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
            return(
                <div key={index} className="list-table-format">
                    <img src={`http://localhost:3000/images/`+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>${item.price}</p>
                    <p onClick={()=>removeFood(item._id)} className="cursor">X</p>
                </div>
            )
        })

        }
      </div>
    </div>
  );
};

export default List;
