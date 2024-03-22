import { PropertyValues } from "./types";

const Details = ({
  PictureURL,
  Bedrooms,
  Bathrooms,
  Parking,
  YearBuilt,
  Sqft,
  Description,
  Id,
}: PropertyValues) => {
  return (
    <div key={`__details_${Id}`} className="flex flex-col w-full h-full p-2">
      <figure className="mb-1">
        <img src={PictureURL} alt="item!" className="w-full object-cover" />
      </figure>
      <div className="p-1 flex justify-center gap-1 items-center border border-gray-500">
        <div className="flex flex-col justify-center items-center">
          <div className="font-bold">{Bedrooms}</div>
          <div className="uppercase">Bed</div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="font-bold">{Bathrooms}</div>
          <div className="uppercase">Bath</div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="font-bold">{Parking}</div>
          <div className="uppercase">Parking</div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="font-bold">{Sqft}</div>
          <div className="uppercase">Sqft</div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="font-bold">{YearBuilt}</div>
          <div className="uppercase">Year Built</div>
        </div>
      </div>
      <div className="flex text-balance text-gray-400">{Description}</div>
    </div>
  );
};

export default Details;
