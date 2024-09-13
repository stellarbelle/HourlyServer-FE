import { gql } from "graphql-request"
import { createContext } from "react"
import { createClient, Client } from "graphql-ws";
import {
  Server,
  ServerStatus,
  ServerType,
  User,
  ServerSettingInput,
  UserWithToken,
} from "./gql/sdk"

export type { Server, ServerType }
export { ServerStatus }

export class ApiClient {
  apiUrl: string

  wsClient: Client

  token: string

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl
    this.token = ""
    const url = `${apiUrl}/graphql`
    const wsClientUrl = url.replace("https", "ws")
    const getWsClient = (wsUrl: string) => createClient({
      url: wsUrl,
      connectionParams: async () => {
        const { token } = this;
        return {
          Authorization: `Bearer ${token}`,
        };
      },
    });

    this.wsClient = getWsClient(wsClientUrl)
  }

  // eslint-disable-next-line max-len
  private async execute(query: string, variables: any, requiredAuthentication: boolean): Promise<any> {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    if (this.token.length) {
      requestHeaders.set("Authorization", `Bearer ${this.token}`);
    }
    const opts = {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({ query, variables }),
    }
    if (requiredAuthentication) {
      if (this.token === "") {
        throw new Error("this requires authentication")
      }
    }
    const response = await fetch(`${this.apiUrl}/graphql`, opts)
    if (response.status !== 200) {
      throw new Error(await response.text())
    }
    const json: any = await response.json()
    if (json.errors) {
      throw new Error(JSON.stringify(json.errors))
    }
    return json.data
  }

  async login(emailAddress: string, password: string): Promise<UserWithToken> {
    const response = await this.execute(
      gql`
      mutation($emailAddress: String!, $password: String!) {
          login(emailAddress: $emailAddress, password: $password) {
              authToken
              servers {
                  serverID
                  serverType {
                    name
                    serverTypeID
                    fields {
                      default
                      description
                      label
                      serverSettingKey
                    }
                  }
                  status
                  memory
                  cpu
                  suspend
                  ipAddress
                  settings {
                      serverSettingKey
                      value
                  }
                  ports {
                      protocol
                      port
                  }
              }
          }
      }`,
      {
        emailAddress,
        password,
      },
      false,
    )
    this.token = response.login.authToken
    return response.login as UserWithToken
  }

  async createUser(emailAddress: string, password: string): Promise<UserWithToken> {
    const response = await this.execute(
      gql`mutation($emailAddress: String!, $password: String!) {
            createUser(emailAddress: $emailAddress, password: $password) {
                authToken
                userID
                servers {
                    serverID
                    name
                    serverType {
                      name
                      serverTypeID
                      fields {
                        default
                        description
                        label
                        serverSettingKey
                      }
                    }
                    status
                    memory
                    cpu
                    suspend
                    ipAddress
                    settings {
                      serverSettingKey
                        value
                    }
                    ports {
                        protocol
                        port
                    }
                }
            }
        }`,
      {
        emailAddress,
        password,
      },
      false,
    )
    this.token = response.createUser.authToken
    return response.createUser as UserWithToken
  }

  async getUser(): Promise<User> {
    const response = await this.execute(
      gql`query {
            user {
                userID
                servers {
                    serverID
                    serverType {
                      name
                      serverTypeID
                      fields {
                        default
                        description
                        label
                        serverSettingKey
                      }
                    }
                    status
                    memory
                    cpu
                    suspend
                    ipAddress
                    settings {
                      serverSettingKey
                        value
                    }
                    ports {
                        protocol
                        port
                    }
                }
            }
        }`,
      {},
      true,
    )
    this.serversSubscribe()
    return response.user as User
  }

  async getServerTypes(): Promise<ServerType[]> {
    const response = await this.execute(
      gql`query {
            serverTypes {
              nodes {
                name
                serverTypeID
                fields {
                  default
                  description
                  label
                  serverSettingKey
                }
              }
            }
        }`,
      {},
      false,
    )
    return response.serverTypes.nodes as ServerType[]
  }

  async serverSubscribe(serverId: string): Promise<Server> {
    const response = await this.execute(
      gql`subscription server($serverId: String!) {
      server(serverID: $serverId) {
          serverID
          name
          status
          serverTypeID
          memory
          cpu
          suspend
          ipAddress
          needsRestart
          dateCreated
          dateLastUpdated
          dateLastStopped
          dateLastStarted
          settings {
              serverSettingKey
              value
          }
          ports {
              protocol
              port
          }
      }
    }`,
      {
        serverId,
      },
      true,
    )
    return response.server as Server
  }

  async serversSubscribe(): Promise<Server[]> {
    const sink = {
      next: (data: any) => data,
      error: (error: unknown) => { throw error },
      complete: () => this.wsClient.subscribe,
    }
    const query = gql`
      subscription servers {
        servers {
          serverID
          name
          serverType {
            name
            serverTypeID
            fields {
              default
              description
              label
              serverSettingKey
            }
          }
          status
          memory
          cpu
          suspend
          ipAddress
          needsRestart
          dateCreated
          dateLastUpdated
          dateLastStopped
          dateLastStarted
          settings {
            serverSettingKey
            value
          }
          ports {
            protocol
            port
          }
        }
      }
    `
    this.wsClient.subscribe({ query }, sink)
    const response = await this.execute(
      gql`subscription servers {
      servers {
          serverID
          name
          status
          serverTypeID
          memory
          cpu
          suspend
          ipAddress
          needsRestart
          dateCreated
          dateLastUpdated
          dateLastStopped
          dateLastStarted
          settings {
              serverSettingKey
              value
          }
          ports {
              protocol
              port
          }
      }
    }`,
      {},
      true,
    )
    return response.servers as Server[]
  }

  // eslint-disable-next-line max-len
  async createServer(name: string, serverTypeId: string, cpu: number, memory: number, settings: ServerSettingInput[]):
  Promise<Server> {
    const response = await this.execute(
      gql`mutation($name: String!, $serverTypeId: String!, $cpu: Float!, $memory: Float!) {
      createServer(name: $name, serverTypeId: $serverTypeId, cpu: $cpu, memory: $memory) {
          name
          serverID
          serverType {
            name
            serverTypeID
            fields {
              default
              description
              label
              serverSettingKey
            }
          }
          status
      }
  }`,
      {
        name,
        serverTypeId,
        cpu,
        memory,
        settings,
      },
      true,
    )
    return response.serverType as Server
  }

  // eslint-disable-next-line max-len
  async updateServer(name: string, serverId: string, cpu: number, memory: number, settings: ServerSettingInput[]):
  Promise<Server> {
    const response = await this.execute(
      gql`mutation updateServer($name: String!, $serverId: String!, $cpu: Float!, $memory: Float!, $settings: [ServerSettingInput!]) {
      updateServer(name: $name, serverId: $serverId, cpu: $cpu, memory: $memory, settings: $settings) {
          name
          serverID
          status
          cpu
          memory
          serverTypeID
          ports {
              port
              protocol
          }
          settings {
              serverSettingKey
              value
          }
          suspend
      }
  }`,
      {
        name,
        serverId,
        cpu,
        memory,
        settings,
      },
      true,
    )

    return response.updateServer as Server
  }

  async startServer(serverId: string): Promise<Server> {
    const response = await this.execute(
      gql`mutation($serverId: String!) {
            startServer(serverId: $serverId) {
                serverID
                status
            }
        }`,
      {
        serverId,
      },
      true,
    )
    return response.startServer
  }

  async stopServer(serverId: string): Promise<Server> {
    const response = await this.execute(
      gql`mutation($serverId: String!) {
      stopServer(serverId: $serverId) {
          serverID
          status
      }
  }`,
      {
        serverId,
      },
      true,
    )
    return response.stopServer
  }

  async deleteServer(serverId: string): Promise<{
    serverTypeId: string,
  }> {
    const response = await this.execute(
      gql`mutation deleteServer($serverId: String!) {
      deleteServer(serverId: $serverId) {
          serverID
      }
  }`,
      {
        serverId,
      },
      true,
    )
    return response.serverId
  }
}

export const ApiClientContext = createContext<ApiClient>(new ApiClient(""))
// export default ApiClientContext
