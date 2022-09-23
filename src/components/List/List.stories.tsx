import type { Meta, Story } from '@storybook/react'
import { List, ListProps } from './List'
import { Basic as BasicListItem, Selected } from './ListItem/ListItem.stories'

export default {
  title: 'Common/List/List',
  component: List,
} as Meta

const Template: Story<ListProps> = (args) => <List {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: [
    <Selected {...Selected.args} key={1}>
      Selected List Item 1
    </Selected>,
    <BasicListItem {...BasicListItem.args} key={2}>
      Basic List Item 2
    </BasicListItem>,
    <BasicListItem {...BasicListItem.args} key={3}>
      Basic List Item 3
    </BasicListItem>,
  ],
}
