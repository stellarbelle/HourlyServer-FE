import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date with time (isoformat) */
  DateTime: { input: any; output: any; }
};

/** Mutations that can be executed. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new server. */
  createServer: Server;
  /** Create a new user. */
  createUser: UserWithToken;
  /** Delete a server. */
  deleteServer: Server;
  /** Login */
  login: UserWithToken;
  /** Start a server */
  startServer: Server;
  /** Stop a server */
  stopServer: Server;
  /** Update a server */
  updateServer: Server;
};


/** Mutations that can be executed. */
export type MutationCreateServerArgs = {
  cpu: Scalars['Float']['input'];
  memory: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  serverTypeId: Scalars['String']['input'];
  settings?: InputMaybe<Array<ServerSettingInput>>;
  suspend?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Mutations that can be executed. */
export type MutationCreateUserArgs = {
  emailAddress: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


/** Mutations that can be executed. */
export type MutationDeleteServerArgs = {
  serverId: Scalars['String']['input'];
};


/** Mutations that can be executed. */
export type MutationLoginArgs = {
  emailAddress: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


/** Mutations that can be executed. */
export type MutationStartServerArgs = {
  serverId: Scalars['String']['input'];
};


/** Mutations that can be executed. */
export type MutationStopServerArgs = {
  serverId: Scalars['String']['input'];
};


/** Mutations that can be executed. */
export type MutationUpdateServerArgs = {
  cpu?: InputMaybe<Scalars['Float']['input']>;
  memory?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  serverId: Scalars['String']['input'];
  settings?: InputMaybe<Array<ServerSettingInput>>;
  suspend?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Pagination info, relay style */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Cursor to pass when requesting the next page */
  endCursor: Scalars['String']['output'];
  /** True if there is another page of results, false otherwise */
  hasNextPage: Scalars['Boolean']['output'];
  /** True if there is a previous page, false otherwise. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** Cursor defined by the beginning of this result set. */
  startCursor: Scalars['String']['output'];
};

/** A password field */
export type PasswordServerField = ServerField & {
  __typename?: 'PasswordServerField';
  /** The setting's default value, if any. */
  default?: Maybe<Scalars['String']['output']>;
  /** The setting's description. */
  description?: Maybe<Scalars['String']['output']>;
  /** The setting's label. */
  label: Scalars['String']['output'];
  /** The setting's key. Used to set and retrieve the setting */
  serverSettingKey: Scalars['String']['output'];
};

/** Query for objects */
export type Query = {
  __typename?: 'Query';
  /** The list of server types that can be hosted. */
  serverTypes: ServerTypeConnection;
  /** Information on the logged in user. */
  user: User;
};


/** Query for objects */
export type QueryServerTypesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The amount of resources required per player. */
export type ResourcesPerPlayer = {
  __typename?: 'ResourcesPerPlayer';
  /** The amount of CPU cores required per player. */
  cpu: Scalars['Float']['output'];
  /** The amount of RAM (in GB) required per player. */
  memory: Scalars['Float']['output'];
};

/** An option for a setting that could be selected. */
export type SelectionOption = {
  __typename?: 'SelectionOption';
  /** The label of the option. */
  label: Scalars['String']['output'];
  /** The value to use for the setting. */
  value: Scalars['String']['output'];
};

/** A server setting that requires a selection */
export type SelectionServerField = ServerField & {
  __typename?: 'SelectionServerField';
  /** The setting's default value, if any. */
  default?: Maybe<Scalars['String']['output']>;
  /** The setting's description. */
  description?: Maybe<Scalars['String']['output']>;
  /** The setting's label. */
  label: Scalars['String']['output'];
  /** The list of options that the user can choose from. */
  options: Array<SelectionOption>;
  /** The server setting key */
  serverSettingKey: Scalars['String']['output'];
};

/** A provisioned server */
export type Server = {
  __typename?: 'Server';
  /** Number of CPU cores to reserve. */
  cpu: Scalars['Float']['output'];
  /** The date the serverw as created */
  dateCreated: Scalars['DateTime']['output'];
  /** The date the server was last started */
  dateLastStarted?: Maybe<Scalars['DateTime']['output']>;
  /** The date the server was last stopped */
  dateLastStopped?: Maybe<Scalars['DateTime']['output']>;
  /** The date the server's configuration was last updated */
  dateLastUpdated?: Maybe<Scalars['DateTime']['output']>;
  /** The server's IP address, for connections */
  ipAddress?: Maybe<Scalars['String']['output']>;
  /** Amount of memory, in GBs */
  memory: Scalars['Float']['output'];
  /** The server's name */
  name: Scalars['String']['output'];
  /** True if a server's configuration has changed since the last time it was started. */
  needsRestart: Scalars['Boolean']['output'];
  /** List of exposed server ports */
  ports: Array<ServerPort>;
  /** The ID of the server */
  serverID: Scalars['String']['output'];
  /** The type of the server */
  serverType: ServerType;
  /** The ID of the type of the server */
  serverTypeID: Scalars['String']['output'];
  /** The server's settings */
  settings: Array<ServerSettingOutput>;
  /** The status of a server. */
  status: ServerStatus;
  /** True to pause a server, false otherwise. */
  suspend: Scalars['Boolean']['output'];
};

/** Information on a server field */
export type ServerField = {
  /** The default value used, if not configured by a user. */
  default?: Maybe<Scalars['String']['output']>;
  /** The description of a server field */
  description?: Maybe<Scalars['String']['output']>;
  /** The label that identifies a server field. */
  label: Scalars['String']['output'];
  /** The key that identifies a server field. */
  serverSettingKey: Scalars['String']['output'];
};

/** Information regarding a server's port */
export type ServerPort = {
  __typename?: 'ServerPort';
  /** The port number */
  port: Scalars['Int']['output'];
  /** Protocol of a port (TCP or UDP) */
  protocol: Scalars['String']['output'];
};

/** A server setting */
export type ServerSettingInput = {
  /** The key of a server setting. */
  serverSettingKey: Scalars['String']['input'];
  /** The value of a server setting. */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** A server setting */
export type ServerSettingOutput = {
  __typename?: 'ServerSettingOutput';
  /** Key of a server setting */
  serverSettingKey: Scalars['String']['output'];
  /** The value of a server setting */
  value: Scalars['String']['output'];
};

/** THe status of a server. */
export enum ServerStatus {
  /** The server will be starting soon. */
  Pending = 'PENDING',
  /** The server has been started successfully. */
  Running = 'RUNNING',
  /** The server is starting. */
  Starting = 'STARTING',
  /** The server is stopped */
  Stopped = 'STOPPED',
  /** The server is in the process of stopping. */
  Stopping = 'STOPPING'
}

/** Represents a type of server that can be ran for a user. */
export type ServerType = {
  __typename?: 'ServerType';
  /** The list of fields that can be configured for this server type. */
  fields: Array<ServerField>;
  /** Human readable string that represents the server. */
  name: Scalars['String']['output'];
  /** Mulitiplier to use when determining resources per player */
  resourcesPerPlayer: ResourcesPerPlayer;
  /** The ID of the server type. */
  serverTypeID: Scalars['String']['output'];
};

/** Response for server types */
export type ServerTypeConnection = {
  __typename?: 'ServerTypeConnection';
  /** The list of server edges. */
  edges: Array<ServerTypeEdge>;
  /** The list of server types */
  nodes: Array<ServerType>;
  /** Pagination information */
  pageInfo: PageInfo;
};

/** The edge of a server type connection */
export type ServerTypeEdge = {
  __typename?: 'ServerTypeEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The server type that represents the edge */
  serverType: ServerType;
};

/** Events that can be received. */
export type Subscription = {
  __typename?: 'Subscription';
  /** Receive events when a server's state changes. */
  server: Server;
  /** Receive events when any server changes its state. */
  servers: Server;
};


/** Events that can be received. */
export type SubscriptionServerArgs = {
  serverID: Scalars['String']['input'];
};

/** A server field that accepts a text value. */
export type TextServerField = ServerField & {
  __typename?: 'TextServerField';
  /** The setting's default value, if any. */
  default?: Maybe<Scalars['String']['output']>;
  /** The setting's description. */
  description?: Maybe<Scalars['String']['output']>;
  /** The setting's format. */
  format?: Maybe<Scalars['String']['output']>;
  /** The setting's label. */
  label: Scalars['String']['output'];
  /** The setting's key. Used to set and retrieve the setting */
  serverSettingKey: Scalars['String']['output'];
};

/** An hourlyservers user. */
export type User = {
  __typename?: 'User';
  /** The user's email address */
  emailAddress: Scalars['String']['output'];
  /** The user's servers */
  servers: Array<Server>;
  /** The user's ID */
  userID: Scalars['String']['output'];
};

/** A user with its authentication token. */
export type UserWithToken = {
  __typename?: 'UserWithToken';
  /** The user's authentication token */
  authToken: Scalars['String']['output'];
  /** The user's email address */
  emailAddress: Scalars['String']['output'];
  /** The user's servers */
  servers: Array<Server>;
  /** The user's ID */
  userID: Scalars['String']['output'];
};

export type CreateServerMutationVariables = Exact<{
  name: Scalars['String']['input'];
  serverTypeId: Scalars['String']['input'];
  cpu: Scalars['Float']['input'];
  memory: Scalars['Float']['input'];
  settings?: InputMaybe<Array<ServerSettingInput> | ServerSettingInput>;
}>;


export type CreateServerMutation = { __typename?: 'Mutation', createServer: { __typename?: 'Server', name: string, serverID: string, status: ServerStatus, cpu: number, memory: number, serverTypeID: string, suspend: boolean, ports: Array<{ __typename?: 'ServerPort', port: number, protocol: string }>, settings: Array<{ __typename?: 'ServerSettingOutput', value: string }> } };

export type CreateUserMutationVariables = Exact<{
  emailAddress: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename: 'UserWithToken', authToken: string, userID: string, servers: Array<{ __typename?: 'Server', serverID: string, name: string, status: ServerStatus, serverTypeID: string, memory: number, cpu: number, suspend: boolean, ipAddress?: string | null, needsRestart: boolean, dateCreated: any, dateLastUpdated?: any | null, dateLastStopped?: any | null, dateLastStarted?: any | null, settings: Array<{ __typename?: 'ServerSettingOutput', serverSettingKey: string, value: string }> }> } };

export type DeleteServerMutationVariables = Exact<{
  serverId: Scalars['String']['input'];
}>;


export type DeleteServerMutation = { __typename?: 'Mutation', deleteServer: { __typename?: 'Server', serverID: string } };

export type GetServerTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetServerTypesQuery = { __typename?: 'Query', serverTypes: { __typename?: 'ServerTypeConnection', nodes: Array<{ __typename: 'ServerType', name: string, serverTypeID: string, fields: Array<{ __typename: 'PasswordServerField', serverSettingKey: string, label: string, description?: string | null, default?: string | null } | { __typename: 'SelectionServerField', serverSettingKey: string, label: string, description?: string | null, default?: string | null, options: Array<{ __typename?: 'SelectionOption', value: string }> } | { __typename: 'TextServerField', serverSettingKey: string, label: string, description?: string | null, default?: string | null }>, resourcesPerPlayer: { __typename?: 'ResourcesPerPlayer', cpu: number, memory: number } }> } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', userID: string, emailAddress: string, servers: Array<{ __typename?: 'Server', serverID: string, name: string, status: ServerStatus, serverTypeID: string, memory: number, cpu: number, suspend: boolean, ipAddress?: string | null, needsRestart: boolean, dateCreated: any, dateLastUpdated?: any | null, dateLastStopped?: any | null, dateLastStarted?: any | null, settings: Array<{ __typename?: 'ServerSettingOutput', serverSettingKey: string, value: string }>, ports: Array<{ __typename?: 'ServerPort', protocol: string, port: number }> }> } };

export type LoginMutationVariables = Exact<{
  emailAddress: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename: 'UserWithToken', authToken: string, userID: string, servers: Array<{ __typename?: 'Server', serverID: string, name: string, status: ServerStatus, serverTypeID: string, memory: number, cpu: number, suspend: boolean, ipAddress?: string | null, needsRestart: boolean, dateCreated: any, dateLastUpdated?: any | null, dateLastStopped?: any | null, dateLastStarted?: any | null, settings: Array<{ __typename?: 'ServerSettingOutput', serverSettingKey: string, value: string }>, ports: Array<{ __typename?: 'ServerPort', protocol: string, port: number }> }> } };

export type ServerSubscriptionVariables = Exact<{
  serverId: Scalars['String']['input'];
}>;


export type ServerSubscription = { __typename?: 'Subscription', server: { __typename?: 'Server', serverID: string, name: string, status: ServerStatus, serverTypeID: string, memory: number, cpu: number, suspend: boolean, ipAddress?: string | null, needsRestart: boolean, dateCreated: any, dateLastUpdated?: any | null, dateLastStopped?: any | null, dateLastStarted?: any | null, settings: Array<{ __typename?: 'ServerSettingOutput', serverSettingKey: string, value: string }>, ports: Array<{ __typename?: 'ServerPort', protocol: string, port: number }> } };

export type ServersSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ServersSubscription = { __typename?: 'Subscription', servers: { __typename?: 'Server', serverID: string, name: string, status: ServerStatus, serverTypeID: string, memory: number, cpu: number, suspend: boolean, ipAddress?: string | null, needsRestart: boolean, dateCreated: any, dateLastUpdated?: any | null, dateLastStopped?: any | null, dateLastStarted?: any | null, settings: Array<{ __typename?: 'ServerSettingOutput', serverSettingKey: string, value: string }>, ports: Array<{ __typename?: 'ServerPort', protocol: string, port: number }> } };

export type StartServerMutationVariables = Exact<{
  serverId: Scalars['String']['input'];
}>;


export type StartServerMutation = { __typename?: 'Mutation', startServer: { __typename?: 'Server', serverID: string, status: ServerStatus } };

export type StopServerMutationVariables = Exact<{
  serverId: Scalars['String']['input'];
}>;


export type StopServerMutation = { __typename?: 'Mutation', stopServer: { __typename?: 'Server', serverID: string, status: ServerStatus } };

export type UpdateServerMutationVariables = Exact<{
  name: Scalars['String']['input'];
  serverId: Scalars['String']['input'];
  cpu: Scalars['Float']['input'];
  memory: Scalars['Float']['input'];
  settings?: InputMaybe<Array<ServerSettingInput> | ServerSettingInput>;
}>;


export type UpdateServerMutation = { __typename?: 'Mutation', updateServer: { __typename?: 'Server', name: string, serverID: string, status: ServerStatus, cpu: number, memory: number, serverTypeID: string, suspend: boolean, ports: Array<{ __typename?: 'ServerPort', port: number, protocol: string }>, settings: Array<{ __typename?: 'ServerSettingOutput', serverSettingKey: string, value: string }> } };


export const CreateServerDocument = gql`
    mutation createServer($name: String!, $serverTypeId: String!, $cpu: Float!, $memory: Float!, $settings: [ServerSettingInput!]) {
  createServer(
    name: $name
    serverTypeId: $serverTypeId
    cpu: $cpu
    memory: $memory
    settings: $settings
  ) {
    name
    serverID
    status
    cpu
    ports {
      port
      protocol
    }
    memory
    serverTypeID
    settings {
      value
    }
    suspend
  }
}
    `;
export const CreateUserDocument = gql`
    mutation createUser($emailAddress: String!, $password: String!) {
  createUser(emailAddress: $emailAddress, password: $password) {
    __typename
    authToken
    userID
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
    }
  }
}
    `;
export const DeleteServerDocument = gql`
    mutation deleteServer($serverId: String!) {
  deleteServer(serverId: $serverId) {
    serverID
  }
}
    `;
export const GetServerTypesDocument = gql`
    query getServerTypes {
  serverTypes {
    nodes {
      __typename
      name
      serverTypeID
      fields {
        __typename
        serverSettingKey
        label
        description
        default
        ... on SelectionServerField {
          options {
            value
          }
        }
      }
      resourcesPerPlayer {
        cpu
        memory
      }
    }
  }
}
    `;
export const GetUserDocument = gql`
    query getUser {
  user {
    userID
    emailAddress
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
  }
}
    `;
export const LoginDocument = gql`
    mutation login($emailAddress: String!, $password: String!) {
  login(emailAddress: $emailAddress, password: $password) {
    __typename
    authToken
    userID
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
  }
}
    `;
export const ServerDocument = gql`
    subscription server($serverId: String!) {
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
}
    `;
export const ServersDocument = gql`
    subscription servers {
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
}
    `;
export const StartServerDocument = gql`
    mutation startServer($serverId: String!) {
  startServer(serverId: $serverId) {
    serverID
    status
  }
}
    `;
export const StopServerDocument = gql`
    mutation stopServer($serverId: String!) {
  stopServer(serverId: $serverId) {
    serverID
    status
  }
}
    `;
export const UpdateServerDocument = gql`
    mutation updateServer($name: String!, $serverId: String!, $cpu: Float!, $memory: Float!, $settings: [ServerSettingInput!]) {
  updateServer(
    name: $name
    serverId: $serverId
    cpu: $cpu
    memory: $memory
    settings: $settings
  ) {
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
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createServer(variables: CreateServerMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateServerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateServerMutation>(CreateServerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createServer', 'mutation', variables);
    },
    createUser(variables: CreateUserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createUser', 'mutation', variables);
    },
    deleteServer(variables: DeleteServerMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteServerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteServerMutation>(DeleteServerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteServer', 'mutation', variables);
    },
    getServerTypes(variables?: GetServerTypesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetServerTypesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetServerTypesQuery>(GetServerTypesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getServerTypes', 'query', variables);
    },
    getUser(variables?: GetUserQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserQuery>(GetUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUser', 'query', variables);
    },
    login(variables: LoginMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginMutation>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'login', 'mutation', variables);
    },
    server(variables: ServerSubscriptionVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ServerSubscription> {
      return withWrapper((wrappedRequestHeaders) => client.request<ServerSubscription>(ServerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'server', 'subscription', variables);
    },
    servers(variables?: ServersSubscriptionVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ServersSubscription> {
      return withWrapper((wrappedRequestHeaders) => client.request<ServersSubscription>(ServersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'servers', 'subscription', variables);
    },
    startServer(variables: StartServerMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<StartServerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<StartServerMutation>(StartServerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'startServer', 'mutation', variables);
    },
    stopServer(variables: StopServerMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<StopServerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<StopServerMutation>(StopServerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stopServer', 'mutation', variables);
    },
    updateServer(variables: UpdateServerMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateServerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateServerMutation>(UpdateServerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateServer', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;