import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Space } from 'antd';
import { getMovieList } from '../../redux-toolkit/quanLyPhim';
import { QuanLiUserAction } from '../../redux-toolkit/quanLyUser';

const Admin = () => {
    const { Search } = Input;
    const { Header, Content, Footer, Sider } = Layout;
    //useselector 
    const { userLogin } = useSelector(state => state.quanLiUserReducer)
    // dispatch 
    const dispatch = useDispatch()
    // hàm search
    const onSearch = (value) => {
        dispatch(getMovieList(value))
    };

    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        alert('Vui lòng đăng nhập tài khoản quản trị viên')
        return <Navigate replace to="/"></Navigate>
    }
    return (
        <StyledDiv className='Admin'>
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                    }}
                    onCollapse={(collapsed, type) => {
                    }}
                >
                    <Link to='/'>
                        <img className=' w-[150px] p-10' src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="" />
                    </Link>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys='1'
                        items={['Film','Showtime'].map(
                            (icon, index) => ({
                                key: String(index + 1),
                                icon: React.createElement(icon),
                                label: <Link to={`/admin/${icon}`}>{icon}</Link>,
                            }),
                        )}
                    />
                </Sider>
                <Layout>
                    <Header className="site-layout-sub-header-background"
                        style={{

                        }}>
                        <Search
                            placeholder="input search text"
                            allowClear
                            onSearch={onSearch}
                            style={{
                                width: 200,
                            }}
                        />
                        {userLogin.hoTen &&
                            <div className='mb-0 hidden sm:block'>
                                <span className='mb-0 px-8 py-3 text-black font-semibold cursor-pointer'>Xin chào {userLogin.hoTen}</span>
                                <span onClick={() => {
                                    dispatch(QuanLiUserAction.dangXuat())

                                }} className='mb-0 px-8 py-3 text-black bg-red-500 rounded  font-semibold cursor-pointer'>Đăng xuất</span>
                            </div>}
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px 0',
                        }}
                    >
                        <div
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                minHeight: 360,
                            }}
                        >
                            <Outlet></Outlet>
                        </div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                    </Footer>
                </Layout>
            </Layout>        </StyledDiv>
    )
}

export default Admin

const StyledDiv = styled.div`

    .ant-layout-header{
        background-color: white;
        display: flex;
        padding: 0 40px;
        justify-content: space-between;
        align-items: center;
    }
    .ant-layout{
       overflow: hidden;
    }
`