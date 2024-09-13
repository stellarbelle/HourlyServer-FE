import { useContext, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { ApiClientContext, ServerType, Server } from "../api"
import { ServerField, ServerSettingInput } from "../gql/sdk"

interface ServerFieldSettings extends ServerField {
  __typename: string;
  options: [ServerSettingInput]
}

function EditServer() {
  const [selectedServer, setSelectedServer] = useState<Server>()
  const [selectedServerType, setSelectedServerType] = useState<ServerType>()
  const [serverName, setUpdatedServerName] = useState<string>()
  // eslint-disable-next-line max-len
  const [updatedServerFields, setUpdatedServerFields] = useState<{ [key: string]: ServerSettingInput }>({})
  const [updatedResources, setUpdatedResources] = useState<{ memory?: number, cpu?: number }>({})
  const [playerCount, setPlayerCount] = useState<number>(selectedServer?.memory || 2)
  const apiClient = useContext(ApiClientContext)
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const serverId = urlParams.get("serverId");

  const handleUpdateServerFields = ({ serverSettingKey, value }: ServerSettingInput) => {
    // eslint-disable-next-line max-len
    setUpdatedServerFields({ ...updatedServerFields, [serverSettingKey]: { serverSettingKey, value } })
  }

  useEffect(() => {
    const fetchServerTypes = async (serverType: string) => {
      const serverTypeRes = await apiClient.getServerTypes()
      serverTypeRes.forEach((type) => {
        if (type.serverTypeID === serverType) {
          setSelectedServerType(type)
        }
      })
    };

    const fetchServerData = async () => {
      const { servers } = await apiClient.getUser()
      let settings = {}
      servers.forEach((server) => {
        if (server.serverID === serverId) {
          setSelectedServer(server);
          fetchServerTypes(server.serverTypeID)
          server.settings.forEach(({ serverSettingKey, value }: ServerSettingInput) => {
            settings = { ...settings, [serverSettingKey]: { serverSettingKey, value } }
          })
        }
      })
      setUpdatedServerFields({ ...updatedServerFields, ...settings })
    };

    if (serverId) { fetchServerData() }
  }, [apiClient]);

  const updateServer = async () => {
    if (selectedServer == null) {
      throw Error("must select a server")
    }
    const name = serverName || selectedServerType?.name
    const cpu = updatedResources.cpu || selectedServerType?.resourcesPerPlayer.cpu
    const memory = updatedResources.memory || selectedServerType?.resourcesPerPlayer.memory
    const updatedFields = Object.values(updatedServerFields) as ServerFieldSettings[]
    // eslint-disable-next-line max-len
    await apiClient.updateServer(name as string, serverId as string, cpu as number, memory as number, updatedFields)

    navigate("/", { replace: true })
  }

  const updateServerResources = (value: number) => {
    setPlayerCount(value)
    const cpu = value * (selectedServerType?.resourcesPerPlayer.cpu || 0.5)
    const memory = value * (selectedServerType?.resourcesPerPlayer.memory || 1)

    const updatedPlayerResources = { cpu, memory }
    setUpdatedResources(updatedPlayerResources)
  }

  const handleToggle = () => {
    if (showPassword) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }

  const renderServerFormInputs = (field: ServerFieldSettings) => {
    const defaultVal = updatedServerFields[field.serverSettingKey]?.value || field.default
    const type = field.__typename
    if (type === "SelectionServerField") {
      return (
        <select
          defaultValue={defaultVal as string}
          // eslint-disable-next-line max-len
          onChange={(e) => handleUpdateServerFields({ serverSettingKey: field.serverSettingKey, value: e.target.value })}
          name={field.label}
          id={field.serverSettingKey}
        >
          {
            field.options?.map(
              (option) => <option value={option.value as string}>{option.value}</option>,
            )
          }
        </select>
      )
    } if (type === "PasswordServerField") {
      return (
        <div className="password-wrapper">
          <input defaultValue={defaultVal as string} className="pass-input" type={showPassword ? "text" : "password"} name="pass" onChange={(e) => handleUpdateServerFields({ serverSettingKey: field.serverSettingKey, value: e.target.value })} />
          <button type="button" className="show-icon" onClick={handleToggle}>
            Show
          </button>
        </div>
      )
    }
    return <input defaultValue={defaultVal as string} type="text" name="name" onChange={(e) => handleUpdateServerFields({ serverSettingKey: field.serverSettingKey, value: e.target.value })} />
  }
  return (
    <div>
      <Link className="back-link" to="/">
        <div>
          <span>{`${"< "}`}</span>
          Back
        </div>
      </Link>
      <h1>Edit server</h1>
      <form
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          updateServer()
        }}
      >
        {selectedServerType
          ? (
            <div className="form-wrapper">
              <div key={selectedServerType.serverTypeID} className="box">
                <h2>{`${selectedServerType.name} settings`}</h2>
                {selectedServerType.fields.map((field) => (
                  <>
                    <h3>{field.label}</h3>
                    <label>{field.description}</label>
                    {renderServerFormInputs(field as ServerFieldSettings)}
                  </>
                ))}
              </div>
              <hr />
              <div className="box">
                <h2>Server settings</h2>
                <label>Server name</label>
                <input type="text" name="name" defaultValue={selectedServer?.name} onChange={(e) => setUpdatedServerName(e.target.value)} />
                <label>Player count:</label>
                <input type="number" onChange={(e) => updateServerResources(parseInt(e.target.value, 10))} id="players" name="players" min="1" value={playerCount} />
              </div>
              <input className="submit-button" disabled={!selectedServer} type="submit" value="Next" />
            </div>
          ) : <div />}
      </form>
    </div>
  )
}

export default EditServer
