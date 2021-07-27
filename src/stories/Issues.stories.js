import React from 'react';
import {Skeleton, Text} from '@chakra-ui/react';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Issues',
};

/** props don't work, default animation doesn't appear */
export const SkeletonIssue = () => (
  <Skeleton>
    <Text>Hello</Text>
  </Skeleton>
);
