import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import CardModel from './models/card.schema'
import { Model } from 'mongoose'
import CreateCarDTO from './models/DTO/createCardDTO'

@Injectable()
export default class CardService {
  constructor(
    @InjectModel(CardModel.name) private cardModel: Model<CardModel>,
  ) {}
  async getCardById(id: string) {
    const card = await this.cardModel.findById(id)
    return card
  }

  async deleteCardById(id: string) {
    const card = await this.cardModel.findByIdAndDelete(id)
    return card
  }

  async createCard(userData: CreateCarDTO) {
    const card = await this.cardModel.create(userData)
    return card
  }
}
