export interface State {
  center: {
    lat: number;
    lng: number;
  } | null;
  errMsg: string | null;
  isLoading: boolean;
}

export interface MarkerInfo {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
}

export interface SearchResult {
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  barId?: number | string;
  barName?: string;
}
export interface SearchCenter {
  position: {
    lat: number;
    lng: number;
  };
}
