import React, { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

const CustomPagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}: PaginationProps) => {
  const [jumpPage, setJumpPage] = useState<string>("");
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the range display (e.g., 1-10 of 100)
  const startRange = (currentPage - 1) * itemsPerPage + 1;
  const endRange = Math.min(currentPage * itemsPerPage, totalItems);

  const handleJumpPage = () => {
    const pageNum = parseInt(jumpPage);
    if (pageNum > 0 && pageNum <= totalPages) {
      onPageChange(pageNum);
      setJumpPage("");
    }
  };

  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      p={2}
      bgcolor='white'
      borderTop='1px solid #E2E8F0'
    >
      {/* Left Side: Rows per page and range display */}
      <Stack direction='row' alignItems='center' spacing={2}>
        <Typography variant='body2' color='textSecondary'>
          Rows per page
        </Typography>
        <Select
          size='small'
          value={itemsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          sx={{ height: 32, borderRadius: 2 }}
        >
          {[10, 25, 50, 100].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <Typography variant='body2' color='textPrimary' fontWeight='500'>
          {startRange}-{endRange}{" "}
          <span style={{ color: "#94A3B8", fontWeight: 400 }}>of</span>{" "}
          {totalItems}
        </Typography>
      </Stack>

      {/* Right Side: Page Navigation + Jump to Input */}
      <Stack direction='row' alignItems='center' spacing={1}>
        {/* Navigation Buttons */}
        <Box
          border='1px solid #E2E8F0'
          borderRadius='8px'
          display='flex'
          overflow='hidden'
        >
          <IconButton
            size='small'
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            sx={{ borderRadius: 0, borderRight: "1px solid #E2E8F0" }}
          >
            <ChevronLeft fontSize='small' />
          </IconButton>

          <Button
            size='small'
            sx={{
              minWidth: 35,
              borderRadius: 0,
              color: currentPage === 1 ? "primary" : "text.primary",
            }}
            onClick={() => onPageChange(1)}
          >
            1
          </Button>

          {/* Logic for Page 2 or Ellipsis can be added here */}
          <Button
            size='small'
            variant={currentPage === 2 ? "contained" : "text"}
            disableElevation
            sx={{
              minWidth: 35,
              borderRadius: 0,
              bgcolor: currentPage === 2 ? "#E0E7FF" : "transparent",
              color: currentPage === 2 ? "#2563EB" : "inherit",
            }}
            onClick={() => onPageChange(2)}
          >
            2
          </Button>

          <Typography
            variant='body2'
            sx={{ alignSelf: "center", px: 1, color: "#94A3B8" }}
          >
            ...
          </Typography>

          <Button
            size='small'
            sx={{ minWidth: 35, borderRadius: 0 }}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Button>

          <IconButton
            size='small'
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            sx={{ borderRadius: 0, borderLeft: "1px solid #E2E8F0" }}
          >
            <ChevronRight fontSize='small' />
          </IconButton>
        </Box>

        {/* Jump to Page Input */}
        <Stack direction='row' spacing={1} alignItems='center' ml={2}>
          <Typography variant='body2' color='textSecondary'>
            Go to
          </Typography>
          <TextField
            size='small'
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleJumpPage()}
            placeholder='Page'
            sx={{
              width: 60,
              "& .MuiInputBase-input": { py: 0.5, px: 1, fontSize: "14px" },
            }}
          />
          <Button
            variant='outlined'
            size='small'
            onClick={handleJumpPage}
            sx={{ minWidth: 40, height: 32 }}
          >
            Go
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CustomPagination;
