import React from 'react';
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";
import FamilyBudgetHistory from "../Components/FamilyBudgetHistory";

fetchMock.enableMocks()


const data = {AccountHistory:{
    id: 2, sum: 20, data: "10:10:10", transaction_type: "express"
    }}
describe("Account page", () => {

    localStorage.setItem("loggeduser", true)

    it("renders family budget history and shows info", async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><FamilyBudgetHistory /></Router>);
        });

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa(`oliver:12345678`)}`);
        headers.set('content-type', 'application/json');

        await expect(fetch).toHaveBeenCalledWith("http://0.0.0.0:8089/api/v1/accounthistory/2", {
            method: 'GET',
            headers,
        });

        await expect(fetch).toHaveBeenCalledTimes(1);
    });
});