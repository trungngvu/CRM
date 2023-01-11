import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from './index';

export default {
  title: 'Core/Button',
  component: Button,
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    },
    className: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  children: 'Button',
};

export const Loading = Template.bind({});
Loading.args = {
  children: 'Button',
  isLoading: true,
};
