import { useAuthContext } from './useAuthContext'
import { useEventContext } from './useEventsContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch:eventsDispatch } = useEventContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');

    // dispatch logout action
    dispatch({ type: 'LOGOUT' });
    eventsDispatch({ type: 'SET_EVENTS', payload:null });
  }

  return { logout };
}
