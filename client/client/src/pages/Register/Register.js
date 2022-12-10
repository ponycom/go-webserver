import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../../api/axios';
import { Link } from "react-router-dom";

import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone, LoginOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import { Col, Row } from 'antd';

const REGISTER_URL = '/api/auth/register';

const Register = () => {


    const userRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [name, email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({name, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            let data = response?.data;
            if(data.status) {
                setSuccess(true);
                //clear state and controlled inputs
                setName('');
                setEmail('');
                setPwd('');
            }
            
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="/login">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className="w-100">
                <form onSubmit={handleSubmit} className="form-signin m-auto">
                    <div className='div-login div-name-input'>
                        <Input
                            placeholder="Enter your name"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            ref={userRef}
                            required
                        />
                    </div>
                    <div className='div-login div-email-input'>
                        <Input
                            placeholder="Enter your email"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
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
                            <Col span={24} className="div-button-login">
                            <Button className='button-login' htmlType="submit">Register</Button>
                            </Col>
                        </Row>
                        
                    </div>
                </form>
            </div>
        </section>
            )}
        </>
    )
}

export default Register