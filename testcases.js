const request = require('supertest');
const nock = require('nock');
const app = require('./wrapperapi');
//const { response } = require('./wrapperapi');




describe('POST /create', () => {
  it('should return 200 with response', async () => {
    const ingestionSpec = {"type": "kafka",
        "spec": {
            "ioConfig": {
                "type": "kafka",
                "consumerProperties": {
                    "bootstrap.servers": "localhost:9092"
                },
                "useEarliestOffset": true,
                "topic": "wrapper-ingestion",
                "inputFormat": {
                    "type": "json"
                }
            },
            "tuningConfig": {
                "type": "kafka"
            },
            "dataSchema": {
                "dataSource": "wrapper-ingestion",
                "timestampSpec": {
                    "column": "created_date",
                    "format": "iso"
                },
                "dimensionsSpec": {
                    "dimensions": [
                        "id",
                        "status",
                        "created_by",
                        "updated_by",
                        "updated_date"
                    ]
                },
                "granularitySpec": {
                    "queryGranularity": "none",
                    "rollup": false,
                    "segmentGranularity": "day"
                }
            }
        }
    } ;
    const scope = nock('http://localhost:8888')
      .post('/druid/indexer/v1/supervisor', ingestionSpec)
      .reply(200, { success: true });

    const res = await request(app)
      .post('/create')
      .send(ingestionSpec)
    
  });

  it('should return 400 with response', async () => {
    const ingestionSpec = {
        "spec": {
            "ioConfig": {
                "type": "kafka",
                "consumerProperties": {
                    "bootstrap.servers": "localhost:9092"
                },
                "useEarliestOffset": true,
                "topic": "wrapper-ingestion",
                "inputFormat": {
                    "type": "json"
                }
            },
            "tuningConfig": {
                "type": "kafka"
            },
            "dataSchema": {
                "dataSource": "wrapper-ingestion",
                "timestampSpec": {
                    "column": "created_date",
                    "format": "iso"
                },
                "dimensionsSpec": {
                    "dimensions": [
                        "id",
                        "status",
                        "created_by",
                        "updated_by",
                        "updated_date"
                    ]
                },
                "granularitySpec": {
                    "queryGranularity": "none",
                    "rollup": false,
                    "segmentGranularity": "day"
                }
            }
        }
    } ;
    const scope = nock('http://localhost:8888')
      .post('/druid/indexer/v1/supervisor', ingestionSpec)
      .reply(400, "not a proper request body");

    const res = await request(app)
      .post('/create')
      .send(ingestionSpec);

   
  });
});



describe('POST /nativequery', () => {
    it('should return 200 with response', async () => {
      const mockRequestBody = {
        
            "queryType": "scan",
            "dataSource": {
                "type": "table",
                "name": "wikipedia"
            },
            "intervals": {
                "type": "intervals",
                "intervals": [
                    "-146136543-09-08T08:23:32.096Z/146140482-04-24T15:36:27.903Z"
                ]
            },
            "resultFormat": "list",
            "limit": 10,
            "filter": {
                "type": "not",
                "field": {
                    "type": "selector",
                    "dimension": "countryName",
                    "value": null
                }
            },
            "columns": [
                "cityName"
            ],
            "legacy": false,
            "context": {
                "queryId": "f74d3565-5cfc-4546-a8af-f0c2383c3936",
                "sqlOuterLimit": 10,
                "sqlQueryId": "f74d3565-5cfc-4546-a8af-f0c2383c3936",
                "useNativeQueryExplain": true
            },
            "granularity": {
                "type": "all"
            }
        }
      
      const scope = nock('http://localhost:8888')
        .post('/druid/v2/', mockRequestBody)
        .reply(200, { success: true });
  
      const res = await request(app)
        .post('/nativequery')
        .send(mockRequestBody);
  
    });
  
    it('should return 400 with response', async () => {
      const mockRequestBody = {
        
            "queryType": "scan",
            "dataSource": {
                "type": "table",
                "name": "wikipedia"
            },
            "intervals": {
                "type": "intervals",
                "intervals": [
                    "-146136543-09-08T08:23:32.096Z/146140482-04-24T15:36:27.903Z"
                ]
            },
            "resultFormat": "list",
            "limit": 10,
            "filter": {
                "type": "not",
                "field": {
                    "type": "selector",
                    "dimension": "countryName",
                    "value": null
                }
            },
            "columns": [
                "cityName"
            ],
            "legacy": false,
            "context": {
                "queryId": "f74d3565-5cfc-4546-a8af-f0c2383c3936",
                "sqlOuterLimit": 10,
                "sqlQueryId": "f74d3565-5cfc-4546-a8af-f0c2383c3936",
                "useNativeQueryExplain": true
            },
            "granularity": {
                "type": "all"
            }
        }
      const scope = nock('http://localhost:8888')
        .post('/druid/v2', mockRequestBody)
        .reply(400, "not a proper request body");
  
      const res = await request(app)
        .post('/nativequery')
        .send(mockRequestBody);
  
     
    });
  });
  


  describe('POST /sqlquery', () => {
    it('should return 200 with response', async () => {
      const mockRequestBody = 
        
        {
            "query": "select * from wiki"
        }
        
      
      const scope = nock('http://localhost:8888')
        .post('/druid/v2/sql', mockRequestBody)
        .reply(200, { success: true });
  
      const res = await request(app)
        .post('/sqlquery')
        .send(mockRequestBody);
  
    });
  
    it('should return 400 with response', async () => {
      const mockRequestBody = 
        
        {
            
        }
        
      const scope = nock('http://localhost:8888')
        .post('/druid/v2/sql', mockRequestBody)
        .reply(400, "not a proper request body");
  
      const res = await request(app)
        .post('/sqlquery')
        .send(mockRequestBody);
  
     
    });
  });









