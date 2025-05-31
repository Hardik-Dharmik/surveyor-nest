export class CreateFormDto {
  name: string;
  body: Record<string, any>[];
}

export class UpdateFormDto {
  name?: string;
  body?: Record<string, any>[];
}
