import { Field, ObjectType } from '@nestjs/graphql'
import CardQL from '@src/card/models/card.model'
import QuizCardQL from '@src/quizCard/models/quizCard.model'
import CollectionQL from '@src/collection/models/collection.model'

@ObjectType({ description: 'user model' })
export default class UserModel {
  @Field()
  password: string

  @Field()
  _id: string

  @Field()
  email: string

  @Field()
  username: string

  @Field(type => [CardQL], { nullable: 'items' })
  cards: CardQL[]

  @Field(type => [QuizCardQL], { nullable: 'items' })
  quizCards: QuizCardQL[]

  @Field(type => [CollectionQL], { nullable: 'items' })
  collections: CollectionQL[]
}