/*eslint-disable no-unused-vars*/

import { Container, Box, Input, Card, Text, Button, FormControl, FormLabel, Center, FormErrorMessage, CircularProgress } from '@chakra-ui/react';
import image from '../assets/background.jpg';
import { useState, useEffect } from 'react';
import { useForm } from '../hook/useForm'
import { updateUser } from '../services/services';
import { useNavigate } from 'react-router-dom';

const validate = (input) => {
    let errors = {};

    if (!input.nombre) {
        errors.nombre = 'Nombre requerido';
    }

    if (!input.username) {
        errors.username = 'Usuario requerido';
    }

    if (!input.oldPassword) {
        errors.oldPassword = 'Contraseña requerida';
    }
    if (input.oldPassword !== input.newPassword) {
        errors.newPassword = 'Las contraseñas no coinciden';
    }
    return errors;
};

const UpdateUser = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [input, setInput] = useState({
        nombre: "",
        username: "",
        oldPassword: "",
        newPassword: "",
    });
    const [errors, setErrors] = useState({
        nombre: "",
        username: "",
        oldPassword: "",
        newPassword: "",
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
            const data = await updateUser(input);
            navigate('/');
        } catch (error) {
            navigate('/');
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
            {/* {
                loading ? (
                    <Center h='100vh'>
                        <CircularProgress isIndeterminate color='green.300' />
                    </Center> */}
            {/* ) :  */}
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
                    width={"60%"}
                    height="100vh">
                    <Card
                        width={"100%"}
                        height={"90%"}
                        display={"flex"}
                        justifyContent="center"
                        alignItems="center"
                        bg="gray.100"
                        borderRadius={10}
                        m={5}
                        gap={5}
                        textAlign={"center"}
                    >
                        <Text fontSize="3xl">
                            Actualiza tu Contraseña
                        </Text>
                        <Box
                            display={"flex"}
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                            gap={5}
                        >
                            <form onSubmit={handleSubmit}>
                                <FormControl >
                                    <FormLabel
                                        htmlFor='nombre'
                                    >
                                        Nombre
                                    </FormLabel>
                                    <Input type='text' name={'nombre'} id='nombre' value={input.nombre} onChange={handleInput} />
                                    {errors.nombre && <Text color={"red.500"} fontSize={'sm'}>{errors.nombre}</Text>}
                                </FormControl>
                                <FormControl >
                                    <FormLabel
                                        htmlFor='username'
                                    >
                                        Usuario</FormLabel>
                                    <Input type='text' name={'username'} id='username' value={input.username} onChange={handleInput} />
                                    {errors.username && <Text color={"red.500"} fontSize={'sm'}>{errors.username}</Text>}
                                </FormControl>
                                <FormControl >
                                    <FormLabel
                                        htmlFor='oldPassword'
                                    >
                                        Contraseña Anterior
                                    </FormLabel>
                                </FormControl>
                                <FormControl >
                                    <Input type='password' name={'oldPassword'} id='oldPassword' value={input.oldPassword} onChange={handleInput} />
                                    {errors.oldPassword && <Text color={"red.500"} fontSize={'sm'}>{errors.oldPassword}</Text>}
                                </FormControl>
                                <FormControl >
                                    <FormLabel
                                        htmlFor='newPassword'
                                    >
                                        Nueva Contraseña
                                    </FormLabel>
                                    <Input type='password' name={'newPassword'} id='newPassword' value={input.newPassword} onChange={handleInput} />
                                    {errors.newPassword && <Text color={"red.500"} fontSize={'sm'}>{errors.newPassword}</Text>}
                                </FormControl>


                                <Button
                                    type='submit'
                                    colorScheme="blue"
                                    variant="solid"
                                    width={"50%"}
                                    height={"10%"}
                                    mt={10}
                                >
                                    Actualizar
                                </Button>
                            </form>
                        </Box>
                    </Card>
                </Container>
            </Box >
            {/* } */}

        </>

    )
}

export default UpdateUser;