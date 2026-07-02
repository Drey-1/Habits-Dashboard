import { render, screen } from "@testing-library/react"
import {describe, it, expect} from "vitest"
import Btn from "./Btn"

describe("Btn", () => {
    it("must render the passed content", () => {
        render(<Btn color="#fff" content="Click here"/>)

        expect(screen.getByText("Click here")).toBeInTheDocument()
    })

    it("must apply the correct color to the background", () => {
        render(<Btn color="#ff0000" content="Click here"/>)

        const button = screen.getByRole("button")

        expect(button).toHaveStyle({backgroundColor: "#ff0000"})
    })
})