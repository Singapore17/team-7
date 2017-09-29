# insta-scraper
Node.js module for getting basic data from instagram without login

## Installation
```
$ npm install insta-scraper --save
```

## Usage
```
var scraper = require('insta-scraper');
```
**insta-scraper** offers these promise methods:
```
scraper.getAccountInfo(username, function(error,response_json){ })
```

```
scraper.getAccountMedia(username, [max_id], function(error,response_json){ })
```

```
scraper.getMediaByTag(tag, [max_id], function(error,esponse_json){ })
```

```
scraper.getMediaByLocationId(locationId, [max_id], function(error,response_json){ })
```

```
scraper.getMediaByCode(media_code, function(error,response_json){ })
```

```
scraper.generalSearch(search_keyword, function(error,response_json){ })
```

```
scraper.generalQuery(instagram_query, function(error,response_json){ })
```

## Known issue
Please pass **max_id** param to methods as String, with quotes, because Javascript don't work with large int
