import {driver} from './driver';

const configure = async function() {
    this.setDefaultTimeout(30 * 1000);

    this.registerHandler('AfterFeatures', function (event, callback) {
        driver.quit().then(() => callback());
    });
};

module.exports = configure;
