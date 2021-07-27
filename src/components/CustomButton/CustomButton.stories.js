import React from 'react';
import CustomButton from './CustomButton';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  component: CustomButton,
  title: 'CustomButton',
};


const Template = (args: any) => <CustomButton {...args} />;

export const Default: any = Template.bind({});
Default.args = {
  size: 'md',
  variantColor: 'green',
};
