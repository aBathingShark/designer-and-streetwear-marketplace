
# PROJECT NAME

---

Name: Tony Truong

Date: 04/09/2020

Project Topic: Designer and Streetwear Marketplace

URL: 

---


### 1. Data Format and Storage

Data point fields:
- `brand`:     ...       `Type: String`
- `category`:     ...       `Type: String`
- `item_name`:     ...       `Type: String`
- `size`:     ...       `Type: String`
- `description`:     ...       `Type: String`
- `price`:     ...       `Type: Number`
- `tags`:     ...       `Type: Array`
- `preview`:     ...       `Type: String`
- `title`:     ...       `Type: String`

Schema: 
```javascript
{
   ...
}
```

### 2. Add New Data

HTML form route: `/create`

POST endpoint route: `/api/create`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/create',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       brand: 'Adidas',
       category: 'Footwear',
       item_name: 'Yeezy Boost 350 v2 Black',
       size: '9',
       description: 'Used but well kept with original box and receipt',
       price: 300,
       tags: adidas yeezy 350
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/getListings`

### 4. Search Data

Search Field: title

### 5. Navigation Pages

Navigation Filters
1. Alphabetical -> `/alphabetical`
2. Price: Ascending -> `/ascending`
3. Price: Descending -> `/descending`
4. Random -> `/random`
5. Under $100 -> `/under100`

