import { expect, vi, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import AppWrapper from './components/AppWrapper';


render(<AppWrapper children="Test" />);

test('renders a header section', () => {
  const heading = screen.getByRole('banner');

  expect(heading).toBeDefined();
})

test('renders a footer section', () => {
  const footer = screen.getByRole('contentinfo');

  expect(footer).toBeDefined();
})

test('renders a main section with expected content', () => {
  const main = screen.getByRole('main');

  expect(main).toBeDefined();
  expect(main.textContent).toBe("Test");
})
