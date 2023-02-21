import { api } from "../constants/configApi"

export const quanLiRapService = {
    getSystem: () => {
        return api.get('/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP13')
    },
    getLichChieu: (id) => {
        return api.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
    },
    getInfoSystem: ()=> {
        return api.get('/api/QuanLyRap/LayThongTinHeThongRap')
    },
    getCumRapTheoHeThong: (data)=> {
        return api.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${data}`)
    }

}