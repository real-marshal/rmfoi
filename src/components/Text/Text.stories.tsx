import type { Meta, Story } from '@storybook/react'
import { Text, TextProps } from './Text'

export default {
  title: 'Common/Text',
  component: Text,
} as Meta

const Template: Story<TextProps> = (args) => <Text {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: 'Basic text',
}
