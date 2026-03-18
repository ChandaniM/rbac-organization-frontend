import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export interface OrgHierarchyNode {
  id: string;
  name: string;
  jobTitle: string;
  department: string;
  avatar: string;
}

export interface OrgHierarchyEdge {
  managerId: string;
  userId: string;
}

export interface OrgHierarchyTreeResponse {
  users: OrgHierarchyNode[];
  edges: OrgHierarchyEdge[];
}

export const assignReportingManager = async (
  tenantId: string,
  employeeId: string,
  managerId: string,
  token: string
) => {
  const res = await axios.post(`${BASE_URL}/${tenantId}/hierarchy/assign`, {
    userId: employeeId,
    managerId,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getOrgHierarchyTree = async (
  tenantId: string,
  token: string
): Promise<OrgHierarchyTreeResponse> => {
  const res = await axios.get(`${BASE_URL}/${tenantId}/hierarchy/tree`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

