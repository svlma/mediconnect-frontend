import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const CheckoutSuccess = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center py-10 ">
      <div className="bg-white p-6 md:w-2/3 lg:w-1/2 rounded-lg shadow-lg">
        <div className="flex justify-center my-6">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
            <FaCheck color="white" size={20} />
          </div>
        </div>
        <div className="text-center">
          <h3 className="md:text-2xl text-xl text-gray-900 font-semibold">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your online payment.
          </p>
          <p className="text-gray-600">Have a great day!</p>
          <div className="py-10 text-center">
            <Link
              to="/home"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Go Back To Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
