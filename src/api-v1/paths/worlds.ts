import { Response, Request } from "express";


export default function(worldsService:{ getWorlds: (name:string) => {name:string}[] }) {
  let operations = {
    GET
  };

  function GET(req: Request, res: Response, next: any) {
    res.status(200).json(worldsService.getWorlds(req.query.worldName as string));
  }

  // NOTE: We could also use a YAML string here.
  GET.apiDoc = {
    summary: 'Returns worlds by name.',
    operationId: 'getWorlds',
    parameters: [
      {
        in: 'query',
        name: 'worldName',
        required: true,
        type: 'string'
      }
    ],
    responses: {
      200: {
        description: 'A list of worlds that match the requested name.',
        schema: {
          type: 'array',
          items: {
            $ref: '#/definitions/World'
          }
        }
      },
      default: {
        description: 'An error occurred',
        schema: {
          additionalProperties: true
        }
      }
    }
  };

  return operations;
}