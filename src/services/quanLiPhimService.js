import { api } from "../constants/configApi";

export const quanLiPhimService = {
  getMovieList: (data = "") => {
    if (data !== "") {
        return api.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP13&tenPhim=${data}`)
    }else{
        return api.get('/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP13')
    }
  },
  getMovieBanner: () => {
    return api.get("/api/QuanLyPhim/LayDanhSachBanner");
  },
  getMovieDetail: (id) => {
    return api.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);
  },
  addFilm: (data) => {
    return api.post("/api/QuanLyPhim/ThemPhimUploadHinh", data);
  },
  getEdit: (id) => {
    return api.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);
  },
  updateFilm: (data) => {
    return api.post("/api/QuanLyPhim/CapNhatPhimUpload", data);
  },
  deleteFilm: (data) => {
    return api.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${data}`);
  },
};
