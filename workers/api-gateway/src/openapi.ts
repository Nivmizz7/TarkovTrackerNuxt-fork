export const OPENAPI_SPEC = {
  openapi: '3.1.0',
  info: {
    title: 'TarkovTracker API Gateway',
    version: '2.0.0',
    description: 'Public API gateway for TarkovTracker progress, team progress, and token info.',
  },
  servers: [
    {
      url: 'https://api.tarkovtracker.org',
      description: 'API subdomain (recommended)',
    },
    {
      url: 'https://tarkovtracker.org/api/v2',
      description: 'Legacy path-based API',
    },
  ],
  tags: [{ name: 'health' }, { name: 'tokens' }, { name: 'progress' }, { name: 'team' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'API Token',
      },
    },
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { const: false },
          error: { type: 'string' },
        },
        required: ['success', 'error'],
      },
      TokenInfoResponse: {
        type: 'object',
        properties: {
          success: { const: true },
          permissions: { type: 'array', items: { type: 'string' } },
          token: { type: 'string' },
          owner: { type: 'string' },
          note: { type: 'string' },
          calls: { type: 'number' },
          gameMode: { type: 'string', enum: ['pvp', 'pve'] },
        },
        required: ['success', 'permissions', 'token', 'owner', 'note', 'calls', 'gameMode'],
      },
      ProgressTask: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          complete: { type: 'boolean' },
          failed: { type: 'boolean' },
          invalid: { type: 'boolean' },
        },
        required: ['id', 'complete'],
      },
      ProgressObjective: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          complete: { type: 'boolean' },
          count: { type: 'number' },
          invalid: { type: 'boolean' },
        },
        required: ['id', 'complete', 'count'],
      },
      ProgressHideoutModule: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          complete: { type: 'boolean' },
        },
        required: ['id', 'complete'],
      },
      ProgressHideoutPart: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          complete: { type: 'boolean' },
          count: { type: 'number' },
        },
        required: ['id', 'complete', 'count'],
      },
      ProgressData: {
        type: 'object',
        properties: {
          tasksProgress: { type: 'array', items: { $ref: '#/components/schemas/ProgressTask' } },
          taskObjectivesProgress: {
            type: 'array',
            items: { $ref: '#/components/schemas/ProgressObjective' },
          },
          hideoutModulesProgress: {
            type: 'array',
            items: { $ref: '#/components/schemas/ProgressHideoutModule' },
          },
          hideoutPartsProgress: {
            type: 'array',
            items: { $ref: '#/components/schemas/ProgressHideoutPart' },
          },
          displayName: { type: 'string' },
          userId: { type: 'string' },
          playerLevel: { type: 'number' },
          gameEdition: { type: 'number' },
          pmcFaction: { type: 'string' },
        },
        required: [
          'tasksProgress',
          'taskObjectivesProgress',
          'hideoutModulesProgress',
          'hideoutPartsProgress',
          'displayName',
          'userId',
          'playerLevel',
          'gameEdition',
          'pmcFaction',
        ],
      },
      ProgressResponse: {
        type: 'object',
        properties: {
          success: { const: true },
          data: { $ref: '#/components/schemas/ProgressData' },
          meta: {
            type: 'object',
            properties: {
              self: { type: 'string' },
              gameMode: { type: 'string' },
            },
            required: ['self', 'gameMode'],
          },
        },
        required: ['success', 'data', 'meta'],
      },
      TeamProgressResponse: {
        type: 'object',
        properties: {
          success: { const: true },
          data: { type: 'array', items: { $ref: '#/components/schemas/ProgressData' } },
          meta: {
            type: 'object',
            properties: {
              self: { type: 'string' },
              hiddenTeammates: { type: 'array', items: { type: 'string' } },
            },
            required: ['self', 'hiddenTeammates'],
          },
        },
        required: ['success', 'data', 'meta'],
      },
      UpdateLevelResponse: {
        type: 'object',
        properties: {
          success: { const: true },
          data: {
            type: 'object',
            properties: {
              level: { type: 'number' },
              message: { type: 'string' },
            },
            required: ['level', 'message'],
          },
        },
        required: ['success', 'data'],
      },
      TaskState: {
        type: 'string',
        enum: ['completed', 'uncompleted', 'failed'],
      },
      TaskUpdateRequest: {
        type: 'object',
        properties: {
          state: { $ref: '#/components/schemas/TaskState' },
        },
        required: ['state'],
      },
      BatchTaskUpdateItem: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          state: { $ref: '#/components/schemas/TaskState' },
        },
        required: ['id', 'state'],
      },
      LegacyTaskUpdateMap: {
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/TaskState' },
      },
      TaskUpdateArray: {
        type: 'array',
        items: { $ref: '#/components/schemas/BatchTaskUpdateItem' },
      },
      ObjectiveUpdateRequest: {
        type: 'object',
        properties: {
          state: { type: 'string', enum: ['completed', 'uncompleted'] },
          count: { type: 'number' },
        },
      },
      UpdateTaskResponse: {
        type: 'object',
        properties: {
          success: { const: true },
          data: {
            type: 'object',
            properties: {
              taskId: { type: 'string' },
              state: { $ref: '#/components/schemas/TaskState' },
              message: { type: 'string' },
            },
            required: ['taskId', 'state', 'message'],
          },
        },
        required: ['success', 'data'],
      },
      UpdateTasksResponse: {
        type: 'object',
        properties: {
          success: { const: true },
          data: {
            type: 'object',
            properties: {
              updatedTasks: { type: 'array', items: { type: 'string' } },
              message: { type: 'string' },
            },
            required: ['updatedTasks', 'message'],
          },
        },
        required: ['success', 'data'],
      },
      UpdateObjectiveResponse: {
        type: 'object',
        properties: {
          success: { const: true },
          data: {
            type: 'object',
            properties: {
              objectiveId: { type: 'string' },
              state: { type: 'string', enum: ['completed', 'uncompleted'] },
              count: { type: 'number' },
              message: { type: 'string' },
            },
            required: ['objectiveId', 'message'],
          },
        },
        required: ['success', 'data'],
      },
    },
  },
  paths: {
    '/health': {
      get: {
        tags: ['health'],
        summary: 'Gateway health check',
        operationId: 'getHealth',
        responses: {
          '200': {
            description: 'Healthy response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { const: true },
                    data: {
                      type: 'object',
                      properties: {
                        status: { type: 'string' },
                        timestamp: { type: 'string' },
                        version: { type: 'string' },
                        service: { type: 'string' },
                      },
                      required: ['status', 'timestamp', 'version', 'service'],
                    },
                  },
                  required: ['success', 'data'],
                },
              },
            },
          },
        },
      },
    },
    '/token': {
      get: {
        tags: ['tokens'],
        summary: 'Get token info',
        operationId: 'getTokenInfo',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Token info',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/TokenInfoResponse' },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } },
            },
          },
        },
      },
    },
    '/progress': {
      get: {
        tags: ['progress'],
        summary: 'Get user progress',
        operationId: 'getProgress',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Progress data',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ProgressResponse' },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } },
            },
          },
        },
      },
    },
    '/team/progress': {
      get: {
        tags: ['team'],
        summary: 'Get team progress',
        operationId: 'getTeamProgress',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Team progress data',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/TeamProgressResponse' },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } },
            },
          },
        },
      },
    },
    '/progress/level/{level}': {
      post: {
        tags: ['progress'],
        summary: 'Update player level',
        operationId: 'updatePlayerLevel',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'level',
            in: 'path',
            required: true,
            schema: { type: 'number', minimum: 1, maximum: 79 },
          },
        ],
        responses: {
          '200': {
            description: 'Level updated',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UpdateLevelResponse' },
              },
            },
          },
          '400': {
            description: 'Invalid level',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } },
            },
          },
        },
      },
    },
    '/progress/task/{taskId}': {
      post: {
        tags: ['progress'],
        summary: 'Update single task state',
        operationId: 'updateTask',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'taskId', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/TaskUpdateRequest' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Task updated',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UpdateTaskResponse' },
              },
            },
          },
          '400': {
            description: 'Invalid state',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } },
            },
          },
        },
      },
    },
    '/progress/task/objective/{objectiveId}': {
      post: {
        tags: ['progress'],
        summary: 'Update a task objective',
        operationId: 'updateTaskObjective',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'objectiveId', in: 'path', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ObjectiveUpdateRequest' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Objective updated',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UpdateObjectiveResponse' },
              },
            },
          },
          '400': {
            description: 'Invalid body',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } },
            },
          },
        },
      },
    },
    '/progress/tasks': {
      post: {
        tags: ['progress'],
        summary: 'Batch update tasks',
        operationId: 'updateTasksBatch',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  { $ref: '#/components/schemas/LegacyTaskUpdateMap' },
                  { $ref: '#/components/schemas/TaskUpdateArray' },
                ],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Tasks updated',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UpdateTasksResponse' },
              },
            },
          },
          '400': {
            description: 'Invalid body',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } },
            },
          },
        },
      },
    },
  },
} as const;
export const OPENAPI_JSON = JSON.stringify(OPENAPI_SPEC, null, 2);
