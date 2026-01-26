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
  
  export interface JwtUser {
    id: string;
    username: string;
    email: string;
  }
  
  export interface JwtOrg {
    name: string;
    display_name: string;
    description: string;
    status: string;
  }
  
  export type UserRole = "SYSTEM_ADMIN" | "ORG_ADMIN" | "USER";

  export interface JwtPayload {
    userId: string;
    tenantId: string;
    role: UserRole;
    user: {
      id: string;
      username: string;
      email: string;
    };
    org: {
      name: string;
      display_name: string;
      description: string;
      status: string;
    };
    exp: number; // expiration time (seconds)
  iat?: number; // issued at (seconds)
  }
  