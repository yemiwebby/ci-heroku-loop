import {Entity, model, property} from '@loopback/repository';

@model()
export class Question extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  difficulty: string;

  @property({
    type: 'string',
    required: true,
  })
  question: string;

  @property({
    type: 'string',
    required: true,
  })
  answer: string;

  constructor(data?: Partial<Question>) {
    super(data);
  }
}

export interface QuestionRelations {
  // describe navigational properties here
}

export type QuestionWithRelations = Question & QuestionRelations;
