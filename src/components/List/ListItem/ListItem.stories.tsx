import type { Meta, Story } from '@storybook/react'
import { ListItem, ListItemProps } from './ListItem'

export default {
  title: 'Common/List/ListItem',
  component: ListItem,
} as Meta

const Template: Story<ListItemProps> = (args) => <ListItem {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: 'List Item',
}

export const Selected = Template.bind({})
Selected.args = {
  children: 'List Item Selected',
  selected: true,
}
