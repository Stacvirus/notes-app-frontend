import React from "react"
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Note from "../Note"
import userEvent from "@testing-library/user-event"

test('renders content', async () => {
    const note = {
        content: 'component testing is done with react-testing-library',
        important: true
    }

    const mockHandler = jest.fn()//fucntion for user event handler

    // render(<Note note={note} />)

    const { container } = render(<Note note={note} updateNote={mockHandler} />)

    // const elem = screen.getByText('component testing is done with react-testing-library')
    // expect(elem).toBeDefined()

    const user = userEvent.setup()
    const btn = screen.getByText('make not important')
    await user.click(btn)

    expect(mockHandler.mock.calls).toHaveLength(1)

    // const div = container.querySelector('.note')
    // screen.debug(div)//displaying the content of the div var in command line env
    // expect(div).toHaveTextContent('component testing is done with react-testing-library')
})