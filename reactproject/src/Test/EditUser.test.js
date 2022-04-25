import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";
import EditUser from "../Components/EditUser";


fetchMock.enableMocks()

const data = {data: {user: {
            firstname: "Orest",
            lastname: "Chukla",
            username: "oliver",
            email: "oliver_breezzy@ukr.net",
            phone: "12345678"
        }}};

const changed_data = {data: {user: {
            firstname: "Orest",
            lastname: "Chukla",
            username: "oliver",
            email: "oliver_breezzy@ukr.net",
            phone: "12345678"
        }}};

const deleted_data = {data: "User was deleted."};


describe("Edit user page", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders EditAccount and shows filled inputs", async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><EditUser /></Router>);
        });

        const inputs = screen.getByTestId("edit_user_form").querySelectorAll("input");
        expect(screen.getAllByRole("textbox")[0]).toHaveValue(data.data.user.firstname);
        expect(screen.getAllByRole("textbox")[1]).toHaveValue(data.data.user.lastname);
        expect(screen.getAllByRole("textbox")[2]).toHaveValue(data.data.user.username);
        expect(screen.getAllByRole("textbox")[3]).toHaveValue(data.data.user.email);
        expect(screen.getAllByRole("textbox")[4]).toHaveValue(data.data.user.phone);

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa(`oliver:12345678`)}`);
        headers.set('content-type', 'application/json');

        await expect(fetch).toHaveBeenCalledWith("http://0.0.0.0:8089/api/v1/user/oliver", {
            method: 'GET',
            headers,
        });
        await expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("updates user", async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><EditUser /></Router>);
        });

        await fetch.mockImplementationOnce(() => Promise.resolve(changed_data));

        const editButton = screen.getByTestId("edit_btn");
        fireEvent.click(editButton);

        const inputs = screen.getByTestId("edit_user_form").querySelectorAll("input");
        expect(screen.getAllByRole("textbox")[0]).toHaveValue(changed_data.data.firstname);
        expect(screen.getAllByRole("textbox")[1]).toHaveValue(changed_data.data.lastname);
        expect(screen.getAllByRole("textbox")[2]).toHaveValue(changed_data.data.username);
        expect(screen.getAllByRole("textbox")[3]).toHaveValue(changed_data.data.email);
    });

    it("deletes user", async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><EditUser /></Router>);
        });

        await fetch.mockImplementationOnce(() => Promise.resolve(deleted_data));

        const deleteButton = screen.getByTestId("delete_btn");
        fireEvent.click(deleteButton);

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa(`oliver:12345678`)}`);
        headers.set('content-type', 'application/json');

        await expect(fetch).toHaveBeenCalledWith("http://localhost:8089/api/v1/user/oliver", {
            method: 'DELETE',
            headers,
        });
        await expect(fetch).toHaveBeenCalledTimes(2);
    });
});