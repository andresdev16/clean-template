import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class WeightManager {
    constructor(private readonly httpService: HttpService) {}

    async verifyWeight(weight: number, shippingMethodId: number) {
        const response = await this.httpService.get(process.env.MELONN_API_URL + `/shipping-methods/${shippingMethodId}`).toPromise()
        const min = response.data.rules.availability.byWeight.min
        const max = response.data.rules.availability.byWeight.max
        if (min <= weight && weight <= max) {
            return true
        } else {
            return false
        }
    }
}