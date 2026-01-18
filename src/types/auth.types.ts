export interface IUser {
    id: string;
    username: string;
    email: string;
  }
  
 export  interface IOrg {
    name: string;
    display_name?: string;
    description?: string;
    status?: string;
    parent_id?: string | null;
  }
  
 export interface IUserDetailsState {
    org: IOrg;
    user: IUser;
  }
  