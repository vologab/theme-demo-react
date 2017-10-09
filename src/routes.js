import App from 'components/App';
import SignupContainer from 'containers/SignupContainer';
import LoginContainer from 'containers/LoginContainer';
import ProfileEditContainer from 'containers/ProfileEditContainer';
import PersonsListContainer from 'containers/PersonsListContainer';
import PersonContainer from 'containers/PersonContainer';
import PersonEditorContainer from 'containers/PersonEditorContainer';
import NotFound from 'components/NotFound';

export function requireAuth(store) {
  return (nextState, replace) => {
    const state = store.getState();
    if (!state.auth.sessionToken) {
      replace({
        pathname: '/login',
        query: {
          next: nextState.location.pathname
        }
      });
    }
  };
}


const createRoutes = (store) => {
  const routes = [
    {
      path: '/',
      component: App,
      indexRoute: {
        onEnter: (nextState, replace) => replace({
          pathname: 'persons'
        })
      },
      childRoutes: [
        {
          path: 'signup',
          component: SignupContainer
        },
        {
          path: 'login',
          component: LoginContainer
        },
        {
          path: 'persons',
          component: PersonsListContainer,
          onEnter: requireAuth(store)
        },
        {
          path: 'profile',
          component: ProfileEditContainer,
          onEnter: requireAuth(store)
        },
        {
          path: 'person/create',
          component: PersonEditorContainer,
          onEnter: requireAuth(store)
        },
        {
          path: 'person/:id',
          component: PersonContainer,
          onEnter: requireAuth(store)
        },
        {
          path: 'person/:id/edit',
          component: PersonEditorContainer,
          onEnter: requireAuth(store)
        },
        {
          path: '*',
          component: NotFound
        }
      ]
    }
  ];

  return routes;
};

export default createRoutes;
