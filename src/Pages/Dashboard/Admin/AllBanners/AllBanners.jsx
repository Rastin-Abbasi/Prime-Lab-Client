import Swal from "sweetalert2";
import LoadingSpinner from "../../../../Components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useBanners from "../../../../Hooks/useBanners";
import { FaSpinner } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

const AllBanners = () => {
  const [banners, loading, refetch] = useBanners();
  const axiosSecure = useAxiosSecure()
  if (loading) {
    return <LoadingSpinner />;
  }

  const handleActivate= (banner) => {
    axiosSecure.patch(`/banners/${banner._id}`)
    .then((res) => {
      if (res.data.modifiedCount > 0) {
        
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${banner.title} is set active`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  }
  const handleDeleteBanner = async (banner) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2d3663",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/banners/${banner._id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${banner.title} deleted successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <div className="my-10">
      <div className="overflow-x-auto">
     < div>
          <p className="text-4xl  font-medium text-[#2d3663] ">All banners</p>
        </div>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                #
              </th>
              <th>Image</th>
              <th>Title</th>
              <th>Coupon Code</th>
              <th>Discount Rate</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
           
            {
                banners.map((banner, index) => (
                    <tr key={banner._id}>
                    <th>
                      {index + 1}
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="rounded-lg w-24 h-24">
                            <img
                              src={banner.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        
                      </div>
                    </td>
                    <td>
                      {banner.title}
                      
                    </td>
                    <td>{banner.couponCode}</td>
                    <td>{banner.discountRate}</td>
                    <th>
                      {banner.isActive ? "Active" : <button   onClick={() => handleActivate(banner)} className="btn btn-ghost bg-green-500 text-white">Activate</button>}
                    </th>
                    <td>
                    <button
                    onClick={() => handleDeleteBanner(banner)}
                    className="btn bg-[#d90429] "
                  >
                    {loading ? (
                      <FaSpinner className="animate-spin m-auto"></FaSpinner>
                    ) : (
                      <FaTrashCan className="text-white"></FaTrashCan>
                    )}
                  </button>
                    </td>
                  </tr>
                ))
            }

          </tbody>
          
        </table>
      </div>
    </div>
  );
};

export default AllBanners;
