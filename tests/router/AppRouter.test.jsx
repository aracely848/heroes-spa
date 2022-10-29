import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

describe('Pruebas en el <AppRouter />', () => { 

    test('debe de mostrar el login si no está autenticado', () => { 

        const contextValue = {
            logged: false
        }

        render(
            <MemoryRouter initialEntries={['/dc']}>
                <AuthContext.Provider value={ contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect( screen.getAllByText('Login').length).toBe(2);

    });

    test('debe de mostar el component de Dc si está autenticado', () => { 
        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Michael Brown'
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={ contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        //screen.debug();
        expect( screen.getByText('DC Comics')).toBeTruthy();
        expect( screen.getAllByText('DC').length).toBeGreaterThanOrEqual(1);
    });
});