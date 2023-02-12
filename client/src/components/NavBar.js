import React, {useContext} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const NavBar = observer( () => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const logout = () => {
        user.setUser({});
        user.setIsAuth(false);
    }

    return (
        <Navbar bg="dark" expand="lg">
            <Container fluid>
                <NavLink to={SHOP_ROUTE}>Shop Name</NavLink>
                        {user.isAuth ?
                            <Nav
                                className="ml-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Button
                                    variant={'outline-light'}
                                    className={'me-2'}
                                    onClick={() => navigate(ADMIN_ROUTE)}
                                >
                                    Админ панель
                                </Button>
                                <Button
                                    variant={'outline-light'}
                                    onClick={() => logout()}
                                >
                                    Выйти
                                </Button>
                            </Nav>       :
                            <Nav
                                className="ml-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Button
                                    variant={'outline-light'}
                                    className={'me-2'}
                                    onClick={() => navigate(ADMIN_ROUTE)}
                                >
                                    Админ панель
                                </Button>
                                <Button
                                    variant={'outline-light'}
                                    onClick={() => navigate(LOGIN_ROUTE)}
                                >
                                    Авторизация
                                </Button>
                            </Nav>
                        }


            </Container>
        </Navbar>
    );
});

export default NavBar;