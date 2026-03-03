 const SystemAdminDashboard = () => {
  return (
    <div className="p-8 space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            System Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Platform overview and tenant management
          </p>
        </div>

        <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700">
          + Create New Tenant
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Tenants" value="24" />
        <StatCard title="Active Tenants" value="21" />
        <StatCard title="Total Users" value="3,482" />
        <StatCard title="Active Users (30d)" value="2,910" />
      </div>

      {/* System Health & Storage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm text-gray-500 font-medium">
              System Health
            </h3>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              Healthy
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Uptime</p>
              <p className="text-xl font-bold text-gray-900 mt-1">
                99.98%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Connections</p>
              <p className="text-xl font-bold text-gray-900 mt-1">
                342
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-sm text-gray-500 font-medium mb-4">
            Storage Usage
          </h3>

          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Used</span>
              <span className="font-medium text-gray-900">68%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full w-[68%]"></div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            680GB of 1TB used
          </p>
        </div>

      </div>

      {/* Alerts */}
      <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
        <h3 className="text-sm font-semibold text-yellow-800 mb-3">
          Attention Required
        </h3>

        <ul className="space-y-2 text-sm text-yellow-900">
          <li>⚠️ 2 tenants exceeded storage limits</li>
          <li>⚠️ 1 tenant inactive for 60+ days</li>
          <li>⚠️ 3 deactivated users this week</li>
        </ul>
      </div>

      {/* Tenant Overview Table */}
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Tenant Overview
          </h2>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tenant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Users
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Storage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                Acme Corp
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                Pro
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                42
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                72%
              </td>
              <td className="px-6 py-4 text-sm text-green-600 font-medium">
                Active
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Platform Activity
        </h2>

        <ul className="space-y-3 text-sm text-gray-700">
          <li>John Admin created a new tenant</li>
          <li>System settings updated</li>
          <li>Tenant "TechNova" upgraded to Pro plan</li>
          <li>3 users were deactivated</li>
        </ul>
      </div>

    </div>
  );
};

export default SystemAdminDashboard;

/* Reusable Card */
const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-white border rounded-xl shadow-sm p-6">
    <h3 className="text-sm text-gray-500">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 mt-2">
      {value}
    </p>
  </div>
);