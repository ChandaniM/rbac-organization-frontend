// const UserTable = () => {
//   const users = [
//     { id: 4037, contractType:"full-time", name: "Dipak Deb Nath", email: "dipak.uiux@gmail.com", status: "Active", designation: "Super Admin", code: "0121", role: "Admin" },
//     { id: 4037, contractType:"part-time", name: "Pappu Baidya", email: "dipak.uiux@gmail.com", status: "Active", designation: "Manager", code: "0121", role: "Admin" },
//     { id: 4037, contractType:"Intership", name: "Shipon Mohanta", email: "dipak.uiux@gmail.com", status: "Active", designation: "Trainer", code: "0121", role: "Instructor" },
//   ];

//   return (
//       <div className="overflow-x-auto bg-white border rounded-b-lg">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="border-b text-sm font-semibold text-gray-600">
//               <th className="p-4"><input type="checkbox" className="rounded" /></th>
//               <th className="p-4">User Name</th>
//               <th className="p-4">User Id</th>
//               <th className="p-4">Status</th>
//               <th className="p-4">Designation</th>
//               <th className="p-4">Employee Code</th>
//               <th className="p-4">Contract Type</th>
//               <th className="p-4">Role</th>
//             </tr>
//           </thead>
//           <tbody className="text-sm text-gray-700">
//             {users.map((user, index) => (
//               <tr key={index} className="border-b hover:bg-gray-50 transition">
//                 <td className="p-4"><input type="checkbox" checked className="accent-emerald-500" /></td>
//                 <td className="p-4 flex items-center gap-3">
//                   <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
//                     <img src={`https://ui-avatars.com/api/?name=${user.name}`} alt="avatar" />
//                   </div>
//                   <div>
//                     <div className="font-medium text-gray-900">{user.name}</div>
//                     <div className="text-xs text-gray-400">{user.email}</div>
//                   </div>
//                 </td>
//                 <td className="p-4">{user.id}</td>
//                 <td className="p-4"><span className="text-emerald-600 font-medium">{user.status}</span></td>
//                 <td className="p-4">{user.designation}</td>
//                 <td className="p-4">{user.code}</td>
//                 <td className="p-4">{user.contractType}</td>
//                 <td className="p-4">{user.role}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//   );
// };

// export default UserTable;

const UserTable = () => {
  const users = [
    {
      id: 4037,
      name: "Dipak Deb Nath",
      email: "dipak.uiux@gmail.com",
      status: "Active",
      designation: "Super Admin",
      code: "0121",
      role: "Admin",
    },
    {
      id: 4037,
      name: "Pappu Baidya",
      email: "dipak.uiux@gmail.com",
      status: "Active",
      designation: "Manager",
      code: "0121",
      role: "Admin",
    },
    {
      id: 4037,
      name: "Shipon Mohanta",
      email: "dipak.uiux@gmail.com",
      status: "Active",
      designation: "Trainer",
      code: "0121",
      role: "Instructor",
    },
  ];

  return (
    <div className='overflow-x-auto bg-white border rounded-b-lg'>
      <table className='w-full text-left border-collapse'>
        <thead>
          <tr className='border-b text-sm font-semibold text-gray-600'>
            <th className='p-4'>
              <input
                type='checkbox'
                className='w-4 h-4 rounded border-gray-300 accent-emerald-500'
              />
            </th>
            <th className='p-4'>User Name</th>
            <th className='p-4'>User Id</th>
            <th className='p-4'>Status</th>
            <th className='p-4'>Designation</th>
            <th className='p-4'>Employee Code</th>
            <th className='p-4'>Role</th>
            <th className='p-4 text-right'>Manage</th>
          </tr>
        </thead>

        <tbody className='text-sm text-gray-700'>
          {users.map((user, index) => (
            <tr key={index} className='border-b hover:bg-gray-50 transition'>
              <td className='p-5'>
                <input
                  type='checkbox'
                  checked
                  className='w-4 h-4 rounded accent-emerald-500'
                />
              </td>

              <td className='p-5'>
                <div className='flex items-center gap-3'>
                  <div className='w-9 h-9 rounded-full bg-gray-200 overflow-hidden'>
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.name}`}
                      alt={user.name}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div>
                    <div className='font-medium text-gray-900'>{user.name}</div>
                    <div className='text-xs text-gray-400'>{user.email}</div>
                  </div>
                </div>
              </td>

              <td className='p-5'>{user.id}</td>

              <td className='p-5'>
                <span className='px-3 py-1 text-xs rounded-full bg-emerald-50 text-emerald-600 font-medium'>
                  {user.status}
                </span>
              </td>

              <td className='p-5'>{user.designation}</td>
              <td className='p-5'>{user.code}</td>
              <td className='p-5'>{user.role}</td>

              <td className='p-5'>
                <div className='flex justify-end gap-4 text-gray-400'>
                  <button className='hover:text-emerald-600'>✏️</button>
                  <button className='hover:text-red-500'>🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
