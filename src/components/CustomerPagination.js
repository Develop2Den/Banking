
import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function CustomerPagination({ page, totalPages, onPageChange }) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => onPageChange(value)}
        color="primary"
      />
    </Stack>
  );
}

export default CustomerPagination;
