import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";
import ReplenishBudget from "../Components/ReplenishBudget";

fetchMock.enableMocks()

const data = {cash: 100};
const data2 = {data: "Cash successfully added to budget"};

describe("Edit user page", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders Register with form", () => {
        localStorage.setItem("loggeduser", true)
        render(<Router><ReplenishBudget /></Router>);
        expect(screen.getByTestId("replenish_budget_form")).toBeInTheDocument();
    });

    it("renders Replenish budget", async () => {

        localStorage.setItem("loggeduser", true)

        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><ReplenishBudget /></Router>);
        });

        await fetch.mockImplementationOnce(() => Promise.resolve(data2));

        const editButton = screen.getByTestId("replenish_budget");
        fireEvent.click(editButton);

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa(`oliver:12345678`)}`);
        headers.set('content-type', 'application/json');


        await expect(fetch).toHaveBeenCalledTimes(1);

    });

});