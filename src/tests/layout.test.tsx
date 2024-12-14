import { render, screen } from '@testing-library/react';

function Layout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}

test('renders layout component', () => {
    render(<Layout>Hello World</Layout>);
    const text = screen.getByText('Hello World');
    expect(text).toBeInTheDocument();
});
