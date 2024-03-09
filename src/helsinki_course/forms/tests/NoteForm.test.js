import React from "react"
import { screen, render } from "@testing-library/react"
import '@testing-library/jest-dom'
import NoteForm from "../NoteForm"
import userEvent from "@testing-library/user-event"

test('note form updates parent state and calls onSubmit', async () => {
    const createNote = jest.fn()
    const user = userEvent.setup()

    render(<NoteForm giveNote={createNote} />)

    const input = screen.getByRole('textbox')
    const sendBtn = screen.getByText('Save')

    await user.type(input, 'testing a form ...')
    await user.click(sendBtn)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0]).toBe('testing a form ...')
})