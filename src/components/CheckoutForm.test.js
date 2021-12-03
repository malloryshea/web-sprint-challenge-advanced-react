import React from "react";
//import MutationObserver from 'mutationobserver-shim';
import { render, screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from '@testing-library/user-event';
// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render(<CheckoutForm/>)

    const checkoutTitle = screen.getByText(/Checkout Form:/i);
    const firstName = screen.getByLabelText (/First Name:/i);
    const lastName = screen.getByLabelText (/Last Name:/i);
    const address = screen.getByLabelText (/Address:/i);
    const city = screen.getByLabelText (/City:/i);
    const state= screen.getByLabelText (/State:/i);
    const zip = screen.getByLabelText (/Zip:/i);
    const submitButton = screen.getByRole ("button", {name:/checkout/i});

    expect(checkoutTitle).toBeVisible();
    expect(checkoutTitle).toBeInTheDocument();
    expect(checkoutTitle).toHaveTextContent(/Checkout Form/i);

    expect(firstName).toBeTruthy();
    expect(lastName).toBeTruthy();
    expect(address).toBeTruthy();
    expect(city).toBeTruthy();
    expect(state).toBeTruthy();
    expect(zip).toBeTruthy();

    expect(submitButton).toHaveBeenCalledTimes(1);
});

test("shows success message on submit with form details", () => {
    render(<CheckoutForm/>)

    const firstName = screen.getByLabelText(/FirstName:/i);
    const lastName = screen.getByLabelText(/LastName:/i);
    const address = screen.getByLabelText(/Address:/i);
    const city = screen.getByLabelText(/City:/i);
    const state = screen.getByLabelText(/State:/i);
    const zip = screen.getByLabelText(/Zip:/i);
    const submitButton = screen.getByRole ("button", {name:/checkout/i});

    userEvent.type(firstName, "Mallory");
    userEvent.type(lastName, "Shea");
    userEvent.type(address, "161 Bluets Dr.");
    userEvent.type(city, "Kyle");
    userEvent.type(state, "TX");
    userEvent.type(zip, "78640");
    userEvent.click(submitButton);

    const successMessage = screen.getByTestId(/successMessage/i);

    expect(successMessage).toBeVisible();
    expect(successMessage).toBeInTheDocument();
    
    expect(successMessage).toHaveTextContent(/You have ordered some plants! Woo-hoo!/i);
    expect(successMessage).toHaveTextContent(/Your new green friends will be shipped to:/i);;
    expect(successMessage).toHaveTextContent(/Mallory/i);
    expect(successMessage).toHaveTextContent(/Shea/i);
    expect(successMessage).toHaveTextContent(/161 Bluets Dr./i);
    expect(successMessage).toHaveTextContent(/Kyle/i);
    expect(successMessage).toHaveTextContent(/TX/i);
    expect(successMessage).toHaveTextContent(/78640/i);
    
    expect(submitButton).toHaveBeenCalledTimes(1);
});
    