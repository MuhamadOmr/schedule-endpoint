var chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
var chai = require('chai')
    , chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var should = require('chai').should();
var sinon = require('sinon');
var Schedule = require("../DB/schema").Schedule;
var jobs = require("../api/jobs");
var server = require("../server").server;
const request = require('supertest');
const ObjectID = require('mongodb').ObjectID;


describe("/POST test the create method", ()=>{

  beforeEach((done)=>{

    //req = {body:{
    req = {
      appID: "kja3i92i",
      name: "name of the schedule",
      scheduleTime: "December 17, 2017 03:24:00",
      data: {
        msg: "hello there !"
      }
    };

    Schedule.remove({}).then(()=>{
      done();
    });


  });

  it("should create the record in the DB",(done)=>{

    chai.request("http://localhost:8088/")
    .post('schedule')
    .set('Content-Type', 'application/json')
    .send(req)
    .end((err , res)=>{
      expect(res).to.have.status(200);
      expect(res.body).to.have.include({app_id:"kja3i92i",
        name: "name of the schedule",
      });

      done();
    });

  });

  afterEach((done)=>{
    Schedule.remove({}).then(()=>{
      done();
    })

  });

});


describe("/GET get all schedules", ()=>{

  beforeEach((done)=>{

    //req = {body:{
    req1 = {
      app_id: "kja3i92i1",
      name: "name of the schedule1",
      schedule: {
        time: "December 17, 2017 03:24:00",
      },
      pushData: {
        msg: "hello there !"
      }
    };

    req2 = {
      app_id: "kja3i92i2",
      name: "name of the schedule2",
      schedule: {
        time: "December 17, 2017 03:24:00",
      },
      pushData: {
        msg: "hello there !"
      }
    };

    Schedule.insertMany([req1 , req2]).then(()=>{
      done();
    })


  });


  it("should get all records in the database",(done)=>{

    chai.request("http://localhost:8088/")
    .get('schedule')
    .end((err , res)=>{
      expect(res).to.have.status(200);
      expect(res.body).to.have.lengthOf(2);
      done();
    });

  });

  afterEach((done)=>{
    Schedule.remove({}).then(()=>{
      done();
    })

  });

});


describe("/DEl delete all the records", ()=>{

  beforeEach((done)=>{

    //req = {body:{
    req1 = {
      _id: new ObjectID(),
      app_id: "kja3i92i1",
      name: "name of the schedule1",
      schedule: {
        time: "December 17, 2017 03:24:00",
      },
      pushData: {
        msg: "hello there !"
      }
    };

    Schedule.remove({}).then(()=>{
      return Schedule.create(req1);
    }).then(()=>{
      done();

    }).catch((e) => done(e));


  });


  it("should delete the passed record from db",(done)=>{
    id = req1._id.toString();

    chai.request("http://localhost:8088/")
    .delete('schedule/'+ id )
    .end((err , res)=>{
      expect(res).to.have.status(200);
      expect(res.body).to.have.include({_id: id});

      Schedule.findById(id).then((todo) => {

        expect(todo).to.be.null;

        done();
      }).catch((e) => done(e));
    });



  });


});


describe("/Patch update the record", ()=>{

  beforeEach((done)=>{

    //req = {body:{
    req1 = {
      _id: new ObjectID(),
      app_id: "kja3i92i1",
      name: "name of the schedule1",
      schedule: {
        time: "December 17, 2017 03:24:00",
      },
      pushData: {
        msg: "hello there !"
      }
    };

    Schedule.remove({}).then(()=>{
      return Schedule.create(req1);
    }).then(()=>{
      done();

    }).catch((e) => done(e));


  });


  it("should update the passed record in db",(done)=>{
    id = req1._id.toString();

    chai.request("http://localhost:8088/")
    .patch('schedule/'+ id )
    .send({name: "updated schedule",})
    .end((err , res)=>{
      expect(res).to.have.status(200);
      expect(res.body).to.have.include({name: "updated schedule"});
      done();
    });



  });


});