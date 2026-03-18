import styled from "@emotion/styled";
import { Tree, TreeNode } from "react-organizational-chart";
import { Avatar, Typography, Box, Paper } from "@mui/material";
import Layout from "../layouts/Layout";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../store/AuthContext";
import type {
  OrgHierarchyTreeResponse,
  OrgHierarchyNode,
} from "../services/orgHierarchy";
import { getOrgHierarchyTree } from "../services/orgHierarchy";

// 1. Keka-style Node Design
const StyledNode = styled(Paper)`
  padding: 12px;
  border-radius: 12px;
  display: inline-block;
  border: 1px solid #e2e8f0;
  min-width: 140px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  background: white;
`;

const OrganizationTree = () => {
  const { tenantId, token } = useAuth();
  const [tree, setTree] = useState<OrgHierarchyTreeResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tenantId || !token) return;
    setLoading(true);
    getOrgHierarchyTree(tenantId, token)
      .then((res) => setTree(res))
      .catch((err) => {
        console.error("Failed to load org hierarchy", err);
        setTree(null);
      })
      .finally(() => setLoading(false));
  }, [tenantId, token]);

  const { usersById, childrenByManager, roots } = useMemo(() => {
    const usersById = new Map<string, OrgHierarchyNode>();
    const childrenByManager = new Map<string, string[]>();

    const edges = tree?.edges ?? [];
    const nodes = tree?.users ?? [];
    nodes.forEach((u) => usersById.set(u.id, u));

    const managerIds = new Set<string>();
    const userIds = new Set<string>();

    for (const e of edges) {
      managerIds.add(e.managerId);
      userIds.add(e.userId);

      if (!childrenByManager.has(e.managerId)) {
        childrenByManager.set(e.managerId, []);
      }
      childrenByManager.get(e.managerId)!.push(e.userId);
    }

    // Root candidates = users that are never a subordinate (top-most in hierarchy).
    // This ensures the "first" org user shows up even if there are no edges yet.
    const rootUsers = nodes.filter((u) => !userIds.has(u.id));

    return { usersById, childrenByManager, roots: rootUsers };
  }, [tree]);

  const renderTree = (managerId: string, visited: Set<string>) => {
    if (visited.has(managerId)) return null;
    const nextVisited = new Set(visited);
    nextVisited.add(managerId);

    const children = childrenByManager.get(managerId) ?? [];
    return children
      .map((childId) => {
        const child = usersById.get(childId);
        if (!child) return null;

        return (
          <TreeNode
            key={child.id}
            label={
              <StyledNode>
                <Box
                  display='flex'
                  flexDirection='column'
                  alignItems='center'
                  gap={1}
                >
                  <Avatar sx={{ width: 40, height: 40, bgcolor: "#3B82F6" }}>
                    {(child.name ?? "").charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant='subtitle2' fontWeight='bold'>
                      {child.name}
                    </Typography>
                    <Typography variant='caption' color='textSecondary'>
                      {child.jobTitle || child.department || "Employee"}
                    </Typography>
                  </Box>
                </Box>
              </StyledNode>
            }
          >
            {renderTree(child.id, nextVisited)}
          </TreeNode>
        );
      })
      .filter(Boolean);
  };

  return (
    <Layout>
      <Box p={4} sx={{ textAlign: "center" }}>
        <Typography variant='h4' fontWeight='bold' mb={6} textAlign='left'>
          Organization Hierarchy
        </Typography>

        <Box sx={{ overflowX: "auto", py: 4 }}>
          {loading && <Typography color='text.secondary'>Loading...</Typography>}
          {!loading && tree && tree.users.length === 0 && (
            <Typography color='text.secondary'>No hierarchy found.</Typography>
          )}
          <Tree
            lineWidth='2px'
            lineColor='#CBD5E1'
            lineBorderRadius='10px'
            label={
              <StyledNode>
                <Box
                  display='flex'
                  flexDirection='column'
                  alignItems='center'
                  gap={1}
                >
                  <Avatar sx={{ width: 40, height: 40, bgcolor: "#3B82F6" }}>
                    O
                  </Avatar>
                  <Box>
                    <Typography variant='subtitle2' fontWeight='bold'>
                      Organization
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      Reporting hierarchy
                    </Typography>
                  </Box>
                </Box>
              </StyledNode>
            }
          >
            {tree && (roots.length ? roots : tree.users.slice(0, 1)).map((root) => (
              <TreeNode key={root.id} label={
                <StyledNode>
                  <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    gap={1}
                  >
                    <Avatar sx={{ width: 40, height: 40, bgcolor: "#3B82F6" }}>
                      {(root.name ?? "").charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant='subtitle2' fontWeight='bold'>
                        {root.name}
                      </Typography>
                      <Typography variant='caption' color='textSecondary'>
                        {root.jobTitle || root.department || "Employee"}
                      </Typography>
                    </Box>
                  </Box>
                </StyledNode>
              }>
                {renderTree(root.id, new Set<string>())}
              </TreeNode>
            ))}
          </Tree>
        </Box>
      </Box>
    </Layout>
  );
};

export default OrganizationTree;
