import React from 'react';
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";
import UserPage from "../Components/UserPage";

fetchMock.enableMocks()

const data = {data: {username: "oliver", firstname: "Orest", lastname: "Chukla", email: "oliver_breezzy@ukr.net", phone: "12334567"}};

describe("Account page", () => {

    it("renders Account and shows info", async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><UserPage /></Router>);
        });

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa(`oliver:12345678`)}`);
        headers.set('content-type', 'application/json');

        await expect(fetch).toHaveBeenCalledWith("http://0.0.0.0:8089/api/v1/user/oliver", {
            method: 'GET',
            headers,
        });

        await expect(fetch).toHaveBeenCalledTimes(1);
    });
});