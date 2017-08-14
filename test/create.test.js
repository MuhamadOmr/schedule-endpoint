var jobs = require("../api/jobs");
var Schedule = require("../DB/schema").Schedule;

var chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var should = require('chai').should();
var expect = chai.expect;

describe("testing Create function",()=>{

  beforeEach((done)=>{

    Schedule.remove({}).then(()=>{
      done();
    })
  });


  it("should create a schedule record",()=>{


  });

  it("should send duplicate error ",()=>{


  });

  it("should send validation error ",()=>{


  });

  afterEach(()=>{

  });


})