import moment from 'moment';
import _ from 'lodash';
import $ from 'jquery';
import logger from 'js-logger';

window.moment = moment;
logger.useDefaults();

export function Vendor(Restangular) {
  return {
    moment,
    _,
    R: Restangular,
    $,
    logger
  };
}
