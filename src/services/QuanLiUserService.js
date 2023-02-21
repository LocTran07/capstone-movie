import { api } from "../constants/configApi"

export const QuanLiUserService = {
    login: (data)=> { // {taiKhoan, matKhau}
        return api.post('/api/QuanLyNguoiDung/DangNhap',data)
    },
    getInfoUser: (data)=> {
        return api.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan',data)
    }
}
