import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";
import FamilyBudget from "../Components/FamilyBudget";

fetchMock.enableMocks()

const data = {id: "2", cash: "2000"}
const deleted_data = {data: "Budget was deleted."};

describe("Edit user page", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders family budget and shows info', async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><FamilyBudget /></Router>);
        });

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa(`oliver:12345678`)}`);
        headers.set('content-type', 'application/json');

        await expect(fetch).toHaveBeenCalledWith("http://0.0.0.0:8089/api/v1/budget/2", {
            method: 'GET',
            headers,
        });

        await expect(fetch).toHaveBeenCalledTimes(1);
    });


    it("deletes family badget", async () => {

        // const loginUser = JSON.parse(localStorage.getItem('loggeduser'));

        localStorage.setItem("loggeduser", true)

        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><FamilyBudget /></Router>);
        });

        await fetch.mockImplementationOnce(() => Promise.resolve(deleted_data));

        const deleteButton = screen.getByTestId("family_budget_btn");
        fireEvent.click(deleteButton);

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa(`oliver:12345678`)}`);
        headers.set('content-type', 'application/json');

        await expect(fetch).toHaveBeenCalledWith("http://0.0.0.0:8089/api/v1/budget/2", {
            method: 'DELETE',
            headers,
        });
        await expect(fetch).toHaveBeenCalledTimes(2);
    });
});