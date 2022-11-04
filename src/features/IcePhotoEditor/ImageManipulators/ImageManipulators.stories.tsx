import type { Meta, Story } from '@storybook/react'
import { ImageManipulators } from './ImageManipulators'

export default {
  title: 'Features/IcePhotoEditor/Common/ImageManipulators',
  component: ImageManipulators,
} as Meta

const Template: Story = (args) => <ImageManipulators {...args} />

export const Basic = Template.bind({})
Basic.args = {}
