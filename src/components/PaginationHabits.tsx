import React from 'react';
import { Pagination } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const PaginationHabits: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={onPageChange}
      variant="outlined"
      shape="rounded"
      sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}
    />
  );
};

export default PaginationHabits;
