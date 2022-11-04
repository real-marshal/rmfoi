import type { Meta, Story } from '@storybook/react'
import { IcePhotoEditor } from './IcePhotoEditor'

export default {
  title: 'Features/IcePhotoEditor',
  component: IcePhotoEditor,
} as Meta

const Template: Story = (args) => <IcePhotoEditor {...args} />

export const Basic = Template.bind({})
Basic.args = {}
