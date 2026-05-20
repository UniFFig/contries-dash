export type Country = {
  index: number;
  name: {
    common: string;
    official: string;
    nativeName?: Record<
      string,
      {
        official: string;
        common: string;
      }
    >;
  };
  population: number;
  currencies: Record<
    string,
    {
      name: string;
      symbol: string;
    }
  >;
  languages: Record<string, string>;
  capital: string[];
  region: string;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  area: number;
  maps: any;
};

export type SortableHeaderProps = {
    label: string;
    column: keyof Country;
    sortKey?: keyof Country;
    onSort?: (key: keyof Country) => void;
    arrow?: string;
};