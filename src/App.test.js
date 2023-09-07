import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MyForm from './components/Form';

test('renders form with inputs and submit button', () => {
  render(<MyForm />);

  // Check if form elements are present
  const nameInput = screen.getByLabelText('Name:');
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByText('Submit');

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('form input fields can be typed into', () => {
  render(<MyForm />);

  const nameInput = screen.getByLabelText('Name:');
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');

  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  expect(nameInput.value).toBe('John Doe');
  expect(emailInput.value).toBe('john@gmail.com');
  expect(passwordInput.value).toBe('password123');
});

test('form submission calls handleSubmit function', () => {
  const handleSubmitMock = jest.fn();
  render(<MyForm handleSubmit={handleSubmitMock} />);

  const nameInput = screen.getByLabelText('Name:');
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByText('Submit');

  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  fireEvent.click(submitButton);

  // Check if handleSubmit function was called with the correct form data
  expect(handleSubmitMock).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@gmail.com',
    password: 'password123',
  });
});


// button should be disable for empty name
test('button should be disable for empty name', () => {
  render(<MyForm />);

  const nameInput = screen.getByLabelText('Name:');
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByText('Submit');

  fireEvent.change(nameInput, { target: { value: '' } });
  fireEvent.change(emailInput, { target: { value: '' } });
  
  expect(submitButton).toBeDisabled();
});

// to check all the field is not empty
test('to check all the field is not empty', () => {
  render(<MyForm />);

  const nameInput = screen.getByLabelText('Name:');
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitButton = screen.getByText('Submit');

  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'huzaifa@gmail.com' } });

  expect(submitButton).toBeEnabled();
});


