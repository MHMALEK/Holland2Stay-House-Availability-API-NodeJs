import { Injectable } from '@nestjs/common';
import { CrawlerService } from 'src/crawler/crawler.service';
import { citiesENum } from './cities.enum';

@Injectable()
export class Holland2stayService {
  browser;

  constructor(private crawler: CrawlerService) {}
  async fetchAllAvailableForRentHousesByCityId(cityId: citiesENum) {
    const page = await this.crawler.goToPage(
      `https://holland2stay.com/residences.html?available_to_book=179,336&city=${cityId}`,
    );

    let totalHomeAvailable;
    let noHomeAvailable = false;

    try {
      const getNotificationElement = await page.$(
        '#layer-product-list > div > div',
      );
      const getNotificationElementText = await (
        await getNotificationElement.getProperty('textContent')
      ).jsonValue();

      if (getNotificationElementText.includes('no available')) {
        totalHomeAvailable = null;
        noHomeAvailable = true;
      } else {
        const getTotalAvailableHouses = await page.$(
          '#maincontent > div.columns > div > section > div > div.row > div.col-lg-9 > div.regi-title-box > h5 > span',
        );
        const getTotalAvailableHousesText = await (
          await getTotalAvailableHouses.getProperty('textContent')
        ).jsonValue();
        totalHomeAvailable = getTotalAvailableHousesText;
      }
      return { totalHomeAvailable, noHomeAvailable };
    } catch (e) {
      console.log('1', e);
    }
  }
  async fetchAllAvailableForRentHousesForAllCities() {
    const results = [];
    const citiesKeyArray = Object.keys(
      citiesENum,
    ) as (keyof typeof citiesENum)[];
    const citiesValuesArray = Object.values(citiesENum);

    for (let index = 0; index < citiesKeyArray.length; index++) {
      const res = await this.fetchAllAvailableForRentHousesByCityId(
        citiesENum[citiesKeyArray[index]],
      );
      results.push({
        label: citiesValuesArray[index],
        cityId: citiesKeyArray[index],
        ...res,
      });
    }
    console.log(results);
    return results;
  }
}
