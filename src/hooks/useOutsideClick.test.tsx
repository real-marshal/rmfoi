import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRef } from 'react'
import { useOutsideClick } from './useOutsideClick'

describe('useOutsideClick', () => {
  it('should call the callback if a user clicked somewhere', async () => {
    const user = userEvent.setup()
    const fnMock = jest.fn()

    const TestComponent = () => {
      const ref = useRef(null)

      useOutsideClick(ref, fnMock)
      return (
        <>
          <div>somewhere else</div>
          <div ref={ref}>Ref</div>
        </>
      )
    }

    render(<TestComponent />)

    await user.click(screen.getByText('somewhere else'))

    expect(fnMock).toHaveBeenCalled()
  })

  it('should not call the callback if a user clicked on a node defined by the passed ref', async () => {
    const user = userEvent.setup()
    const fnMock = jest.fn()

    const TestComponent = () => {
      const ref = useRef(null)

      useOutsideClick(ref, fnMock)
      return (
        <>
          <div>somewhere else</div>
          <div ref={ref}>Ref</div>
        </>
      )
    }

    render(<TestComponent />)

    await user.click(screen.getByText('Ref'))

    expect(fnMock.mock.calls).toHaveLength(0)
  })
})
