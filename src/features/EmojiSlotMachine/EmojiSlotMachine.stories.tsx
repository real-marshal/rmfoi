import type { Meta, Story } from '@storybook/react'
import { EmojiSlotMachine, EmojiSlotMachineProps } from './EmojiSlotMachine'

export default {
  title: 'Features/EmojiSlotMachine',
  component: EmojiSlotMachine,
} as Meta

const Template: Story<EmojiSlotMachineProps> = (args) => <EmojiSlotMachine {...args} />

export const Basic = Template.bind({})
Basic.args = {}
