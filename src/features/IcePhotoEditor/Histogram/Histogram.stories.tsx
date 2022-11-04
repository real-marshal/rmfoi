import type { Meta, Story } from '@storybook/react'
import { Histogram } from './Histogram'

export default {
  title: 'Features/IcePhotoEditor/Common/Histogram',
  component: Histogram,
} as Meta

const Template: Story = (args) => <Histogram {...args} />

export const Basic = Template.bind({})
Basic.args = {}
