/*eslint-disable no-unused-vars*/
import { Container, Box, Input, Card, Text, Button, FormControl, FormLabel, Center, CircularProgress } from '@chakra-ui/react';
import image from '../assets/background.jpg';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { login, setToken } from '../services/services';
import { useForm } from '../hook/useForm';


const LogIn = () => {

    const [loading, setLoading] = useState(false)

    const { username, password, onInputChange, onResetForm } = useForm({
        username: '',
        password: ''
    });

    const navigate = useNavigate();


    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const userData = await login({ username, password })
            window.localStorage.setItem('loggedUser', JSON.stringify(userData))
            setToken(userData.token)
            navigate(`/facturas`, {
                replace: true,
                state: {
                    username,
                    logged: true
                }
            })
            onResetForm();
        } catch (error) {
            console.log(error)
            navigate('/')
        }
    }

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2500)
    }, [])

    return (
        <>
        {
            loading ? <Center h='100vh'><CircularProgress isIndeterminate color='green.300' /></Center> 
            : 
            <Box
            width={"100vw"}
            height="100vh"
            backgroundImage={image}
            backdropBlur={"px"}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            display={"flex"}
            justifyContent="center"
            alignItems="center"
        >
            <Container
                width={"50%"}
                height="100vh">
                <Card
                    width={"100%"}
                    height={"80%"}
                    display={"flex"}
                    flexDir={"column"}
                    textAlign={'center'}
                    justifyContent="center"
                    alignItems="center"
                    bg="white"
                    variant="outline"
                    boxShadow="dark-lg"
                    p={10}
                    borderRadius={10}
                    m={5}
                    gap={5}
                >
                    <Text fontSize="3xl">
                        Bienvenido a la prueba técnica SiwCargo
                    </Text>
                    <form onSubmit={onLogin}>
                        <Box
                            width={"80%"}
                            display={"flex"}
                            flexDir={"column"}
                            gap={5}
                            textAlign={'left'}
                            justifyContent="center"
                            alignItems="center"
                            m={5}
                        >

                            <FormControl
                                isRequired
                            >
                                <FormLabel
                                    htmlFor='username'
                                >
                                    Usuario
                                </FormLabel>
                                <Input
                                    type='text'
                                    name={'username'}
                                    id='username'
                                    value={username}
                                    onChange={onInputChange}
                                    autoComplete='off'
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel
                                    htmlFor='password'
                                >
                                    Contraseña
                                </FormLabel>
                                <Input
                                    type='password'
                                    name={'password'}
                                    id='password'
                                    value={password}
                                    onChange={onInputChange}
                                />
                            </FormControl>
                        </Box>
                        <Box
                            width={"100%"}
                            display={"flex"}
                            flexDir={"column"}
                            gap={5}
                            textAlign={'left'}
                            justifyContent="center"
                            alignItems="center"
                            m={5}
                        >
                            <Link to={'/actualizar-usuario'}>
                                <Text
                                    textColor={"blue.500"}
                                    textDecoration={"underline"}
                                    cursor={"pointer"}
                                    _hover={{ color: "blue.700" }}
                                >
                                    Actualiza tu contraseña
                                </Text>
                            </Link>
                            <Link to={'/registro'}>
                                <Text
                                    textColor={"blue.500"}
                                    textDecoration={"underline"}
                                    cursor={"pointer"}
                                    _hover={{
                                        color: "blue.700",
                                    }}
                                >
                                    Registrate
                                </Text>
                            </Link>
                            <Button
                                type='submit'
                                colorScheme="blue"
                                variant="solid"
                                width={"50%"}
                            >
                                Iniciar Sesión
                            </Button>
                        </Box>
                    </form>
                </Card>
            </Container>
        </Box >
        }
        </>

    )
}

export default LogIn;