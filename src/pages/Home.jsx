import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Task Management
      </h1>

      <button
        onClick={() => navigate("/dashboard")}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Go to Dashboard
      </button>
      <button
        onClick={() => navigate("/tasks")}
        className="px-6 py-3 my-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Go to Tasks
      </button>
    </div>
  );
};

export default Home;
