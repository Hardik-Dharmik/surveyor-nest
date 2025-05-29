export class CreateFormDto {
  name: string;
  description: string;
  body: Record<string, any>[];
}

export class UpdateFormDto {
  name?: string;
  description?: string;
  body?: Record<string, any>[];
}
