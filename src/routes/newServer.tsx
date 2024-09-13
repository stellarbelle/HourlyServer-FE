import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import classNames from "classnames"
import { ApiClientContext, ServerType } from "../api"
import { ServerField, ServerSettingInput } from "../gql/sdk"

interface ServerFieldSettings extends ServerField {
  __typename: string;
  options?: [ServerSettingInput]
}

function NewServer() {
  const [serverTypes, setServerTypes] = useState<ServerType[]>([])
  const [selectedServer, setSelectedServer] = useState<ServerType>()
  const [serverName, setUpdatedServerName] = useState<string>()
  const [updatedServerFields, setUpdatedServerFields] = useState<{}>({})
  const [updatedResources, setUpdatedResources] = useState<{ memory?: number, cpu?: number }>({})
  const [playerCount, setPlayerCount] = useState<number>(2)
  const apiClient = useContext(ApiClientContext)
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const serverTypeRes = await apiClient.getServerTypes()
      setServerTypes(serverTypeRes);
    };
    fetchData()
  }, [apiClient]);

  const navigate = useNavigate();

  const createServer = async () => {
    if (selectedServer == null) {
      throw Error("must select a server")
    }
    const name = serverName || selectedServer.name
    const cpu = updatedResources.cpu || selectedServer?.resourcesPerPlayer.cpu
    const memory = updatedResources.memory || selectedServer?.resourcesPerPlayer.memory
    const updatedFields = Object.values(updatedServerFields) as ServerFieldSettings[]
    // eslint-disable-next-line max-len
    await apiClient.createServer(name, (selectedServer as ServerType).name, cpu, memory, updatedFields)

    navigate("/", { replace: true })
  }

  const updateServerResources = (value: number) => {
    setPlayerCount(value)
    const cpu = value * (selectedServer?.resourcesPerPlayer.cpu || 0.5)
    const memory = value * (selectedServer?.resourcesPerPlayer.memory || 1)

    const updatedPlayerResources = { cpu, memory }
    setUpdatedResources(updatedPlayerResources)
  }

  const handleUpdatedServerFields = ({ serverSettingKey, value }: ServerSettingInput) => {
    // eslint-disable-next-line max-len
    const updatedFields = { ...updatedServerFields, [serverSettingKey]: { serverSettingKey, value } }
    setUpdatedServerFields(updatedFields)
  }

  const handleToggle = () => {
    if (showPassword) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }

  const renderFormInputs = (field: ServerFieldSettings) => {
    const type = field.__typename
    if (type === "SelectionServerField") {
      return (
        <select
          key={field.serverSettingKey}
          // eslint-disable-next-line max-len
          onChange={(e) => handleUpdatedServerFields({ serverSettingKey: field.serverSettingKey, value: e.target.value })}
          name={field.label}
          id={field.serverSettingKey}
        >
          {
            field.options?.map(
              (option) => <option key={`${option.serverSettingKey}`} value={option.value as string}>{option.value}</option>,
            )
          }
        </select>
      )
    } if (type === "PasswordServerField") {
      return (
        <div key={field.serverSettingKey} className="password-wrapper">
          <input className="pass-input" type={showPassword ? "text" : "password"} name="pass" onChange={(e) => handleUpdatedServerFields({ serverSettingKey: field.serverSettingKey, value: e.target.value })} />
          <button type="button" className="show-icon" onClick={handleToggle}>
            Show
          </button>
        </div>
      )
    }
    return <input key={field.serverSettingKey} defaultValue={(field.default) as string} type="text" name="name" onChange={(e) => handleUpdatedServerFields({ serverSettingKey: field.serverSettingKey, value: e.target.value })} />
  }

  return (
    <div>
      <h1>Create server</h1>
      <form
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          createServer()
        }}
      >
        <h2>Select game</h2>
        <div className="type-list">
          {
            serverTypes?.map((type, i) => {
              const isLast = i === serverTypes.length - 1 ? "last" : ""
              const isFirst = i === 0 ? "first" : isLast
              const selected = type.name === selectedServer?.name ? "selected" : ""
              return (
                <button
                  key={type.name}
                  className={classNames("server-type", selected, isFirst)}
                  type="button"
                  value={type.name}
                  onClick={() => {
                    setSelectedServer(type)
                  }}
                >
                  {type.name}
                </button>
              )
            })
          }
        </div>
        {selectedServer
          ? (
            <div className="form-wrapper">
              <div key={selectedServer.serverTypeID} className="box">
                <h2>{`${selectedServer.name} settings`}</h2>
                {selectedServer.fields.map((field) => (
                  <>
                    <h3>{field.label}</h3>
                    <label>{field.description}</label>
                    {renderFormInputs(field as ServerFieldSettings)}
                  </>
                ))}
              </div>
              <hr />
              <div className="box">
                <h2>Server settings</h2>
                <label>Server name</label>
                <input type="text" name="name" onChange={(e) => setUpdatedServerName(e.target.value)} />
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

export default NewServer
