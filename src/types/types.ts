export interface Place {
    pid: string;
    name: string;
    city: string;
    region: string;
    postal_code: string;
    tenant_type: string;
    longitude: number;
    latitude: number;
  }
  
  export type SortConfig = {
    key: keyof Place;
    direction: 'asc' | 'desc';
  } | null;
  
  export type FilterConfig = {
    [key in keyof Place]?: string;
  };