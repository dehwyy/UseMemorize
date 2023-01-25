import { Module } from '@nestjs/common'
import CardResolver from './card.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import CardDB, { CardSchema } from './models/card.schema'
import CardService from './card.service'
import AuthTokenDB, { AuthTokenSchema } from '@src/auth/models/auth.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CardDB.name, schema: CardSchema }]),
  ],
  exports: [CardService],
  providers: [CardResolver, CardService],
})
export default class CardModule {}
