export interface ICity {
  Key: string;
  LocalizedName: string;
  Country: {
    ID: string;
    LocalizedName: string;
  };
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
  };
}

export interface ISearchByLocationKey {
  GeoPosition: {
    Latitude: number;
    Longitude: number;
  };
}
