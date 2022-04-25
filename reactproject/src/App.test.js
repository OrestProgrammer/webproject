import React from 'react';
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import fetchMock from "jest-fetch-mock";
import App from './App';

fetchMock.enableMocks()

describe("App", () => {
  it("renders  with form", () => {
    render(<App />);
    expect(screen.getByTestId("navbar_test")).toBeInTheDocument();
  });
});