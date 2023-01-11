import { ComponentMeta, ComponentStory } from '@storybook/react';

import { EmailIcon } from '../icons';
import Input from './index';

export default {
  title: 'Core/Input',
  component: Input,
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
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = args => <Input {...args} />;

export const Initial = Template.bind({});
Initial.args = {};

export const Password = Template.bind({});
Password.args = {
  type: 'password',
};

export const Label = Template.bind({});
Label.args = {
  labelOptions: {
    text: 'Label',
    className: '',
  },
};

export const Icon = Template.bind({});
Icon.args = {
  type: 'text',
  iconOptions: {
    icon: EmailIcon,
  },
};

export const Error = Template.bind({});
Error.args = {
  errorOptions: {
    message: 'Error Message',
    className: '',
  },
};
