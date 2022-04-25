import React from 'react';
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";
import BudgetHistory from "../Components/BudgetHistory";

fetchMock.enableMocks()


const data = {AccountHistory:{
    id: 1, sum: 20, data: "10:10:10", transaction_type: "income"
    }}
describe("Account page", () => {

    localStorage.setItem("loggeduser", true)

    it("renders budget history and shows info", async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><BudgetHistory /></Router>);
        });

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa(`oliver:12345678`)}`);
        headers.set('content-type', 'application/json');

        await expect(fetch).toHaveBeenCalledWith("http://0.0.0.0:8089/api/v1/accounthistory/1", {
            method: 'GET',
            headers,
        });

        await expect(fetch).toHaveBeenCalledTimes(1);
    });
});