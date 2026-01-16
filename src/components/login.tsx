
import { Link } from "react-router-dom";
const login = () => {
    const login = () =>{
        localStorage.setItem("tenantId", "695ff1f95edfddfea9b86d5b");
    }
    return (
        <>
            <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back to Login Page</h2>
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
                    onClick={login}
                >
                    Login
                </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
                Don't have an account? {" "}
                <Link to="/auth/Register" className="text-blue-500">
                    Sign up
                </Link>
            </p>

        </>

    );
}
export default login;