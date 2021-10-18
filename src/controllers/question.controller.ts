import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Question} from '../models';
import {QuestionRepository} from '../repositories';

export class QuestionController {
  constructor(
    @repository(QuestionRepository)
    public questionRepository: QuestionRepository,
  ) {}

  @post('/questions')
  @response(200, {
    description: 'Question model instance',
    content: {'application/json': {schema: getModelSchemaRef(Question)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Question, {
            title: 'NewQuestion',
            exclude: ['id'],
          }),
        },
      },
    })
    question: Omit<Question, 'id'>,
  ): Promise<Question> {
    return this.questionRepository.create(question);
  }

  @get('/questions/count')
  @response(200, {
    description: 'Question model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Question) where?: Where<Question>): Promise<Count> {
    return this.questionRepository.count(where);
  }

  @get('/questions')
  @response(200, {
    description: 'Array of Question model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Question, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Question) filter?: Filter<Question>,
  ): Promise<Question[]> {
    return this.questionRepository.find(filter);
  }

  @patch('/questions')
  @response(200, {
    description: 'Question PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Question, {partial: true}),
        },
      },
    })
    question: Question,
    @param.where(Question) where?: Where<Question>,
  ): Promise<Count> {
    return this.questionRepository.updateAll(question, where);
  }

  @get('/questions/{id}')
  @response(200, {
    description: 'Question model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Question, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Question, {exclude: 'where'})
    filter?: FilterExcludingWhere<Question>,
  ): Promise<Question> {
    return this.questionRepository.findById(id, filter);
  }

  @patch('/questions/{id}')
  @response(204, {
    description: 'Question PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Question, {partial: true}),
        },
      },
    })
    question: Question,
  ): Promise<void> {
    await this.questionRepository.updateById(id, question);
  }

  @put('/questions/{id}')
  @response(204, {
    description: 'Question PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() question: Question,
  ): Promise<void> {
    await this.questionRepository.replaceById(id, question);
  }

  @del('/questions/{id}')
  @response(204, {
    description: 'Question DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.questionRepository.deleteById(id);
  }
}
