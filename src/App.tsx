import React, { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import { Place, SortConfig } from './types/types';
import { MapComponent } from './components/Map';
import { DataTable } from './components/DataTable';
import { FilterControls } from './components/FilterControls';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const [rawData, setRawData] = useState<Place[]>([]);
  const [filters, setFilters] = useState<Partial<Place>>({});
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  // Load CSV data
  useEffect(() => {
    fetch('/data/result.csv')
      .then(response => response.text())  // Get raw text
      .then(text => {
        console.log("Raw CSV Response:", text);  // Log the raw CSV
        Papa.parse<string>(text, {
          header: true,
          dynamicTyping: true,
          complete: (results: Papa.ParseResult<string>) => {
            console.log("Parsed Data:", results.data);
            setRawData(results.data as unknown as Place[]);
          },
          error: (err: Error) => console.error("CSV Parsing Error:", err)
        });
      });
  }, []);

  // Filter and sort data
  const processedData = useMemo(() => {
  return rawData.filter(item =>
    Object.entries(filters).every(([key, value]) => {
      const itemValue = item[key as keyof Place];
      return value 
        ? itemValue !== undefined && 
          typeof itemValue === "string" && 
          itemValue.toLowerCase().includes(String(value).toLowerCase())
        : true;
    })
  );
}, [rawData, filters]);

   

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5' }}>
      <FilterControls filters={filters} onFilterChange={setFilters} />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', gap: '1rem', padding: '1rem' }}>
        <div style={{ flex: 1, maxWidth: '50%', overflow: 'hidden', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <DataTable data={processedData} onSort={setSortConfig} sortConfig={sortConfig} />
        </div>
        <div style={{ flex: 1, position: 'relative', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <MapComponent data={processedData} />
        </div>
      </div>
    </div>
  );
};

export default App;