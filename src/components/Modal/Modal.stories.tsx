import type { Meta, Story } from '@storybook/react'
import { Modal, ModalProps } from './Modal'

export default {
  title: 'Common/Modal',
  component: Modal,
} as Meta

const Template: Story<ModalProps> = (args) => (
  <div>
    <h1>Some background content</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt cum placeat quis voluptas
      repellendus, debitis velit porro expedita est pariatur sunt eaque, iste ratione aut quaerat
      quas et facilis? Repellat!
    </p>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita porro alias, odio, mollitia
      consequuntur consectetur, sequi quos necessitatibus sit veniam tempore quasi culpa unde
      facilis. Asperiores eum nemo nobis voluptatum?
    </p>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita porro alias, odio, mollitia
      consequuntur consectetur, sequi quos necessitatibus sit veniam tempore quasi culpa unde
      facilis. Asperiores eum nemo nobis voluptatum?
    </p>
    <Modal {...args} />
  </div>
)

export const Basic = Template.bind({})
Basic.args = {
  isOpen: true,
}
