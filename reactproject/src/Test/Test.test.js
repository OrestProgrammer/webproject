import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import Login from "../Components/Login";
import {act} from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";


const data = {data: "Successful login!"};

fetchMock.enableMocks()

describe("Login page", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders Login with form", () => {
        render(<Router><Login /></Router>);
        expect(screen.getByRole("form")).toBeInTheDocument();
    });

    it("logs user in", async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render (<Router><Login /></Router>);
        });

        const submitBtn = screen.getByRole("form").querySelector("button");
        fireEvent.click(submitBtn);

        await expect(fetch).toHaveBeenCalledWith("http://0.0.0.0:8089/api/v1/user/login", {method: 'POST',
            body: JSON.stringify({"username": "", "password": ""}),
            headers: { 'Content-Type': 'application/json' },
        });
        await expect(fetch).toHaveBeenCalledTimes(1);
    });
});

