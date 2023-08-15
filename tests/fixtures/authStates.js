export const initialState = {
    status: 'checking',
    user: {},
    errorMessage: undefined
  }

  export const authenticatedState = {
    status: 'authenticated', //authenticated, not-authenticated, checking
    user: {
        uid: 'abc',
        name: 'Fernando'
    },
    errorMessage: undefined
  }

  export const notAuthenticatedState = {
    status: 'not-authenticated',
    user: {},
    errorMessage: undefined
  }