/*eslint-disable no-unused-vars*/

import { Container, Box, Input, Card, Text, Button, FormControl, FormLabel, CircularProgress, Center } from '@chakra-ui/react';
import image from '../assets/background.jpg';
import { useState, useEffect } from 'react';
import { useForm } from '../hook/useForm'
import { register } from '../services/services';
import { useNavigate } from 'react-router-dom';

const validate = (input) => {
    let errors = {};

    if (!input.name) {
        errors.name = 'Nombre requerido';
    }

    if (!input.username) {
        errors.username = 'Usuario requerido';
    }

    if (!input.password) {
        errors.password = 'Contraseña requerida';
    }
    return errors;
};


const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const [input, setInput] = useState({
        name: "",
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        name: "",
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
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await register(input);
            navigate('/');
            setInput({
                name: "",
                username: "",
                password: "",
            })
        } catch (error) {
            navigate('/registro');
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
                    <Center h='100vh'>
                        <CircularProgress isIndeterminate color='green.300' />
                    </Center>
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
                                    Registraste
                                </Text>
                                <form onSubmit={handleSubmit}>
                                    <FormControl isRequired>
                                        <FormLabel
                                            htmlFor='name'
                                        >
                                            Nombre
                                        </FormLabel>
                                        <Input type='text' name={'name'} id='name' value={input.name} onChange={handleInput} required />
                                        {errors.name && <Text color={"red.500"} fontSize={'sm'}>{errors.name}</Text>}
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel
                                            htmlFor='username'
                                        >
                                            Usuario
                                        </FormLabel>
                                        <Input type='text' name={'username'} id='username' value={input.username} onChange={handleInput} required />
                                        {errors.username && <Text color={"red.500"} fontSize={'sm'}>{errors.username}</Text>}
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel
                                            htmlFor='password'>
                                            Contraseña
                                        </FormLabel>
                                        <Input type='password' name={'password'} id='password' value={input.password} onChange={handleInput} required />
                                        {errors.password && <Text color={"red.500"} fontSize={'sm'}>{errors.password}</Text>}
                                    </FormControl>
                                    <Button
                                        type='submit'
                                        mt={5}
                                        colorScheme="blue"
                                        variant="solid"
                                        width={"70%"}
                                        height={"10%"}

                                    >
                                        Registrate
                                    </Button>
                                </form>
                            </Card>
                        </Container>
                    </Box >
            }
        </>
    )
}

export default Register;