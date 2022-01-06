export type LargeArea = {
  results: {
    api_version: string;
    large_area: {
      code: string;
      large_service_area: {
        code: string;
        name: string;
      };
      name: string;
      service_area: {
        code: string;
        name: string;
      };
    }[];
    results_available: number;
    results_returned: string;
    results_start: number;
  };
};

export type MiddleArea = {
  results: {
    api_version: string;
    middle_area: {
      code: string;
      large_area: { code: string; name: string };
      large_service_area: { code: string; name: string };
      name: string;
      service_area: { code: string; name: string };
    }[];
    results_available: number;
    results_returned: string;
    results_start: number;
  };
};
