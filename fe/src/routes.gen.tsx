// Generouted, changes to this file will be overriden
import { Fragment } from 'react'
import { lazy, Outlet, ReactRouter, RootRoute, Route, RouterProvider } from '@tanstack/react-router'

import App from './pages/_app'

const root = new RootRoute({ component: App || Outlet })
const _404 = new Route({ getParentRoute: () => root, path: '*', component:  Fragment })
const console = new Route({ getParentRoute: () => root, path: 'console', component: lazy(() => import('./pages/console')) })
const index = new Route({ getParentRoute: () => root, path: '/', component: lazy(() => import('./pages/index')) })





const config = root.addChildren([
  console,index,
  _404,
])

const router = new ReactRouter({ routeTree: config })
export const Routes = () => <RouterProvider router={router} />

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}



