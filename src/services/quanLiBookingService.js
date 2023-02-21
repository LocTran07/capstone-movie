import { api } from "../constants/configApi";

export const quanLiBookingService = {
  getRoom: (id) => {
    return api.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`);
  },
  datVe: (data)=> {
    return api.post('/api/QuanLyDatVe/DatVe',data)
  },
  taoLich: (data)=> {
    return api.post('/api/QuanLyDatVe/TaoLichChieu',data)
  }
};
