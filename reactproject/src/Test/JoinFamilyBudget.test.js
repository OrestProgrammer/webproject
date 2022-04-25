import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";
import JoinFamilyBudget from "../Components/JoinFamilyBudget";

fetchMock.enableMocks()

const data = {familibudgetId: "1"};

describe("Edit user page", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders EditAccount and shows filled inputs", async () => {

        localStorage.setItem("loggeduser", true)

        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><JoinFamilyBudget /></Router>);
        });

        const editButton = screen.getByTestId("join_budget_btn");
        fireEvent.click(editButton);

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa(`oliver:12345678`)}`);
        headers.set('content-type', 'application/json');


        await expect(fetch).toHaveBeenCalledTimes(1);
    });

});