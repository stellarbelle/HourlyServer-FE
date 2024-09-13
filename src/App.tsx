import "./App.css"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import CreateUser from "./routes/createUser"
import UserLogin from "./routes/userLogin"
import Servers from "./routes/servers"
import NewServer from "./routes/newServer"
import EditServer from "./routes/editServer"
import { ApiClientContext, ApiClient } from "./api"

export const routes = [
  {
    path: "/createUser",
    element: <CreateUser />,
  },
  {
    path: "/login",
    element: <UserLogin />,
  },
  {
    path: "/",
    element: <Servers />,
  },
  {
    path: "/createServer",
    element: <NewServer />,
  },
  {
    path: "/edit",
    element: <EditServer />,
  },
];

const router = createBrowserRouter(routes);

let apiClient: ApiClient | null = null
let promise: any

const fetchConfig = () => {
  if (apiClient === null) {
    if (process.env.REACT_APP_API_URL) {
      apiClient = new ApiClient(process.env.REACT_APP_API_URL)
      return
    }

    if (!promise) {
      // eslint-disable-next-line no-async-promise-executor
      promise = new Promise(async (resolve) => {
        const res = await fetch("/settings.json")
        const data = await res.json()

        apiClient = new ApiClient(data.apiUrl)
        resolve(data)
      })

      throw promise
    }
  }
}

function App() {
  fetchConfig()

  return (
    <ApiClientContext.Provider value={apiClient!}>
      <div className="App">
        <div className="wrapper">
          <div className="app-header">
            <div className="logo">
              <span>Hourly</span>
              Server
            </div>
          </div>
          <div className="content">
            <RouterProvider router={router} />
          </div>
        </div>
      </div>
    </ApiClientContext.Provider>
  )
}

export default App
