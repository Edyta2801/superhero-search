import React, { FC } from 'react';
import { Button } from '@chakra-ui/react';

interface ButtonProps {
    size: string | any;
    variantColor: string;
}

const CustomButton: FC<ButtonProps> = ({ size, variantColor }) => (
  <Button variantColor={variantColor} size={size}>
    Button
  </Button>
);

export default CustomButton;
