import React, { useState, useEffect } from 'react';
import { TextField, Box } from '@mui/material';
import { Place } from '../types/types';


export interface FilterControlsProps {
  filters: Partial<Place>;
  onFilterChange: React.Dispatch<React.SetStateAction<Partial<Place>>>;
}

export const FilterControls = ({ onFilterChange }: FilterControlsProps) => {
  const [filters, setFilters] = useState<Partial<Place>>({});
  
  // Debounce filter changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange(filters);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [filters]);

  const handleFilterChange = (field: keyof Place, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: 2,
      p: 2,
      bgcolor: 'background.paper',
      borderRadius: 1,
      boxShadow: 1
    }}>
      <TextField
        label="Search Name"
        variant="outlined"
        size="small"
        onChange={(e) => handleFilterChange('name', e.target.value)}
        InputProps={{ type: 'search' }}
      />
      <TextField
        label="Search City"
        variant="outlined"
        size="small"
        onChange={(e) => handleFilterChange('city', e.target.value)}
        InputProps={{ type: 'search' }}
      />
      <TextField
        label="Search State"
        variant="outlined"
        size="small"
        onChange={(e) => handleFilterChange('region', e.target.value)}
        InputProps={{ type: 'search' }}
      />
      <TextField
        label="Business Type"
        variant="outlined"
        size="small"
        onChange={(e) => handleFilterChange('tenant_type', e.target.value)}
        InputProps={{ type: 'search' }}
      />
    </Box>
  );
};