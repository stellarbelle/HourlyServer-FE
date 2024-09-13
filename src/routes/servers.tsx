import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ApiClientContext, Server, ServerStatus } from "../api"

function Servers() {
  const [currentServers, setCurrentServers] = useState<Server[]>([])
  const apiClient = useContext(ApiClientContext)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { servers } = await apiClient.getUser()
        apiClient.serversSubscribe()
        setCurrentServers(servers);
      } catch (err) {
        navigate("/createUser", { replace: true })
      }
    };
    fetchData()
  }, [apiClient]);

  const startServer = async ({ serverID }: Server) => {
    const startedServer = await apiClient.startServer(serverID)
    const serverIndex = currentServers.findIndex((obj) => obj.serverID === serverID);
    currentServers[serverIndex].status = startedServer.status
  }

  const stopServer = async ({ serverID }: Server) => {
    const stoppedServer = await apiClient.stopServer(serverID)
    const serverIndex = currentServers.findIndex((obj) => obj.serverID === serverID);
    currentServers[serverIndex].status = stoppedServer.status
  }
  const handleDropdownSelect = async (value: string) => {
    const arr = value.split(",")
    if (arr[0] === "delete") {
      const deletedServer = await apiClient.deleteServer(arr[1])
      const serverId = deletedServer.serverTypeId
      const updatedServers = currentServers.filter((obj) => obj.serverID !== serverId);
      setCurrentServers(updatedServers)
    } else {
      navigate(arr[1], { replace: true })
    }
  }

  const handleServerStatus = (server: Server) => {
    const { status } = server
    if (status === ServerStatus.Stopped) {
      return <button type="button" className="server-action started" onClick={() => startServer(server)}>Start server</button>
    }
    if (status === ServerStatus.Running) {
      return <button type="button" className="server-action stopped" onClick={() => stopServer(server)}>Stop server</button>
    }
    return <div className="server-action">{status}</div>
  }
  return (
    <>
      <div className="servers-header">
        <div className="servers-title">
          <h2>Current Servers</h2>
          <button
            type="button"
            className="create-server-button"
            onClick={() => navigate("/createServer", { replace: true })}
          >
            + New Server
          </button>
        </div>
      </div>
      <table className="server-table">
        <thead>
          <tr>
            <th>TITLE</th>
            <th>STATUS</th>
            <th>GAME</th>
            <th>PLAYER COUNT</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {
          currentServers?.map((server) => {
            const status = (server.status).toLowerCase()
            return (
              <tr key={server.serverID}>
                <td className="server-name">{server.name}</td>
                <td className={`server-status-${(server.status).toLowerCase()}`}>
                  <div className="server-status"><span>{status}</span></div>
                  {server.status === "RUNNING" ? (
                    <div className="server-ip">
                      IP:
                      {server.ipAddress}
                    </div>
                  ) : null}
                </td>
                <td>{server.serverType.name}</td>
                <td>{server.cpu * 2}</td>
                <td>
                  <div>
                    {handleServerStatus(server)}
                    <div className="server-menu">
                      <select name="more" onChange={(e) => handleDropdownSelect(e.target.value)}>
                        <option selected disabled hidden>More</option>
                        <option value={["edit", `/edit?serverId=${server.serverID}`]}>Edit server</option>
                        <option value={["delete", `${server.serverID}`]}>Delete server</option>
                      </select>
                    </div>
                  </div>
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </>
  )
}

export default Servers
