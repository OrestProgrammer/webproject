import React from 'react';
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import fetchMock from "jest-fetch-mock";
import Navbar from "../Components/Navbar";

fetchMock.enableMocks()


describe("Account page", () => {
    it("renders Login with form", () => {
        render(<Router><Navbar /></Router>);
        expect(screen.getByTestId("navbar_test")).toBeInTheDocument();
    });
});