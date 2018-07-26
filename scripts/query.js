use local


//db.collection01.find ( {tag:{$type: 1}, tag:21 })
//db.collection01.find ( {tag:{$exists: true})


//db.stats()

//db.collection01.find ( {name : {$regex:"S"} } )


//OR
//db.collection01.find ( { $or : [  {name : {$regex:"S"}}  ] } )
//db.collection01.find ( {$or : [  {name : {$regex:"S"}} , {tag: {$gte:98}}, {tag: 69} ]})
    
//AND    
//db.collection01.find ( {$and : [  {name : {$regex:"S"}} , {age: 21} ]})
//db.collection01.find ( {name : {$regex:"S"} , age: 21} )

//SearchArray
// db.collection01.update({name:"Human01"}, {$set:{talents: ["read", "think", "hunt", "learn"]}})
// db.collection01.find({talents:"read"})

//$all searches presence of elements searched 
//$in, documents with a value in the set


//more examples
//insert 1 million documents
> y=0;while(y<1000000){y++;db.test.insert({_id : y , name: "Robot_"+y})}

//insert in second collection
> db.sector.insert ({link2Robot: 41, Sector:"Nova"})
WriteResult({ "nInserted" : 1 })
> db.sector.insert ({link2Robot: 42, Sector:"Nova"})
WriteResult({ "nInserted" : 1 })
> db.sector.insert ({link2Robot: 43, Sector:"Nova"})

//link from collection 2 to collection 1, a join
//with for each
> db.sector.find().forEach ( function(thisDoc) { name=db.test.findOne({_id:thisDoc.link2Robot}); print(thisDoc.link2Robot + " has name " + name.name); } )
//with iterator
r=db.sector.find();null;while (r.hasNext()){x=r.next().link2Robot ; print (x);result=db.test.findOne({_id:x}); print (result.name)}

//aggregate example
> db.test.aggregate ([ 
{$match : {_id : {$lt : 300 }, quality : {$exists : true } }} ,
{ $sort : {_id : -1 } } , 
{$group : { _id: "$quality" , total : {$sum : "$amount" } } } , 
{$sort : {_id : 1 } }  
])

//aggregate lookup example
> db.sector.aggregate([ 
{$lookup :  { 
	from:"test", 
	localField: "link2Robot", 
	foreignField: "_id", 
	as : "name_info" }}
 ])

//aggregate lookup and unwind example
 db.sector.aggregate([ 
{$lookup :  { 
	from:"test", 
	localField: "link2Robot", 
	foreignField: "_id", 
	as : "name_info" }},
{$unwind : "$name_info" }
 ])

//export example
mongoexport --port 27018 -d test -c names --out test.names.json

  mongoimport -v --port 27018 -d test -c namesrestored  test.names.json
