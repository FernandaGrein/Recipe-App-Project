import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const PAGE_TITLE_ID = 'page-title';
const PROFILE_TOP_BTN_ID = 'profile-top-btn';
const SEARCH_TOP_BTN_ID = 'search-top-btn';
const SEARCH_INPUT_ID = 'search-input';

describe('Testes do componente Header', () => {
  test('Testa se o Header NÂO é renderizado na pagina App', () => {
    renderWithRouter(<App />);
    const title = screen.queryByTestId(PAGE_TITLE_ID);
    expect(title).not.toBeInTheDocument();
  });
  test('Testa se o Header é renderizado na pagina Foods', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const title = await screen.findByTestId(PAGE_TITLE_ID);
    const profileIcon = screen.getByTestId(PROFILE_TOP_BTN_ID);
    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN_ID);
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('Foods');
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });
  test('Testa se o Header é renderizado na pagina Drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const title = await screen.findByTestId(PAGE_TITLE_ID);
    const profileIcon = screen.getByTestId(PROFILE_TOP_BTN_ID);
    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN_ID);
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('Drinks');
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });
  test('Testa se o Header é renderizado na pagina Profile', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const title = await screen.findByTestId(PAGE_TITLE_ID);
    const profileIcon = screen.getByTestId(PROFILE_TOP_BTN_ID);
    const searchIcon = screen.queryByTestId(SEARCH_TOP_BTN_ID);
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('Profile');
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
  });
  test('Testa se o Header é renderizado na pagina Done Recipes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');
    const title = await screen.findByTestId(PAGE_TITLE_ID);
    const profileIcon = screen.getByTestId(PROFILE_TOP_BTN_ID);
    const searchIcon = screen.queryByTestId(SEARCH_TOP_BTN_ID);
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('Done Recipes');
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
  });
  test('Testa se o Header é renderizado na pagina Favorite Recipes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
    const title = await screen.findByTestId(PAGE_TITLE_ID);
    const profileIcon = screen.getByTestId(PROFILE_TOP_BTN_ID);
    const searchIcon = screen.queryByTestId(SEARCH_TOP_BTN_ID);
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('Favorite Recipes');
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
  });
  test('Testa se o Header NÂO é renderizado na pagina inexistentes', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const title = screen.queryByTestId(PAGE_TITLE_ID);
    const profileIcon = screen.queryByTestId(PROFILE_TOP_BTN_ID);
    const searchIcon = screen.queryByTestId(SEARCH_TOP_BTN_ID);
    expect(title).not.toBeInTheDocument();
    expect(profileIcon).not.toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
  });
  test('Testa o input de pesquisa', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const title = await screen.findByTestId(PAGE_TITLE_ID);
    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN_ID);
    const searchInput = screen.queryByTestId(SEARCH_INPUT_ID);
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('Foods');
    expect(searchInput).not.toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();

    userEvent.click(searchIcon);

    expect(screen.getByTestId(SEARCH_INPUT_ID)).toBeInTheDocument();
    userEvent.type(screen.getByTestId(SEARCH_INPUT_ID), 'Eu sou um teste');
    expect(screen.getByTestId(SEARCH_INPUT_ID)).toHaveValue('Eu sou um teste');

    userEvent.click(searchIcon);

    expect(searchInput).not.toBeInTheDocument();
  });
});
