/*eslint-disable no-unused-vars*/

import { Flex, Center, Box, Text, Button, CircularProgress } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { getFacturas } from '../services/services.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FacturaCard from './FacturaCard.jsx'
import { UserContext } from '../context/user.jsx';



const Perfil = () => {
    const [facturas, setFacturas] = useState([])
    const { user, setUser } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        const userData = JSON.parse(window.localStorage.getItem('loggedUser'))
        setUser(userData)
        getFacturas(userData.token).then(res => setFacturas(res))
        setTimeout(() => {
            setLoading(false)
        }, 2500)
    }, [])

    const onLogout = () => {
        window.localStorage.clear()
        navigate('/')
    }

    return (
        <>
            {
                loading ?
                    <Center h='100vh'>
                        <CircularProgress isIndeterminate color='green.300' />
                    </Center>
                    :
                    <Flex
                        color='white'
                        height={'100vh'}
                    >
                        <Center
                            w='20%'
                            bg='gray.100'
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={'center'}
                            justifyContent={'space-around'}
                            borderRight={'4px'}
                            borderColor={'gray.300'}
                        >
                            <Box>

                                <Text
                                    color={'gray.700'}
                                    fontSize={'3xl'}
                                    fontWeight={'bold'}
                                    textAlign={'center'}
                                    marginTop={'10%'}
                                    marginBottom={'10%'}
                                >
                                    Bienvenido {user.nombre} aquí podrás ver tus facturas
                                </Text>
                            </Box>
                            <Button
                                onClick={onLogout}
                                colorScheme={'blue'}
                                variant={'solid'}
                            >
                                Salir
                            </Button>
                        </Center>
                        <Box
                            width={'80%'}
                            display={'flex'}
                            flexDirection={'column'}
                            bg='gray.100'
                            borderLeft={'4px'}
                            borderColor={'gray.300'}
                        >
                            <Box>
                                <Text
                                    color={'blue.300'}
                                    fontSize={'3xl'}
                                    fontWeight={'bold'}
                                    textAlign={'center'}
                                    marginTop={'3%'}
                                    marginBottom={'10%'}
                                    textDecoration={'underline'}
                                >
                                    Facturas
                                </Text>
                            </Box>
                            <Box
                                display={'grid'}
                                gridTemplateColumns={'repeat(4, 1fr)'}
                                gap={'10px'}
                            >
                                {facturas && facturas.map((factura) => (

                                    <FacturaCard
                                        key={factura.idfactura}
                                        cliente={user.nombre}
                                        username={user.username}
                                        total={factura.total}
                                        fecha={factura.fecha}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Flex>
            }
        </>
    )
}

export default Perfil;