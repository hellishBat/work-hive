// AbsenceChip Stories
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AbsenceChip } from './'

const meta: Meta<typeof AbsenceChip> = {
  title: 'UI/Chip/AbsenceChip',
  component: AbsenceChip,
  tags: ['autodocs'],
  args: {
    className: '',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['Sick', 'Vacation'],
    },
    className: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof AbsenceChip>

export const Sick: Story = {
  args: {
    type: 'Sick',
  },
}

export const Vacation: Story = {
  args: {
    type: 'Vacation',
  },
}
