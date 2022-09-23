import type { Meta, Story } from '@storybook/react'
import { Heading, HeadingProps } from './Heading'

export default {
  title: 'Common/Heading',
  component: Heading,
} as Meta

const Template: Story<HeadingProps> = (args) => <Heading {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: 'Heading',
  type: 'h1',
}
