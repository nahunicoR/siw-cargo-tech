/*eslint-disable no-unused-vars*/

import { Container, Box, Input, Card, Text, Button, FormControl, FormLabel, Center, FormErrorMessage, CircularProgress } from '@chakra-ui/react';
import image from '../assets/background.jpg';
import { useState, useEffect } from 'react';
import { useForm } from '../hook/useForm'
import { updateUser } from '../services/services';
import { useNavigate } from 'react-router-dom';



const UpdateUser = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const { nombre, username, oldPassword, newPassword, onInputChange, onResetForm, error } = useForm({
        nombre: '',
        username: '',
        oldPassword: '',
        newPassword: '',
    });

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2500)
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await updateUser({ nombre, username, oldPassword, newPassword });
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
                loading ? (
                    <Center h='100vh'>
                        <CircularProgress isIndeterminate color='green.300' />
                    </Center>
                ) : <Box
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
                                Actualiza tu Contraseña
                            </Text>
                            <form onSubmit={handleSubmit}>
                                <FormControl >
                                    <FormLabel
                                        htmlFor='nombre'
                                    >
                                        Nombre
                                    </FormLabel>
                                    <Input type='text' name={'nombre'} id='nombre' value={nombre} onChange={onInputChange} />
                                </FormControl>
                                <FormControl >
                                    <FormLabel
                                        htmlFor='username'
                                    >
                                        Usuario</FormLabel>
                                    <Input type='text' name={'username'} id='username' value={username} onChange={onInputChange} />
                                </FormControl>
                                <FormControl >
                                    <FormLabel
                                        htmlFor='oldPassword'
                                    >
                                        Contraseña Anterior
                                    </FormLabel>
                                </FormControl>
                                <FormControl >
                                    <Input type='password' name={'oldPassword'} id='oldPassword' value={oldPassword} onChange={onInputChange} />
                                </FormControl>
                                <FormControl >
                                    <FormLabel
                                        htmlFor='newPassword'
                                    >
                                        Nueva Contraseña
                                    </FormLabel>
                                    <Input type='password' name={'newPassword'} id='newPassword' value={newPassword} onChange={onInputChange} />
                                    <Button
                                        type='submit'
                                        colorScheme="blue"
                                        variant="solid"
                                        width={"50%"}
                                        height={"100%"}
                                        ml={20}
                                        onClick={() => { }}
                                    >
                                        Actualizar
                                    </Button>
                                </FormControl>
                            </form>
                        </Card>
                    </Container>
                </Box>
            }

        </>

    )
}

export default UpdateUser;