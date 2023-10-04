[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# build-hierarchy

> Convert flat structures to deeply nested hierarchical data in node.js. Transform flat objects array representations to array of nested objects.

Basic usage example:
```
> npm install build-hierarchy -S
```

```tsx
const HierarchyBuilder = require('build-hierarchy');

//Optionally required to view result. 
const fs = require('fs');
const util = require('util');

/*
Taking input an array of flat structure 
and returning hierarichal data as an output.

example : 

input : [continent, country, state, city]
output : coninent -> country -> state -> city
 
*/

//Input flat structure.
const input = [
    {
        "Continent_ID": 1,
        "Continent": "Asia",
        "Country_ID": 101,
        "Country": "India",
        "State_ID": 1001,
        "State": "Gujrat",
        "City_ID": 10001,
        "City": "Surat"
    },
    {
        "Continent_ID": 1,
        "Continent": "Asia",
        "Country_ID": 101,
        "Country": "India",
        "State_ID": 1001,
        "State": "Gujrat",
        "City_ID": 10002,
        "City": "Rajkot"
    },
    {
        "Continent_ID": 1,
        "Continent": "Asia",
        "Country_ID": 101,
        "Country": "India",
        "State_ID": 1002,
        "State": "Haryana",
        "City_ID": 10003,
        "City": "Gurugram"
    },
    {
        "Continent_ID": 1,
        "Continent": "Asia",
        "Country_ID": 101,
        "Country": "India",
        "State_ID": 1002,
        "State": "Haryana",
        "City_ID": 10004,
        "City": "Panipat"
    },
    {
        "Continent_ID": 1,
        "Continent": "Asia",
        "Country_ID": 102,
        "Country": "Thailand",
        "State_ID": 1003,
        "State": "Chiang Mai",
        "City_ID": 10005,
        "City": "Doi Saket"
    },
    {
        "Continent_ID": 1,
        "Continent": "Asia",
        "Country_ID": 102,
        "Country": "Thailand",
        "State_ID": 1003,
        "State": "Chiang Mai",
        "City_ID": 10006,
        "City": "Chom Thong"
    },
    {
        "Continent_ID": 1,
        "Continent": "Asia",
        "Country_ID": 102,
        "Country": "Thailand",
        "State_ID": 1004,
        "State": "Chiang Rai",
        "City_ID": 10007,
        "City": "Mae Suai"
    },
    {
        "Continent_ID": 1,
        "Continent": "Asia",
        "Country_ID": 102,
        "Country": "Thailand",
        "State_ID": 1004,
        "State": "Chiang Rai",
        "City_ID": 10008,
        "City": "Phan"
    },
    {
        "Continent_ID": 2,
        "Continent": "Africa",
        "Country_ID": 107,
        "Country": "South Africa",
        "State_ID": 1005,
        "State": "Northern Cape",
        "City_ID": 10009,
        "City": "Kimberley"
    },
    {
        "Continent_ID": 2,
        "Continent": "Africa",
        "Country_ID": 107,
        "Country": "South Africa",
        "State_ID": 1005,
        "State": "Northern Cape",
        "City_ID": 10010,
        "City": "Sutherland"
    },
    {
        "Continent_ID": 2,
        "Continent": "Africa",
        "Country_ID": 107,
        "Country": "South Africa",
        "State_ID": 1006,
        "State": "Eastern Cape",
        "City_ID": 10011,
        "City": "Stormsrivier"
    },
    {
        "Continent_ID": 2,
        "Continent": "Africa",
        "Country_ID": 107,
        "Country": "South Africa",
        "State_ID": 1006,
        "State": "Eastern Cape",
        "City_ID": 10012,
        "City": "Hogsback"
    },
    {
        "Continent_ID": 3,
        "Continent": "North America",
        "Country_ID": 112,
        "Country": "Canada",
        "State_ID": 1007,
        "State": "Ontario",
        "City_ID": 10013,
        "City": "Toronto"
    },
    {
        "Continent_ID": 3,
        "Continent": "North America",
        "Country_ID": 112,
        "Country": "Canada",
        "State_ID": 1007,
        "State": "Ontario",
        "City_ID": 10014,
        "City": "Ottawa"
    },
    {
        "Continent_ID": 3,
        "Continent": "North America",
        "Country_ID": 112,
        "Country": "Canada",
        "State_ID": 1008,
        "State": "Quebec",
        "City_ID": 10015,
        "City": "Montreal"
    },
    {
        "Continent_ID": 3,
        "Continent": "North America",
        "Country_ID": 112,
        "Country": "Canada",
        "State_ID": 1008,
        "State": "Quebec",
        "City_ID": 10016,
        "City": "Sherbrooke"
    }
]

//Defining levels and properties to be used.
const levels = [
    {
        "level": 1,
        "groupByKeys": ["Continent_ID"], //can be grouped by multiple properties.
        "entities": [
            {
                "id": 1,
                "name": "Continent",
                "properties": {
                    "Continent_ID": "id", //property name alias.
                    "Continent": "name"
                }
            }
        ]
    },
    {
        "level": 2,
        "groupByKeys": [
            "Country_ID"
        ],
        "entities": [
            {
                "id": 1,
                "name": "Country",
                "properties": {
                    "Country_ID": "id",
                    "Country": "name"
                }
            }
        ]
    },
    {
        "level": 3,
        "groupByKeys": [
            "State_ID"
        ],
        "entities": [
            {
                "id": 1,
                "name": "State",
                "properties": {
                    "State_ID": "id",
                    "State": "state"
                }
            }
        ]
    },
    {
        "level": 4,
        "groupByKeys": ["City_ID"],
        "entities": [
            {
                "id": 1,
                "name": "City",
                "properties": {
                    "City_ID": "id",
                    "City": "name"
                }
            }
        ]
    }
];

const builder = new HierarchyBuilder();

const resultset = builder.buildHierarchy(input, levels, []);

//Using util.inspect method to see depply nested data.
console.log(util.inspect(resultset, { showHidden: false, depth: null, colors: true }))

//To view better logging resultset to a JSON file.
fs.writeFile("resultset.json", JSON.stringify(resultset), err => {
    if (err) throw err;
    console.log("Done writing resultset.json");
});

//Output :
/*
[
    {
        "id": 1,
        "name": "Asia",
        "children": [
            {
                "id": 101,
                "name": "India",
                "children": [
                    {
                        "id": 1001,
                        "state": "Gujrat",
                        "children": [
                            {
                                "id": 10001,
                                "name": "Surat",
                                "children": []
                            },
                            {
                                "id": 10002,
                                "name": "Rajkot",
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 1002,
                        "state": "Haryana",
                        "children": [
                            {
                                "id": 10003,
                                "name": "Gurugram",
                                "children": []
                            },
                            {
                                "id": 10004,
                                "name": "Panipat",
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": 102,
                "name": "Thailand",
                "children": [
                    {
                        "id": 1003,
                        "state": "Chiang Mai",
                        "children": [
                            {
                                "id": 10005,
                                "name": "Doi Saket",
                                "children": []
                            },
                            {
                                "id": 10006,
                                "name": "Chom Thong",
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 1004,
                        "state": "Chiang Rai",
                        "children": [
                            {
                                "id": 10007,
                                "name": "Mae Suai",
                                "children": []
                            },
                            {
                                "id": 10008,
                                "name": "Phan",
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 2,
        "name": "Africa",
        "children": [
            {
                "id": 107,
                "name": "South Africa",
                "children": [
                    {
                        "id": 1005,
                        "state": "Northern Cape",
                        "children": [
                            {
                                "id": 10009,
                                "name": "Kimberley",
                                "children": []
                            },
                            {
                                "id": 10010,
                                "name": "Sutherland",
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 1006,
                        "state": "Eastern Cape",
                        "children": [
                            {
                                "id": 10011,
                                "name": "Stormsrivier",
                                "children": []
                            },
                            {
                                "id": 10012,
                                "name": "Hogsback",
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 3,
        "name": "North America",
        "children": [
            {
                "id": 112,
                "name": "Canada",
                "children": [
                    {
                        "id": 1007,
                        "state": "Ontario",
                        "children": [
                            {
                                "id": 10013,
                                "name": "Toronto",
                                "children": []
                            },
                            {
                                "id": 10014,
                                "name": "Ottawa",
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 1008,
                        "state": "Quebec",
                        "children": [
                            {
                                "id": 10015,
                                "name": "Montreal",
                                "children": []
                            },
                            {
                                "id": 10016,
                                "name": "Sherbrooke",
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
*/
```

## Built using

* lodash & node.js module.

## Authors

* **Ayush Pratap** - *Initial work* - [AyushPratap](https://github.com/ayushpratap2494)

## License

[MIT License] © Ayush Pratap