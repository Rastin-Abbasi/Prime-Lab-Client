import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import useTests from "../../../Hooks/useTests";
import LoadingSpinner from "../../../Components/Shared/LoadingSpinner";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateTests = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [tests , isLoading] = useTests();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  if(isLoading) return <LoadingSpinner></LoadingSpinner>
  console.log(id, tests);
  const test = tests.find(test => test._id === id);
  console.log(test);
  // const {_id} = test;
 
  
  const onSubmit = async (data) => {
    setLoading(true);
    const imageFile = { image: data.photo[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "content-type": "multipart/form-data" },
    });
    if (res.data.success) {
      const testItem = {
        title: data.title,
        category: data.category,
        shortDescription: data.shortDescription,
        details: data.details,
        date: startDate.toLocaleDateString(),
        slots: data.slots,
        price: parseFloat(data.price),
        image: res.data.data.display_url,
      };
      const testRes = await axiosSecure.patch(`/test/${test._id}`, testItem);
      console.log(testRes.data);
      if (testRes.data.modifiedCount > 0) {
        setLoading(false);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${test.title} Updated Successfully`,
            showConfirmButton: false,
            timer: 1500
          });
        navigate("/dashboard/allTests");
      }
    }
  };
  return (
    <div className="">
      <div className="hero min-h-screen bg-base-200 lg:px-20">
        <div className="card w-full bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
            <div>
              <p className="text-4xl  font-medium text-[#2d3663] ">
                Add a test
              </p>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title*</span>
              </label>
              <input
                type="text"
                defaultValue={test.title}
                placeholder="title"
                {...register("title", { required: true })}
                className="input input-bordered"
                required
              />
              {errors.title && (
                <p className="text-red-600">This field is required</p>
              )}
            </div>
            <div className="md:flex   gap-5 ">
              <div className="form-control flex-grow">
                <label className="label">
                  <span className="label-text">Price*</span>
                </label>
                <input
                  type="number"
                  step=".01"
                  defaultValue={test.price}
                  placeholder="price"
                  {...register("price", { required: true })}
                  className="input input-bordered"
                  required
                />
                {errors.price && (
                  <p className="text-red-600">This field is required</p>
                )}
              </div>
              <div className="form-control flex-grow">
                <label className="label">
                  <span className="label-text">Category*</span>
                </label>
                <select
                  className="input  input-bordered "
                  {...register("category", { required: true })}
                  defaultValue={test.category}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="Haematology">Haematology</option>
                  <option value="Biochemistry">Biochemistry</option>
                  <option value="Endocrinology">Endocrinology</option>
                  <option value="Microbiology">Microbiology</option>
                  <option value="Immunology and Serology">
                    Immunology and Serology
                  </option>
                  <option value="Clinical Pathology">Clinical Pathology</option>
                  <option value="Cytology and Histopathology">
                    Cytology and Histopathology
                  </option>
                  <option value="Molecular Diagnostics">
                    Molecular Diagnostics
                  </option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Gastroenterology">Gastroenterology</option>
                  <option value="Nephrology">Nephrology</option>
                  <option value="Oncology">Oncology</option>
                </select>
                {errors.category && (
                  <p className="text-red-600">This field is required</p>
                )}
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                required
                id="image"
                accept="image/*"
                {...register("photo", { required: true })}
                type="file"
                className="file-input file-input-bordered w-full "
              />

              {errors.photo && (
                <p className="text-red-600">This field is required</p>
              )}
            </div>

            <div className="md:flex  gap-5">
              <div className="form-control flex-grow">
                <label className="label">
                  <span className="label-text">Date*</span>
                </label>
                <DatePicker
                defaultValue={test.date}
                  className="input input-bordered w-full"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>

              <div className="form-control flex-grow">
                <label className="label">
                  <span className="label-text">Slots</span>
                </label>
                <input
                  type="number"
                  defaultValue={test.slots}
                  placeholder="slots"
                  {...register("slots", { required: true })}
                  className="input input-bordered"
                  required
                />
                {errors.slots && (
                  <p className="text-red-600">This field is required</p>
                )}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Short Description</span>
              </label>
              <input
                type="text"
                placeholder="short description"
                defaultValue={test.shortDescription}
                className="textarea textarea-bordered"
                {...register("shortDescription", {
                  required: true,
                })}
                required
              />
              {errors.shortDescription && (
                <p className="text-red-600">This field is required</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Details</span>
              </label>
              <textarea
                type="text"
                placeholder="details"
                defaultValue={test.details}
                rows={5}
                className="textarea textarea-bordered"
                {...register("details", {
                  required: true,
                })}
                required
              />
              {errors.details && (
                <p className="text-red-600">This field is required</p>
              )}
            </div>

            <div className="form-control mt-6">
              <button
                  disabled={loading}
                type="submit"
                className="btn rounded-full px-6 border-none dark:bg-[#2d3663] dark:text-gray-50
            hover:text-[#2d3663] hover:bg-gray-50"
              >
                {loading ? (
                  <FaSpinner className="animate-spin m-auto"></FaSpinner>
                ) : (
                  "Save and Continue"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTests;
