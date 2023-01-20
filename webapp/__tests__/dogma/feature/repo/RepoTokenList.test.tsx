import { act, fireEvent, render } from '@testing-library/react';
import RepoTokenList, { RepoTokenListProps } from 'dogma/features/repo/RepoTokenList';

describe('RepoTokenList', () => {
  let expectedProps: JSX.IntrinsicAttributes & RepoTokenListProps<object>;

  beforeEach(() => {
    jest.useFakeTimers();
    const mockRepoTokens = [
      {
        appId: 'test-token',
        role: 'MEMBER',
        creation: {
          user: 'lb56789@localhost.localdomain',
          timestamp: '2022-12-02T08:28:05.364140Z',
        },
      },
      {
        appId: 'test-token2',
        role: 'OWNER',
        creation: {
          user: 'lb123456@localhost.localdomain',
          timestamp: '2022-12-02T08:28:05.364140Z',
        },
      },
    ];
    expectedProps = {
      data: mockRepoTokens,
    };
  });

  it('renders the App ID', () => {
    const { container } = render(<RepoTokenList {...expectedProps} />);
    const tbody = container.querySelector('tbody');
    expect(tbody.children.length).toBe(2);
    const firstCell = tbody.firstChild.firstChild.firstChild;
    expect(firstCell).toHaveTextContent('test-token');
    const secondCell = tbody.lastChild.firstChild.firstChild;
    expect(secondCell).toHaveTextContent('test-token2');
  });

  it('renders the role', () => {
    const { container } = render(<RepoTokenList {...expectedProps} />);
    const tbody = container.querySelector('tbody');
    const firstRole = tbody.children[0].children[1].firstChild;
    expect(firstRole).toHaveTextContent('MEMBER');
  });

  it('renders the creator (added by)', () => {
    const { container } = render(<RepoTokenList {...expectedProps} />);
    const tbody = container.querySelector('tbody');
    const firstCreator = tbody.children[0].children[2].firstChild;
    expect(firstCreator).toHaveTextContent('lb56789@localhost.localdomain');
  });

  it('renders the delete button', () => {
    const { container } = render(<RepoTokenList {...expectedProps} />);
    const tbody = container.querySelector('tbody');
    const firstCreator = tbody.children[0].children[4].firstChild;
    expect(firstCreator).toHaveTextContent('Delete');
  });

  it('renders a table with a row for each member', () => {
    const { container } = render(<RepoTokenList {...expectedProps} />);
    expect(container.querySelector('tbody').children.length).toBe(2);
  });

  it('displays a matching App ID when searched', () => {
    const { queryByPlaceholderText, container } = render(<RepoTokenList {...expectedProps} />);
    const inputElement = queryByPlaceholderText(/search.../i);
    fireEvent.change(inputElement, { target: { value: 'test-token2' } });
    act(() => {
      jest.advanceTimersByTime(500);
    });
    const tbody = container.querySelector('tbody');
    expect(tbody.children.length).toBe(1);
    const firstCell = tbody.firstChild.firstChild.firstChild;
    expect(firstCell).toHaveTextContent('test-token2');
  });
});
