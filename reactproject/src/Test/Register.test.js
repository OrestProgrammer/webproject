import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import Register from "../Components/Register";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks()

const data = {data: "New user was added to data base"}

describe("Register page", () => {
    it("renders Register with form", () => {
        render(<Router><Register /></Router>);
        expect(screen.getByTestId("registerform")).toBeInTheDocument();
    });

    it("registers user", async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render (<Router><Register /></Router>);
        });

        const submitBtn = screen.getByTestId("registerform").querySelector(".registerbtn");
        fireEvent.click(submitBtn);

        await expect(fetch).toHaveBeenCalledWith("http://0.0.0.0:8089/api/v1/user", {
            method: 'POST',
            body: JSON.stringify({
                firstname: "",
                lastname: "",
                username: "",
                password: "",
                email: "",
                phone: ""
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        await expect(fetch).toHaveBeenCalledTimes(1);
    });

})
