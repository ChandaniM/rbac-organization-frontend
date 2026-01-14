import styled from '@emotion/styled';
import { Tree, TreeNode } from 'react-organizational-chart';
import { Avatar, Typography, Box, Paper } from '@mui/material';
import Layout from '../layouts/Layout';

// 1. Keka-style Node Design
const StyledNode = styled(Paper)`
  padding: 12px;
  border-radius: 12px;
  display: inline-block;
  border: 1px solid #E2E8F0;
  min-width: 140px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  background: white;
`;

// 2. Mock Data with 'managerId'
const employees = [
  { id: 1, name: "Dipak Deb Nath", role: "CEO", managerId: null, avatar: "" },
  { id: 2, name: "Pappu Baidya", role: "CTO", managerId: 1, avatar: "" },
  { id: 3, name: "Shipon Mohanta", role: "HR Manager", managerId: 1, avatar: "" },
  { id: 4, name: "John Doe", role: "Lead Dev", managerId: 2, avatar: "" },
  { id: 5, name: "Jane Smith", role: "QA Engineer", managerId: 2, avatar: "" },
];
const rootEmployee = employees.find(emp => emp.managerId === null);

const OrganizationTree = () => {
  
  // 3. The Recursive Function to build the tree
  const renderTree = (managerId: number | null) => {
    return employees
      .filter((emp) => emp.managerId === managerId)
      .map((emp) => (
        <TreeNode 
          key={emp.id} 
          label={
            <StyledNode>
              <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                <Avatar sx={{ width: 40, height: 40, bgcolor: '#3B82F6' }}>
                  {emp.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">{emp.name}</Typography>
                  <Typography variant="caption" color="textSecondary">{emp.role}</Typography>
                </Box>
              </Box>
            </StyledNode>
          }
        >
          {/* Recursion: Find anyone who reports to this employee */}
          {renderTree(emp.id)}
        </TreeNode>
      ));
  };

  return (
    <Layout>
      <Box p={4} sx={{ textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" mb={6} textAlign="left">
          Organization Hierarchy
        </Typography>

        <Box sx={{ overflowX: 'auto', py: 4 }}>
        <Tree
  lineWidth="2px"
  lineColor="#CBD5E1"
  lineBorderRadius="10px"
  label={
    <StyledNode>
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <Avatar sx={{ width: 40, height: 40, bgcolor: "#3B82F6" }}>
          {rootEmployee?.name.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="subtitle2" fontWeight="bold">
            {rootEmployee?.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {rootEmployee?.role}
          </Typography>
        </Box>
      </Box>
    </StyledNode>
  }
>
  {renderTree(rootEmployee?.id ?? null)}
</Tree>

        </Box>
      </Box>
    </Layout>
  );
};

export default OrganizationTree;