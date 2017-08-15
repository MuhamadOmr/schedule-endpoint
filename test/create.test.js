var chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;
var should = require('chai').should();
var sinon = require('sinon');
var Schedule = require("../DB/schema").Schedule;
var jobs = require("../api/jobs");

describe("test the create method", ()=>{

  beforeEach(()=>{

    req = {body:{
      "appID":"kja3i92i",
      "name": "PPPPPPPPPPPPPPPPPPPPPPPPPPPP PPPPP",
      "scheduleTime": "December 17, 2017 03:24:00",
      "data": {
        "msg": "hello there !"
      }
    },
    is: function(){

    }
    };
    res={
      send: function(){

      }

    };

  });

  it.only("should create the record in the DB",()=>{

    checkJsonStub = sinon.stub(jobs, 'checkIfJson').resolves("checked");


     return jobs.createSchedule(req).should.be.fulfilled;


    });

  it("should create the record in the DB",()=>{


  })

  it("should create the record in the DB",()=>{


  })

})