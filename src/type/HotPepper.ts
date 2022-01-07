export type Gourmet = {
  results: {
    api_version: string;
    results_available: number;
    results_returned: string;
    results_start: number;
    shop: Shop[];
  };
};

interface Shop {
  access: string;
  address: string;
  band: string;
  barrier_free: string;
  budget: { average: string; code: string; name: string };
  budget_memo: string;
  capacity: number;
  card: string;
  catch: string;
  charter: string;
  child: string;
  close: string;
  coupon_urls: { pc: string; sp: string };
  course: string;
  english: string;
  free_drink: string;
  free_food: string;
  genre: { catch: string; code: string; name: string };
  horigotatsu: string;
  id: string;
  karaoke: string;
  ktai_coupon: number;
  large_area: { code: string; name: string };
  large_service_area: { code: string; name: string };
  lat: number;
  lng: number;
  logo_image: string;
  lunch: string;
  middle_area: { code: string; name: string };
  midnight: string;
  mobile_access: string;
  name: string;
  name_kana: string;
  non_smoking: string;
  open: string;
  other_memo: string;
  parking: string;
  party_capacity: number;
  pet: string;
  photo: {
    mobile: { l: string; s: string };
    pc: { l: string; m: string; s: string };
  };
  private_room: string;
  service_area: { code: string; name: string };
  shop_detail_memo: string;
  show: string;
  small_area: { code: string; name: string };
  station_name: string;
  sub_genre: { code: string; name: string };
  tatami: string;
  tv: string;
  urls: { pc: string };
  wedding: string;
  wifi: string;
}

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
