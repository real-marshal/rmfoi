import type { Meta, Story } from '@storybook/react'
import { ImageHistory } from './ImageHistory'

export default {
  title: 'Features/IcePhotoEditor/Common/ImageHistory',
  component: ImageHistory,
} as Meta

const Template: Story = (args) => <ImageHistory {...args} />

export const Basic = Template.bind({})
Basic.args = {}
