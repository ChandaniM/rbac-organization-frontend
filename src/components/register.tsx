import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    org: {
      name: "",
      display_name: "",
      description: "",
      status: "active",
      created_by: "super admin",
    },
    user: {
      email: "",
      username: "",
      password: "",
    },
  });

  const handleChange = (section, field, value) => {
    setForm((prev:any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // This payload matches backend expectation exactly
    const payload = {
      org: form.org,
      user: form.user,
    };

    console.log("Register Org Payload", payload);

    // TODO: POST to /api/system/register-org
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-1">Register Organization</h1>
        <p className="text-sm text-gray-500 mb-6">
          Create an organization and its first admin user
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Organization Section */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Organization Details</h2>

            <input
              className="w-full border rounded-lg p-2"
              placeholder="Organization Name"
              value={form.org.name}
              onChange={(e) => handleChange("org", "name", e.target.value)}
              required
            />

            <input
              className="w-full border rounded-lg p-2"
              placeholder="Display Name"
              value={form.org.display_name}
              onChange={(e) => handleChange("org", "display_name", e.target.value)}
              required
            />

            <textarea
              className="w-full border rounded-lg p-2"
              placeholder="Description"
              value={form.org.description}
              onChange={(e) => handleChange("org", "description", e.target.value)}
            />

            <select
              className="w-full border rounded-lg p-2"
              value={form.org.status}
              onChange={(e) => handleChange("org", "status", e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Admin User Section */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Admin User</h2>

            <input
              className="w-full border rounded-lg p-2"
              type="email"
              placeholder="Admin Email"
              value={form.user.email}
              onChange={(e) => handleChange("user", "email", e.target.value)}
              required
            />

            <input
              className="w-full border rounded-lg p-2"
              placeholder="Username"
              value={form.user.username}
              onChange={(e) => handleChange("user", "username", e.target.value)}
              required
            />

            <input
              className="w-full border rounded-lg p-2"
              type="password"
              placeholder="Password"
              value={form.user.password}
              onChange={(e) => handleChange("user", "password", e.target.value)}
              required
            />
          </div>

          <button className="w-full bg-black text-white rounded-xl py-2 hover:opacity-90">
            Create Organization
          </button>
        </form>
      </div>
    </div>
  );
}
