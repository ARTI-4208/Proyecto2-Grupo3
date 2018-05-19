//agrupacion por año:

var s1 = [{"$group": {"_id":{$year: "$date"}, "avg" : {"$avg" : "$value"}, "max" : {"$max" : "$value"}, "min" : {"$min" : "$value"}}}, {"$sort": {"_id":1} }];
db.temperature.aggregate(s1);


{ "_id" : 2016, "avg" : 44.027060569313015, "max" : 95.15674817375839, "min" : 1.8950575729832053 }
{ "_id" : 2017, "avg" : 33.81065154348367, "max" : 89.40459159202874, "min" : 6.565410364419222 }


//agrupacion por año-mes

var s1 = [{"$group": {"_id":{year: {$year: "$date"}, month:{$month:"$date"}}, "avg" : {"$avg" : "$value"}, "max" : {"$max" : "$value"}, "min" : {"$min" : "$value"}}}, {"$sort": {"_id.year":1,"_id.month":1} }];
db.temperature.aggregate(s1);

{ "_id" : { "year" : 2015, "month" : 12 }, "avg" : 40.51880914485082, "max" : 63.364269281737506, "min" : 17.673349007964134 }
{ "_id" : { "year" : 2016, "month" : 3 }, "avg" : 26.565074167835217, "max" : 69.36027074698359, "min" : 3.3144409768283367 }


//agrupacion por año-mes-dia


var s1 = [{"$group": {"_id":{year: {$year: "$date"}, month:{$month:"$date"}, day:{$dayOfMonth:"$date"}}, "avg" : {"$avg" : "$value"}, "max" : {"$max" : "$value"}, "min" : {"$min" : "$value"}}}, {"$sort": {"_id.year":1,"_id.month":1, "_id.day":1} }];
db.temperature.aggregate(s1);



{ "_id" : { "year" : 2014, "month" : 12, "day" : 6 }, "avg" : 34.31565440259874, "max" : 34.31565440259874, "min" : 34.31565440259874 }
{ "_id" : { "year" : 2014, "month" : 12, "day" : 25 }, "avg" : 56.72227113973349, "max" : 56.72227113973349, "min" : 56.72227113973349 }
