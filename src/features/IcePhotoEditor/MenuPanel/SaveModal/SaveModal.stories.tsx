import type { Meta, Story } from '@storybook/react'
import { SaveModal, SaveModalProps } from './SaveModal'

export default {
  title: 'Common/SaveModal',
  component: SaveModal,
} as Meta

const Template: Story<SaveModalProps> = (args) => <SaveModal {...args} />

export const Basic = Template.bind({})
Basic.args = {}
