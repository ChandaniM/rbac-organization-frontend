import { Link } from "react-router-dom";
const Register = () => {
    return (
        <>
                <h2 className="text-2xl font-bold mb-6 text-center">Create an new Account - Register</h2>
            <form action="">
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your username"
                    />
                </div>
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
                 <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
                       Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"       
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Register
                </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account?{" "}
                <Link to="/auth/login" className="text-blue-500">
                    Login
                </Link>
            </p>
            
        </>
    );
}
export default Register;