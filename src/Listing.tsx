import { useEffect, useState } from "react";
import Item from "./Item";
import { useGetPropertiesQuery } from "./state/api/api";
import { PropertyValues } from "./types";
import {
  getMaxBathRooms,
  getMaxBedRooms,
  getMaxParking,
  getMaxPrice,
} from "./utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { AppDispatch, RootState } from "./state/store";
import { useDispatch, useSelector } from "react-redux";
import {
  searchProperties,
  setProperties,
} from "./state/property/propertySlice";

type Inputs = {
  beds: number;
  baths: number;
  parking: number;
  price: number;
};

function Listing() {
  const [maxBeds, setMaxBeds] = useState(0);
  const [maxBaths, setMaxBaths] = useState(0);
  const [maxParking, setMaxParking] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const { data, isLoading, error } = useGetPropertiesQuery();
  const { propertiesFiltered: properties } = useSelector(
    (state: RootState) => state.property
  );

  useEffect(() => {
    if (data?.length) {
      dispatch(setProperties(data));
      setMaxBaths(getMaxBathRooms(data).Bathrooms);
      setMaxBeds(getMaxBedRooms(data).Bedrooms);
      setMaxPrice(getMaxPrice(data)["Sale Price"] || 0);
      setMaxParking(getMaxParking(data).Parking);
    }
  }, [data]);

  const { register, handleSubmit, watch } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(searchProperties(data));
  };

  if (isLoading) {
    return <span className="loading loading-infinity loading-xs"></span>;
  }
  if (error) {
    return (
      <div role="alert" className="alert alert-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>New software update available.</span>
      </div>
    );
  }

  return (
    <div key="listing" className="flex flex-col h-screen">
      <div className="flex gap-2 justify-center items-center">
        <div className="flex gap-2 justify-center items-center flex-wrap border border-gray-200 rounded-md p-1">
          <div className="flex gap-2 justify-center items-center">
            <div>Bedrooms</div>
            <select
              className="select select-bordered select-lg w-full max-w-xs"
              {...register("beds")}
            >
              {Array(maxBeds)
                .fill(0)
                .map((_, value) => (
                  <option key={`Index_${value}_it`}>{value}</option>
                ))}
            </select>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <div>Bathrooms</div>
            <select
              className="select select-bordered select-lg w-full max-w-xs"
              {...register("baths")}
            >
              {Array(maxBaths)
                .fill(0)
                .map((_, value) => (
                  <option key={value}>{value}</option>
                ))}
            </select>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <div>Parking</div>
            <select
              className="select select-bordered select-lg w-full max-w-xs"
              {...register("parking")}
            >
              {Array(maxParking)
                .fill(0)
                .map((_, value) => (
                  <option key={value}>{value}</option>
                ))}
            </select>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <div>Price Range</div>
            <input
              type="range"
              min={0}
              max={maxPrice}
              className="range range-info"
              {...register("price")}
            />
            <div>{watch("price")}</div>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <button className="btn btn-info" onClick={handleSubmit(onSubmit)}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-2 justify-center">
        <div className="flex gap-2 items-center justify-center sm:justify-start flex-wrap max-lg m-1">
          {properties?.map((item: PropertyValues) => {
            const props = {
              ...item,
              SalePrice: item["Sale Price"],
            };
            return <Item key={item.Id} {...props} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Listing;
