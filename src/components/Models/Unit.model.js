import {apolloClient} from '../../index'
import {queryGetUnits} from "../queries/queries";

export default class UnitModel {
  static getAllUnits(){
    return apolloClient.query({
      query: queryGetUnits
    })
      .then( response => response.data.__type.enumValues)
  }
}