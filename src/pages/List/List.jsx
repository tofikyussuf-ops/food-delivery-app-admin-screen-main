import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        // Ensure we are accessing the right data property
        setList(response.data.data || response.data.message);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      toast.error("Network Error");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error removing item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    // .list .add styling
    <div className="w-[70%] ml-[max(5vw,25px)] mt-[50px] text-[#6d6d6d] flex flex-col gap-4">
      <p className="font-semibold text-lg">All Foods List</p>

      <div className="flex flex-col border border-[#cacaca]">
        {/* Table Header: .list-table-format.title */}
        {/* Hidden on mobile, grid on medium screens and up */}
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-[10px] py-[12px] px-[15px] border-b border-[#cacaca] bg-[#f9f9f9] text-[13px]">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* Table Body */}
        {list?.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-[15px] md:gap-[10px] py-[12px] px-[15px] border-b border-[#cacaca] text-[13px] last:border-b-0"
            >
              <img
                className="w-[50px] rounded"
                src={`${url}/images/` + item.image}
                alt={item.name}
              />
              <p>{item.name}</p>
              <p className="hidden md:block">{item.category}</p>
              <p className="hidden md:block">${item.price}</p>
              <p
                className="cursor-pointer text-red-500 font-bold hover:scale-110 transition-transform"
                onClick={() => removeFood(item._id)}
              >
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
