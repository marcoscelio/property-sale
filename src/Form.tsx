import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { ContactValues } from "./types";
import { AppDispatch } from "./state/store";
import { useDispatch } from "react-redux";
import { addContact } from "./state/property/propertySlice";

const contactSchema = Yup.object().shape({
  propertyId: Yup.number().required(),
  fullname: Yup.string().required(),
  email: Yup.string().email().required(),
  phoneNumber: Yup.string().required(),
  comments: Yup.string().required(),
});

interface FormProps {
  propertyId: number;
}

const Form = ({ propertyId }: FormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const formOptions = {
    resolver: yupResolver(contactSchema),
    defaultValues: { propertyId },
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>(formOptions);

  const onSubmit: SubmitHandler<ContactValues> = async (data) => {
    console.log(data);
    dispatch(addContact(data));
    reset({
      fullname: "",
      email: "",
      phoneNumber: "",
      comments: "",
    });
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-300 border border-gray-400">
      <div className="text-gray-600 font-bold text-lg text-center m-3">
        Contact Agent
      </div>
      <div className="flex flex-col w-full h-full items-end pr-3 pt-1 gap-1 pb-2">
        <input
          type="text"
          placeholder="Full Name *"
          className="input input-bordered input-info w-full max-w-xs bg-white"
          {...register("fullname")}
        />
        <div className="text-xs text-red-600">{errors?.fullname?.message}</div>
      </div>
      <div className="flex flex-col w-full h-full items-end pr-3 gap-1 pb-2">
        <input
          type="email"
          placeholder="Email*"
          className="input input-bordered input-info w-full max-w-xs bg-white"
          {...register("email")}
        />
        <div className="text-xs text-red-600">{errors?.email?.message}</div>
      </div>
      <div className="flex flex-col w-full h-full items-end pr-3 gap-1 pb-2">
        <input
          type="number"
          placeholder="Phone Number*"
          className="input input-bordered input-info w-full max-w-xs bg-white"
          {...register("phoneNumber")}
        />
        <div className="text-xs text-red-600">
          {errors?.phoneNumber?.message}
        </div>
      </div>
      <div className="flex flex-col w-full h-full items-end pr-3 gap-1 pb-2">
        <textarea
          className="textarea textarea-info bg-white"
          placeholder="Comments*"
          {...register("comments")}
        ></textarea>
        <div className="text-xs text-red-600">{errors?.comments?.message}</div>
      </div>

      <div className="flex justify-center pr-3 pt-3 pb-3">
        <button
          className="btn btn-info text-white"
          onClick={handleSubmit(onSubmit)}
        >
          Contact Now
        </button>
      </div>
    </div>
  );
};

export default Form;
