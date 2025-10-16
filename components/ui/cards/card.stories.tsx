// Card Stories
import { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'next-themes'
import { Card } from './'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class">
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the card padding',
    },
    title: {
      control: 'text',
      description: 'Optional title for the card',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    children: {
      control: 'text',
      description: 'Content inside the card',
    },
  },
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    size: 'md',
    children: 'This is a default card with medium size.',
  },
}

export const WithTitle: Story = {
  args: {
    size: 'md',
    title: 'Card Title',
    children: 'This card has a title and medium size.',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    title: 'Small Card',
    children: 'This is a small card with reduced padding.',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    title: 'Large Card',
    children: 'This is a large card with increased padding.',
  },
}

export const CustomClass: Story = {
  args: {
    size: 'md',
    title: 'Custom Styled Card',
    className: 'bg-primary text-primary-foreground border-primary',
    children: 'This card uses custom Tailwind classes for styling.',
  },
}

export const DarkMode: Story = {
  args: {
    size: 'md',
    title: 'Dark Mode Card',
    children: 'This card is displayed in dark mode.',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
