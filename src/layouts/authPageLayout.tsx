import image from "../assets/login.png";

const AuthPageLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Image Section */}
      <div className="hidden md:flex w-2/3 bg-gray-100 justify-center items-center p-4 border-r border-gray-300">
        <img src={image} alt="Login" className="object-contain h-96 w-auto" />
      </div>

      {/* Right Login Form Section */}
      <div className="flex flex-1 justify-center items-center p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Welcome Back</h2>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account? <a href="#" className="text-blue-500">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPageLayout;
