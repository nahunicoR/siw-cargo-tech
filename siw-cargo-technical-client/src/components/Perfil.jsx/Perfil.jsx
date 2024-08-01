/*eslint-disable no-unused-vars*/

import { Flex, Center, Box, Text, Button, CircularProgress } from '@chakra-ui/react';
import { useEffect } from 'react';
import { getFacturas } from '../../services/services';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FacturaCard from '../FacturaCard.jsx'



const Perfil = () => {
    const [facturas, setFacturas] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        const user = JSON.parse(localStorage.getItem('loggedUser'))
        getFacturas(user.token).then(res => setFacturas(res))
        setUser(user)
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
                                    color={'gray.800'}
                                    fontSize={'3xl'}
                                    fontWeight={'bold'}
                                    textAlign={'center'}
                                    marginTop={'10%'}
                                    marginBottom={'10%'}
                                >
                                    Bienvenido aquí podrás ver tus facturas
                                </Text>
                                <Text
                                    color={'gray.800'}
                                    fontSize={'3xl'}
                                    textAlign={'center'}
                                >
                                    {user.nombre}
                                </Text>
                                <Text
                                    textAlign={'center'}
                                    color={'gray.500'}
                                    fontSize={'3xl'}
                                >
                                    Welcome
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
                                    color={'gray.800'}
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
                                    <Box key={factura.facturaid} margin={'10px'} >
                                        <FacturaCard
                                            cliente={factura.cliente}
                                            total={factura.total}
                                            fecha={factura.fecha}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Flex>
            }
        </>
    )
}

export default Perfil;