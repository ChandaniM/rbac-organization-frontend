import image from "../assets/login.png";

const AuthPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex w-2/3 bg-gray-100 justify-center items-center p-4 border-r border-gray-300">
        <img src={image} alt="Auth" className="object-contain h-96 w-auto" />
      </div>

      <div className="flex flex-1 justify-center items-center p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthPageLayout;
