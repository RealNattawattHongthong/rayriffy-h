import React, { useContext, useEffect } from 'react'

import { Box } from '@chakra-ui/core'

import { Subtitle } from '../../../app/context'

import NotAvaliable from '../../../core/components/notAvaliable'

const CollectionComponent: React.FC = () => {
  const [, setSubtitle] = useContext(Subtitle)

  useEffect(() => {
    setSubtitle(`collection`)
  }, [])

  return (
    <Box pt={3}>
      <NotAvaliable />
    </Box>
  )
}

export default CollectionComponent
