import { format } from "date-fns";
import { CiCircleRemove, CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { PropertyValues } from "./types";
import { AppDispatch, RootState } from "./state/store";
import { likeProperty, unlikeProperty } from "./state/property/propertySlice";
import { currencyUtils } from "./utils";

const HeaderDetails = (item: PropertyValues) => {
  const { likes } = useSelector((state: RootState) => state.property);
  const dispatch = useDispatch<AppDispatch>();
  const handleLike = () => {
    dispatch(likeProperty(item));
  };

  const handleDislike = (id: number) => {
    dispatch(unlikeProperty(id));
  };

  return (
    <div
      key={`header_details_${item.Id}`}
      className="flex w-full h-full pb-2 p-2"
    >
      <div
        key={`header_details_child_1_${item.Id}`}
        className="sm:flex flex-col w-full hidden"
      >
        <div className="flex flex-col sm:flex-row justify-between w-full items-center h-5">
          <div className="font-bold sm:text-xs">{item.Title}</div>
          <div className="font-bold sm:text-xs">
            {item.SalePrice && currencyUtils.format(item.SalePrice)}
          </div>
        </div>
        <div className="flex justify-between w-full items-center h-5">
          <div className="text-sm sm:text-xs text-gray-400">
            {item.Location}
          </div>
          <div className="text-sm text-gray-400">
            Date listed: {format(item.DateListed, "MMM dd, yyyy")}
          </div>
        </div>
      </div>

      <div
        key={`header_details_child_2_${item.Id}`}
        className="sm:hidden flex flex-col w-full"
      >
        <div className="font-bold sm:text-xs">{item.Title}</div>
        <div className="font-bold sm:text-xs">
          {item.SalePrice && currencyUtils.format(item.SalePrice)}
          <div className="text-sm sm:text-xs text-gray-400">
            {item.Location}
          </div>
          <div className="text-sm text-gray-400">
            Date listed: {format(item.DateListed, "MMM dd, yyyy")}
          </div>
        </div>
      </div>

      <div className="card-actions justify-end w-full pr-3">
        <button
          className="btn btn-info text-white"
          onClick={() =>
            (
              document.getElementById(
                `save_property_modal_${item.Id}`
              ) as HTMLDialogElement
            )?.showModal()
          }
        >
          <CiHeart size={25} className="text-white" />
          Save Property
        </button>
      </div>
      <dialog
        id={`save_property_modal_${item.Id}`}
        className="modal modal-middle bg-white"
      >
        <div className="flex flex-col w-1/2 gap-1 justify-center items-center border border-gray-200 rounded-md">
          <div className="text-lg text-red-300 font-bold">Like List</div>
          {!likes.length && (
            <div className="text-gray-400 text-justify uppercase">
              Empty list
            </div>
          )}
          {likes.map((like: PropertyValues) => {
            return (
              <div
                key={`like_${like.Id}`}
                className="flex justify-between items-center p-3 w-1/2 "
              >
                <div className="flex gap-3 text-sm text-gray-400 items-center justify-center">
                  <div className="font-semibold">
                    <img src={like.ThumbnailURL} />
                  </div>
                  <div className="font-semibold">{like.Title}</div>
                  <div className="">{like.Location}</div>
                </div>

                <div
                  className="bg-white cursor-pointer pl-16"
                  onClick={() => handleDislike(like.Id)}
                >
                  <CiCircleRemove size={25} className="text-red-600" />
                </div>
              </div>
            );
          })}
          <div className="flex justify-center p-3 ">
            <form method="dialog">
              <div className="flex gap-3 min-h-11"></div>
              <div className="flex gap-3">
                <button className="btn btn-info text-white">Close</button>
                <button
                  className="btn btn-info text-white"
                  onClick={handleLike}
                >
                  Like
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default HeaderDetails;
