import { createHashRouter, RouterProvider } from "react-router-dom"
import { mainRoutes } from './router'

const router = createHashRouter([...mainRoutes]);

function RootRouter() {
  return <RouterProvider router={router} />
}
export default RootRouter

