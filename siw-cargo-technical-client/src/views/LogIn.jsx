/*eslint-disable no-unused-vars*/
import { Container, Box, Input, Card, Text, Button, FormControl, FormLabel, Center, CircularProgress } from '@chakra-ui/react';
import image from '../assets/sun.jpg';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { login, setToken } from '../services/services';

const validate = (input) => {
    let errors = {};

    if (!input.username) {
        errors.username = 'Usuario requerido';
    }

    if (!input.password) {
        errors.password = 'Password requerido';
    }
    return errors;
};


const LogIn = () => {

    const [loading, setLoading] = useState(false)

    const [input, setInput] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    };

    const navigate = useNavigate();

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(input)
            window.localStorage.setItem('loggedUser', JSON.stringify(userData))
            setToken(userData.token)
            navigate(`/facturas`, {
                replace: true,
                state: {
                    username: input.username,
                    logged: true
                }
            })
            setInput({
                username: "",
                password: "",
            })
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
                loading ?
                    <Center h='100vh'><CircularProgress isIndeterminate color='green.300' /></Center>
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
                                bg="gray.100"
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
                                                value={input.username}
                                                onChange={handleInput}
                                                autoComplete='off'
                                            />
                                            {errors.username && <Text color={"red.500"} fontSize={'sm'}>{errors.username}</Text>}
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
                                                value={input.password}
                                                onChange={handleInput}
                                            />
                                            {errors.password && <Text color={"red.500"} fontSize={'sm'}>{errors.password}</Text>}
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