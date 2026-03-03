const OrgAdminDashboard = ()=>{
    return (
      <div className="p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Organization Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your company and employees
          </p>
        </div>
    
        {/* Company Info */}
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Company Details
          </h2>
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Company Name</span>
              <p className="font-medium text-gray-900">Acme Corp</p>
            </div>
    
            <div>
              <span className="text-gray-500">Industry</span>
              <p className="font-medium text-gray-900">Technology</p>
            </div>
    
            <div>
              <span className="text-gray-500">Total Employees</span>
              <p className="font-medium text-gray-900">42</p>
            </div>
    
            <div>
              <span className="text-gray-500">Created On</span>
              <p className="font-medium text-gray-900">Jan 10, 2024</p>
            </div>
          </div>
        </div>
    
        {/* Users Section */}
        <div className="bg-white border rounded-xl shadow-sm">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Employees
            </h2>
    
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm">
              + Add Employee
            </button>
          </div>
    
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
              </tr>
            </thead>
    
            <tbody className="divide-y">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  John Doe
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  john@example.com
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Employee
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
}
export default OrgAdminDashboard;
