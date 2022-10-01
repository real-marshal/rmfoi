import type { Meta, Story } from '@storybook/react'
import { SlotMachine, SlotMachineProps } from './SlotMachine'

export default {
  title: 'Features/SlotMachine',
  component: SlotMachine,
} as Meta

const Template: Story<SlotMachineProps> = (args) => <SlotMachine {...args} />

export const Basic = Template.bind({})
Basic.args = {
  elementsInColumn: 5,
}
