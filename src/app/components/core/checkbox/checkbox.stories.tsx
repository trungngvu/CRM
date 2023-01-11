import { ComponentMeta, ComponentStory } from '@storybook/react';

import Checkbox from './index';

export default {
  title: 'Core/Checkbox',
  component: Checkbox,
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
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = args => <Checkbox {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  label: {
    text: 'Label',
    className: '',
  },
};
