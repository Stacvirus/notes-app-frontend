import React from "react"
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Togglable from "../Togglable"

describe('togglable', () => {
    let container

    beforeEach(() => {
        container = render(
            <Togglable btnLabel='show ...'>
                <div className='testDiv'>
                    togglable content
                </div>
            </Togglable>
        ).container
    })

    test('renders its children', async () => {
        await screen.findAllByText('togglable content')
    })

    test('at start the children are not displayed', () => {
        const div = container.querySelector('.togglabelContent')
        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the btn, children are displayed', async () => {
        const user = userEvent.setup()
        const btn = screen.getByText('show ...')
        await user.click(btn)

        const div = container.querySelector('.togglabelContent')
        expect(div).not.toHaveStyle('display: none')


    })
    test('toggled content can be closed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show ...')
        await user.click(button)

        const btnCancle = screen.getByText('cancel')
        await user.click(btnCancle)

        const div = container.querySelector('.togglabelContent')
        expect(div).toHaveStyle('display: none')
    })


})