import type { Meta, Story } from '@storybook/react'
import { Card, CardProps } from './Card'
import BlankImage from '@/assets/blank.png'

export default {
  title: 'Common/Card',
  component: Card,
} as Meta

const Template: Story<CardProps> = (args) => <Card {...args} />

export const Basic = Template.bind({})
Basic.args = {
  name: 'Card heading',
  description: 'This is the description of the content that this card is supposed to encapsulate',
  media: 'image',
  src: BlankImage,
}
