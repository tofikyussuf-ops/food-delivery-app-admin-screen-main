import React, { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const url = "http://localhost:4000";

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    /* .add styling */
    <div className="w-[70%] ml-[max(5vw,25px)] mt-[50px] text-[#6d6d6d] text-base">
      <form className="flex flex-col gap-5" onSubmit={onSubmitHandler}>
        {/* .add-img-upload styling */}
        <div className="flex flex-col gap-2">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              className="w-[120px] cursor-pointer"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* .add-product-name styling */}
        <div className="flex flex-col gap-2">
          <p>Product name</p>
          <input
            className="w-[max(40%,280px)] p-2.5 border border-[#a9a9a9] outline-none rounded-sm"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>

        {/* .add-product-description styling */}
        <div className="flex flex-col gap-2">
          <p>Product description</p>
          <textarea
            className="w-[max(40%,280px)] p-2.5 border border-[#a9a9a9] outline-none rounded-sm"
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          />
        </div>

        {/* .add-category-price styling */}
        <div className="flex gap-[30px]">
          <div className="flex flex-col gap-2">
            <p>Product category</p>
            <select
              className="max-w-[120px] p-2.5 border border-[#a9a9a9] outline-none rounded-sm"
              onChange={onChangeHandler}
              name="category"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <p>Product Price</p>
            <input
              className="max-w-[120px] p-2.5 border border-[#a9a9a9] outline-none rounded-sm"
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="$20"
              required
            />
          </div>
        </div>

        {/* .add-btn styling */}
        <button
          type="submit"
          className="max-w-[120px] border-none p-2.5 bg-black text-white cursor-pointer active:bg-[#333]"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
