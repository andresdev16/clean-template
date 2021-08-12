import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as DateTime from 'date-fns';

@Injectable()
export class DateManager {
    constructor(private readonly httpService: HttpService) {}

    async isDateOff(date: Date) {
        const response = await this.httpService.get(process.env.MELONN_API_URL + '/off-days').toPromise()
        const dates = response.data.map(x => {return new Date(x)})
        return dates.includes(date)
    }

    async nextBusinessDays(date: Date) {
        var nextBusinessDays = []
        for (let i = 0; i < 10; i++) {
            nextBusinessDays.push(DateTime.addBusinessDays(date, 1))
        }
        return nextBusinessDays
    }

    async getByRequestTime(shippingMethodId: number) {
        const response = await this.httpService.get(process.env.MELONN_API_URL + `/shipping-methods/${shippingMethodId}`).toPromise()
        const byRequestTime = response.data.rules.availability.byRequestTime
        return byRequestTime
    }

    validateTimeOfDay(requestTime, date: Date) {
        if (requestTime.dayTipe === 'BUSINESS') {
            if (this.isDateOff(date)) return false;
        }
        const fromTime = requestTime.fromTimeOfDay
        const toTime = requestTime.toTimeOfDay
        if (fromTime <= date.getHours() <= toTime) {
            return true
        } else {
            return false
        }
    }

    async calculatePromises(shippingMethodId: number, date: Date) {
        const response = await this.httpService.get(process.env.MELON_API_URL + `/shipping-methods/${shippingMethodId}`).toPromise()
        const promisesCases = response.data.rules.promisesParameters.cases
        let priority = 1
        
        for (let i = 0; i < promisesCases.length; i++) {
            const fromTime = promisesCases[i].condition.byRequestTime.fromTimeOfDay
            const toTime = promisesCases[i].condition.byRequestTime.toTimeOfDay
            const dayTipe = promisesCases[i].condition.byRequestTime.dayTipe

            if (promisesCases[i].priority === priority) {
                if (dayTipe === 'BUSINESS') {
                    if (this.isDateOff(date)) {
                        priority++
                        continue
                    }
                }
                if (fromTime <= date.getHours() <= toTime) {
                    const workingCase = promisesCases[i]
                    return workingCase
                } else {
                    priority++
                }
            } else {
                return false
            }         
        }

    }

    logicPromise(workingCase, nextBusinessDays: Date[]) {
        let datePromiseMin = []
        const promiseMin = [
            workingCase.packPromise.min,
            workingCase.shipPromise.min,
            workingCase.deliveryPromise.min,
            workingCase.readyPickUpPromise.min
        ]
        for (let i = 0; i < promiseMin.length; i++) {
            const nowDateTime = new Date()
            switch (promiseMin[i].type) {
                case 'NULL':
                    datePromiseMin.push(null)
                    break;
                case 'DELTA-HOURS':
                    datePromiseMin.push(
                        new Date(
                            DateTime.addHours(nowDateTime, promiseMin[i].deltaHours)
                                .toUTCString()
                        )
                    )
                    break;
                case 'DELTA-BUSINESSDAYS':
                    datePromiseMin.push(
                        new Date(DateTime.addHours(
                            nextBusinessDays[promiseMin[i].deltaBusinessDays - 1], 
                            promiseMin[i].timeOfDay
                        ).toUTCString())
                    )
                    break;
            }
        }
        let datePromiseMax = []
        const promiseMax = [
            workingCase.packPromise.max,
            workingCase.shipPromise.max,
            workingCase.deliveryPromise.max,
            workingCase.readyPickUpPromise.max
        ]
        for (let i = 0; i < promiseMax.length; i++) {
            const nowDateTime = new Date()
            switch (promiseMax[i].type) {
                case 'NULL':
                    datePromiseMax.push(null)
                    break;
                case 'DELTA-HOURS':
                    datePromiseMax.push(
                        new Date(
                            DateTime.addHours(nowDateTime, promiseMax[i].deltaHours)
                                .toUTCString()
                        )
                    )
                    break;
                case 'DELTA-BUSINESSDAYS':
                    datePromiseMax.push(
                        new Date(DateTime.addHours(
                            nextBusinessDays[promiseMax[i].deltaBusinessDays - 1], 
                            promiseMax[i].timeOfDay
                        ).toUTCString())
                    )
                    break;
            }
        }
        return [datePromiseMin, datePromiseMax]
    }
}