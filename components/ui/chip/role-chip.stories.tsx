// RoleChip Stories
import type { Meta, StoryObj } from '@storybook/react-vite'
import { RoleChip, RoleType } from './role-chip'

const meta: Meta<typeof RoleChip> = {
  title: 'UI/Chip/RoleChip',
  component: RoleChip,
  tags: ['autodocs'],
  args: {
    className: '',
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' }, // Tailwind slate-900-ish
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.backgrounds?.value === '#0f172a'
      return (
        <div
          className={isDark ? 'dark bg-background p-4' : 'bg-background p-4'}
        >
          <Story />
        </div>
      )
    },
  ],
}

export default meta
type Story = StoryObj<typeof RoleChip>

// Show all role variants side by side
const roles: RoleType[] = ['User', 'Manager', 'Admin', 'Owner']

export const Variants = {
  render: () => (
    <div className="flex gap-2">
      {roles.map((role) => (
        <RoleChip key={role} role={role} />
      ))}
    </div>
  ),
}

export const User: Story = { args: { role: 'User' } }
export const Manager: Story = { args: { role: 'Manager' } }
export const Admin: Story = { args: { role: 'Admin' } }
export const Owner: Story = { args: { role: 'Owner' } }
