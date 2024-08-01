/*eslint-disable no-unused-vars*/

import { Container, Box, Input, Card, Text, Button, FormControl, FormLabel, CircularProgress, Center } from '@chakra-ui/react';
import image from '../assets/background.jpg';
import { useState, useEffect } from 'react';
import { useForm } from '../hook/useForm'
import { register } from '../services/services';
import { useNavigate } from 'react-router-dom';


const Register = () => {

    const { name, username, password, onInputChange, onResetForm, error } = useForm({
        name: '',
        username: '',
        password: '',
    });

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2500)
    }, [])

    // const [error, setError] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await register({ name, username, password });
            navigate('/');
            onResetForm();
            console.log(data);
        } catch (error) {
            console.log({ error });
        }
    }

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
                                        <Input type='text' name={'name'} id='name' value={name} onChange={onInputChange} required />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel
                                            htmlFor='username'
                                        >
                                            Usuario
                                        </FormLabel>
                                        <Input type='text' name={'username'} id='username' value={username} onChange={onInputChange} required />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel
                                            htmlFor='password'>
                                            Contraseña
                                        </FormLabel>
                                        <Input type='password' name={'password'} id='password' value={password} onChange={onInputChange} required />
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