import Details from "./Details";
import Form from "./Form";
import HeaderDetails from "./HeaderDetails";
import { PropertyValues } from "./types";
import { currencyUtils } from "./utils";

const Item = (item: PropertyValues) => {
  return (
    <div key={`item_${item.Id}`} className="card glass w-32 text-xs h-96 ">
      <figure className="min-h-20">
        <img src={item.PictureURL} alt="property!" className="object-contain" />
      </figure>
      <div className="card-body p-2">
        <div className="flex flex-col items-start justify-start w-full min-h-28 ">
          <h2 className="card-title text-sm"> {item.Title}</h2>
          <div>{item.Location}</div>
          <div className="text-gray-400">{`${item.Bedrooms} bed${
            item.Bedrooms > 1 ? "s" : ""
          } | ${item.Bathrooms} bath${item.Bathrooms > 1 ? "s" : ""}`}</div>
          <div className="text-lg text-white">
            {item.SalePrice && currencyUtils.format(item.SalePrice)}
          </div>
        </div>
        <div className="card-actions justify-end h-full">
          <div className="flex items-center justify-center w-full h-full">
            <button
              className="btn btn-primary"
              onClick={() =>
                (
                  document.getElementById(
                    `details_modal_${item.Id}`
                  ) as HTMLDialogElement
                )?.showModal()
              }
            >
              View Details
            </button>
          </div>
        </div>
        <dialog
          id={`details_modal_${item.Id}`}
          className="modal modal-middle bg-white"
        >
          <div className="flex flex-col sm:w-1/2 gap-1">
            <HeaderDetails key={`header_details_2_${item.Id}`} {...item} />
            <div className="flex gap-1">
              <Details {...item} />

              <Form key={item.Id} propertyId={item.Id} />
            </div>
            <div className="flex justify-center">
              <form method="dialog">
                <button className="btn btn-info text-white">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Item;
