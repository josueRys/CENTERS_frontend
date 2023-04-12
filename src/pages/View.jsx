import { NavLink, Outlet } from "react-router-dom";
import { Button, Layout, Tooltip  } from "antd";
import { useState } from 'react';
import { FaUsers, FaTable, FaLaptop, FaUser } from "react-icons/fa";
import { BsFillBuildingFill } from "react-icons/bs"
import { LeftOutlined, RightOutlined, } from '@ant-design/icons';
import "../css/view.css"

const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: 'black',
};

const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: 'black',
    backgroundColor: '#fff',
};

const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: 'black',
};

const footerStyle = {
    textAlign: 'center',
    color: 'black',
    backgroundColor: '#fff',
};


const View = () => {
    const [collapse, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapse);
    };

    const items = [ 
        { 
            title: 'Centros',
            to: 'centers',
            icon: <BsFillBuildingFill className={collapse ? 'm-1 mx-3' : 'mx-3'}/>
        },
        {
            title: 'Usuarios',
            to: 'users',
            icon: <FaUsers className={collapse ? 'm-1 mx-3' : 'mx-3'}/>
        },
        {
            title: 'Registros',
            to: 'registers',
            icon: <FaTable className={collapse ? 'm-1 mx-3' : 'mx-3'}/>
        },
        {
            title: 'Equipos',
            to: 'computers',
            icon: <FaLaptop className={collapse ? 'm-1 mx-3' : 'mx-3'}/>
        }
    ]

    const activeStyle = ` btn ${!collapse ? 'd-flex  align-items-center' : ''}  rounded-0 py-4 bg-white text-dark`
    const not_activeStyle = `btn ${!collapse ? 'd-flex  align-items-center' : ''} rounded-0 py-4 bg-transparent text-white `

    return (
        <Layout style={{height: '100vh', width:'100%'}} >

        <Sider trigger={null} collapsible collapsed={collapse} style={siderStyle}>

            <Button className="m-auto my-3" type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16, background: '#fff', color:'black', display:'flex', alignItems:'center' }} >
                {collapse ? <RightOutlined/> : <LeftOutlined />}
            </Button>

            <div className="d-grid" >
                {
                    items.map((item) => (
                        <Tooltip key={ item.title } placement="right" title={collapse  && item.title} >
                            <NavLink className={ ({isActive}) => (isActive ? activeStyle : not_activeStyle ) } type="button" to= { `./${item.to}` } >
                                {item.icon}
                                <span className={collapse ? 'collapse collapse-horizontal' : ''} >
                                    {item.title}
                                </span >
                            </NavLink>
                        </Tooltip>
                    ))
                }
            </div> 

        </Sider> 

        <Layout>
            
            <Header style={headerStyle} className='d-flex align-items-center p-0' >
                    <div className="w-100 d-flex align-items-end " ><h1>TechSentinel</h1></div>
                    <div>
                        <button className="btn text-white-50 " >
                            <FaUser style={{height:'30px', width:'30px'}} />
                        </button>
                    </div>
            </Header>

            <Content  /* style={contentStyle} */ className='p-3' >
                <Outlet/>
            </Content>
            {/* <Footer style={footerStyle}>Footer</Footer> */}
        </Layout>

    </Layout>
    );
};

export default View;
