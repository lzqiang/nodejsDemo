'use strict';
const superagent = require('superagent'),
      cheerio = require('cheerio'),
      sync = require('async'),
      bunyan = require('bunyan'),
      mysql = require('mysql');

const logger = bunyan.createLogger({
  name: "spider",
  level: "info"
});

const pool  = mysql.createPool({
  connectionLimit : 20,
  host            : '172.16.2.15',
  user            : 'appread',
  password        : '51auto_v4',
  database        : 'test'
});

const targetUrl = "http://auto.ifeng.com/hangye/";

let spiderUrls = [];

function start(res) {
  for (let i = 1; i < 3; i++) {
    let url = targetUrl + i + ".shtml";
    superagent.get(url).end(function(err, result) {
      if (err) {
        logger.info("url : " + url + " message : " + err.message);
      } else {
        let $ = cheerio.load(result.text);
        let arr = $("div.v2c-lst-layout>div.v2c-lst-li>a:first-child");
        arr.each(function (i, ele) {
          let _a = $(this);
          spiderUrls.push({title:_a.text(), url:_a.attr('href')});
        })
      }
    });
  }

  if (!isEmptyArr(spiderUrls)) {
    sync.mapLimit(spiderUrls, 5, function (spiderUrl, callback) {
      spiderDetail(spiderUrl, callback);
    }, function (err, result) {
      let ret = "";
      result.forEach(function (ele) {
        ret = ret + ele + "<br>";
      });
      spiderUrls = [];
      res.send(ret);
    });
  } else {
    res.send("spiderUrls is empty");
  }
}

function spiderDetail(item, callback) {
  superagent.get(item.url).end(function(err, result) {
    let title = "";
    if (err) {
      logger.info("url : " + item.url + " message : " + err.message + " status : " + result.status);
    } else {
      if (item.url.indexOf("/zhuanlan/") < 0) {
        let $ = cheerio.load(result.text);
        let inTitle = $("div.arl-cont>h3");

        pool.getConnection(function(err, connection) {
          connection.query('INSERT INTO NODE_TEST (TITLE) VALUES (?)', inTitle.text(), function(err, result) {

            connection.release();

            if (err) {
              logger.error(err.message);
              throw err;
            }
          });
        });
        title = title + inTitle.text();
      }
    }
    callback(null, title);
  });
}

const isEmptyArr = function( arr ) {
  for ( const obj in arr ) {
    return false;
  }
  return true;
};

module.exports = start;