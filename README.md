schedule a Notification

POST /schedule

	JSON Parameters:

		appID 	  	 => appication id
		name 		     => string
		scheduleTime => time the notification will be sent , in UTC.
		data 	    	 => push object you want to send

	Response Codes:

		200 => The response body will contain the schedule that was created.
		400 => The request body was invalid, most likely due to malformed JSON Or duplicate error.

	Example Request:

		POST /schedule
		Content-Type: application/json;

		{
			"appID":"kja3i92i",
			"name": "alert sport game",
			"scheduleTime": "December 17, 2017 03:24:00",
			"data": {
				"msg": "hello there !"
			}
		}


	Example Response:
		200 OK
		Content-Type: application/json;


		{
		  "__v": 0,
		  "app_id": "kja3i92i",
		  "name": "alert sport game",
		  "_id": "599417eba77b8617d0d9350b",
		  "sent": false,
		  "pushData": {
		    "msg": "hello there !"
		  },
		  "schedule": {
		    "time": "2017-12-17T01:24:00.000Z"
		  }
		}
List all schedules

GET /schedule

Example Request:
	GET /schedule
	Content-Type: application/json;

Response Codes:

	200 => The response body will contain array of all schedules listed.
	404 => Not found any schedules.


Example Response:

	200 OK
	Content-Type: application/json;

		[
		  {
		    "_id": "5992c4db733ee520607e67b5",
		    "app_id": "kja3i92i82486452",
		    "name": "first schedule name",
		    "__v": 0,
		    "sent": false,
		    "pushData": {
		      "msg": "hello there !"
		    },
		    "schedule": {
		      "time": "2017-12-17T01:24:00.000Z"
		    }
		  },
		  {
		    "_id": "5992d3a125a66e2110c2163d",
		    "app_id": "kja3i92i5487956",
		    "name": "second schedule name ",
		    "__v": 0,
		    "sent": false,
		    "pushData": {
		      "msg": "hello there !"
		    },
		    "schedule": {
		      "time": "2017-12-17T01:24:00.000Z"
		    }
		  }
		]
List a Specific schedule

GET /schedule/:id

Query Parameters:

	id => string required to get the schedule

Example Request:

	GET /schedule/:id
	Content-Type: application/json;

Response Codes:

	200 => The response body will contain schedule object.
	404 => couldn't find a schedule.
	400 => invalid ID.


Example Response:

	200 OK
	Content-Type: application/json;

		
		  {
		    "_id": "5992c4db733ee520607e67b5",
		    "app_id": "kja3i92i82486452",
		    "name": "sports game schedule",
		    "__v": 0,
		    "sent": false,
		    "pushData": {
		      "msg": "hello there !"
		    },
		    "schedule": {
		      "time": "2017-12-17T01:24:00.000Z"
		    }
		  }
Update Schedule

PATCH /schedule/:id

Query Parameters:

	id => string required to get the schedule


Response Codes:

	200 => The response body will contain schedule object of the update record.
	404 => couldn't find a schedule.
	400 => invalid ID.


Example Request:

		PATCH /schedule/:id
		Content-Type: application/json;

		{
			"appID":"kja3i92i",
			"name": "alert TVShow",
			"scheduleTime": "December 17, 2017 03:24:00",
			"data": {
				"msg": "TV Time"
			}
		}


	Example Response:
		200 OK
		Content-Type: application/json;


		{
		  "__v": 0,
		  "app_id": "kja3i92i",
		  "name": "alert TVShow",
		  "_id": "599417eba77b8617d0d9350b",
		  "sent": false,
		  "pushData": {
		    "msg": "TV Time"
		  },
		  "schedule": {
		    "time": "2017-12-17T01:24:00.000Z"
		  }
		}
Delete Schedule

DELETE /schedule/:id

Query Parameters:

	id => string required to delete the schedule


Response Codes:

	200 => The response body will contain schedule object of the update record.
	404 => couldn't find a schedule.
	400 => invalid ID.


Example Request:

		DELETE /schedule/:id
		Content-Type: application/json;


	Example Response:
		200 OK
		Content-Type: application/json;


		{
		  "__v": 0,
		  "app_id": "kja3i92i",
		  "name": "alert TVShow",
		  "_id": "599417eba77b8617d0d9350b",
		  "sent": false,
		  "pushData": {
		    "msg": "TV Time"
		  },
		  "schedule": {
		    "time": "2017-12-17T01:24:00.000Z"
		  }
		}
