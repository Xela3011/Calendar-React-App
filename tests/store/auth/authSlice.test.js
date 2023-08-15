import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState } from "../../fixtures/authStates"
import { testUserCredentials } from "../../fixtures/testUser";

describe('Pruebas en authslice', () => { 
    
    test('debe de regresar el estado inicial', () => { 
        expect(authSlice.getInitialState()).toEqual( initialState);
     })

     test('debe de realizar un login', () => { 
        const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
        expect(state).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        })
      })

      test('debe de realizar un logout', () => {
        const state = authSlice.reducer(initialState, onLogout());
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        })
      });

      test('debe de realizar un logout', () => {
        const errorMessage = 'Credenciales incorrectas';
        const state = authSlice.reducer(initialState, onLogout(errorMessage));
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage
        })
      });

      test('debe de limpiar el mensaje de error', () => { 
        const errorMessage = 'Credenciales incorrectas';
        const state = authSlice.reducer(initialState, onLogout(errorMessage));
        const newState = authSlice.reducer(state, clearErrorMessage());

        expect(newState.errorMessage).toBe(undefined);
        
       })
 })