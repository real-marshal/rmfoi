import type { Meta, Story } from '@storybook/react'
import { ThemeSwitcher } from './ThemeSwitcher'

export default {
  title: 'Features/ThemeSwitcher',
  component: ThemeSwitcher,
} as Meta

const Template: Story = (args) => <ThemeSwitcher {...args} />

export const Basic = Template.bind({})
Basic.args = {}
