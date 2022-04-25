import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";
import SelectBudget from "../Components/SelectBudget";

fetchMock.enableMocks()

const data = {data: "User was deleted."};


describe("Edit user page", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders select budget and show my budget", async () => {
        localStorage.setItem("loggeduser", true)

        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><SelectBudget /></Router>);
        });

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa(`oliver:12345678`)}`);
        headers.set('content-type', 'application/json');

        const editButton = screen.getByTestId("my_budget_btn");
        fireEvent.click(editButton);

        await expect(fetch).toHaveBeenCalledTimes(2);
    });


    it("renders select budget and shows family budget", async () => {
        localStorage.setItem("loggeduser", true)

        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><SelectBudget /></Router>);
        });

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa(`oliver:12345678`)}`);
        headers.set('content-type', 'application/json');

        const editButton = screen.getByTestId("family_budget_btn");
        fireEvent.click(editButton);

        await expect(fetch).toHaveBeenCalledTimes(2);
    });

    it("renders select budget and create family budget", async () => {
        localStorage.setItem("loggeduser", true)

        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><SelectBudget /></Router>);
        });

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa(`oliver:12345678`)}`);
        headers.set('content-type', 'application/json');

        const editButton = screen.getByTestId("create_family_budget_btn");
        fireEvent.click(editButton);

        await expect(fetch).toHaveBeenCalledTimes(2);
    });


});