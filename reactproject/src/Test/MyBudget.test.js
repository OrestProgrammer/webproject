import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";
import MyBudget from "../Components/MyBudget";

fetchMock.enableMocks()

const data = {id: "1", cash: "2000"}

describe("Edit user page", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders budget and shows info', async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><MyBudget /></Router>);
        });

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa(`oliver:12345678`)}`);
        headers.set('content-type', 'application/json');

        await expect(fetch).toHaveBeenCalledWith("http://0.0.0.0:8089/api/v1/budget/1", {
            method: 'GET',
            headers,
        });

        await expect(fetch).toHaveBeenCalledTimes(1);

    });
});