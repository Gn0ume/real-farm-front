import {apolloClient} from '../../index'
import {queryGetMyFarms} from "../queries/queries";

export default class FarmModel {
  static getCurrentUserFarms(){
    return apolloClient.query({
      query: queryGetMyFarms
    })
      .then( response => response.data.me.farms)
  }
}