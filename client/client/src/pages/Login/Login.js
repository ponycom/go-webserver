import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from "react";
import { SiteContext } from "../../context/SiteContext";

import axios from '../../api/axios';

import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone, LoginOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import { Col, Row } from 'antd';


import "./login.scss";

const LOGIN_URL = '/api/auth/login';

const Login = () => {

    const { dispatch } = useContext(SiteContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.token;

            //setAuth({ email, password, accessToken });
            dispatch({ type: "LOGIN", login: { email, password, accessToken } })

            setEmail('');
            setPwd('');
            console.log("Go to dashbard!!!!!")
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className="w-100">
                <form onSubmit={handleSubmit} className="form-signin m-auto">
                    <div className='div-login div-email-input'>
                        <Input
                            placeholder="Enter your email"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            ref={userRef}
                            required
                        />
                    </div>
                    <div className='div-login div-password-input'>
                        <Input.Password
                            placeholder="Enter your password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            required
                        />
                    </div>
                    <div className='div-login button-login'>
                        <Row >
                            <Col span={12} className="div-button-login">
                            <Button htmlType="submit" className='button-login'>Sign In</Button>
                            </Col>
                            <Col span={12} className="div-button-login">
                            <Button className='button-login' href="/register">Register</Button>
                            </Col>
                        </Row>
                        
                    </div>
                </form>
            </div>
        </section>

    )
}

export default Login