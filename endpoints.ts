const endpoints = {
    getAllJobs: '/getJob',
    addNewJob:'/add',
    login : '/login',
    organizationwithuser : '/organizationwithuser',
    organizationData:"/getAllOrg",
    organization: (id: string) => `/organization/${id}`,
    dashboard:"/dashboard",
    testEmail: '/notifications/test-email',
  };
  
  export default endpoints;