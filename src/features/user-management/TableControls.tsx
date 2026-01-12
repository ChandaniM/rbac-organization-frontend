import { Box, TextField, MenuItem, Select, Typography } from "@mui/material";

export const TableControls = ({
  onSearch,
}: {
  onSearch: (val: string) => void;
}) => (
  <Box
    display='flex'
    justifyContent='space-between'
    alignItems='center'
    p={2}
    bgcolor='white'
    border='1px solid #E2E8F0'
    borderBottom='none'
    borderRadius='8px 8px 0 0'
  >
    <Box display='flex' alignItems='center' gap={1}>
      <Typography variant='body2'>Show</Typography>
      <Select size='small' defaultValue={10}>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
      </Select>
      <Typography variant='body2'>Entries</Typography>
    </Box>
    <TextField
      size='small'
      label='Search'
      variant='outlined'
      onChange={(e) => onSearch(e.target.value)}
    />
  </Box>
);
