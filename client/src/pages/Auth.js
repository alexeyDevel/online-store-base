import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const navigate = useNavigate();
    const {user} = useContext(Context);
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = async () => {
        try{
            let data;
            if(isLogin){
                data = await login(email, password);
            } else {
                data = await registration(email,password);
            }
            user.setUser();
            user.setIsAuth(true);
            navigate(SHOP_ROUTE);
        }catch (e){
            alert(e.response.data.message)
        }

    }

    return (
        <Container
            className="d-flex justify-content-between align-items-center"
            style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600, margin: "auto"}} className="p-5">
                <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-2"
                        placeholder="Ведите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        placeholder="Ведите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row >
                        <div className="d-flex justify-content-between flex-row align-items-center">
                            {isLogin ?
                                <div className="mt-3 align-content-center le-3">
                                    Нет аккаунта?
                                    <NavLink
                                        to={REGISTRATION_ROUTE}
                                    >Регистрация</NavLink>
                                </div> :
                                <div className="mt-3 align-content-center le-3">
                                    Есть аккаунт?
                                    <NavLink
                                        to={LOGIN_ROUTE}
                                    >Войдите!</NavLink>
                                </div>

                            }

                            <Button
                                className="mt-3 align-self-end"
                                variant={"outline-success"}
                                onClick={ handleClick}
                            >
                                {isLogin ? "Войти" : "Регистрация"}
                            </Button>
                        </div>

                    </Row>

                </Form>
            </Card>
        </Container>
    );
}) ;

export default Auth;