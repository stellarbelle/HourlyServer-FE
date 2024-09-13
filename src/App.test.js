import React from 'react';
import { render } from '@testing-library/react';
import Servers from './routes/servers';
import { MemoryRouter } from 'react-router-dom'

describe("<Servers />", () => {
  it("server page renders", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Servers />
      </MemoryRouter>
    );
    expect(getByText(/New Server/i)).toBeInTheDocument();
  });
});