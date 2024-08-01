/*eslint-disable no-unused-vars*/

import { Card, Text } from '@chakra-ui/react';


const FacturaCard = ({ total, fecha }) => {

    return (

        <>
            <Card
                maxW='sm'
                height={'240'}
                border={'2px'}
                borderColor={'gray.300'}
                borderRadius={'10px'}
                padding={'10px'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
            >
                <Text>
                    Fecha: {fecha}
                </Text>

                <Text
                    fontWeight={'bold'}
                    color={'blue.300'}

                >
                    Total a abonar: ${total}
                </Text>
            </Card>
        </>
    )

}

export default FacturaCard;