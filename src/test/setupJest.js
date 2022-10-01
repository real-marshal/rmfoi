import { dt } from '../features/Theming/design-tokens'

const mockDt = dt

// Fixing circular dependency issue
// It happens only in tests as in real life component code isn't executed first
// eslint-disable-next-line no-undef
jest.mock('@/features/Theming', () => ({
  dt: mockDt,
}))
