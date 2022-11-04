import type { Meta, Story } from '@storybook/react'
import { MenuPanel, MenuPanelProps } from './MenuPanel'

export default {
  title: 'Features/IcePhotoEditor/Common/MenuPanel',
  component: MenuPanel,
} as Meta

const Template: Story<MenuPanelProps> = (args) => <MenuPanel {...args} />

export const Basic = Template.bind({})
Basic.args = {}
