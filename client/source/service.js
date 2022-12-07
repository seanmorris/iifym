// import { Service } from 'curvature/service/Service';
// import { RecordDatabase } from 'RecordDatabase';
// import { Record } from 'Record';

// Service.routeHandlers.add({ example: (args, params) => {

// 	const request = params.event.request;
// 	const method  = request.method;
	
// 	return RecordDatabase.open('records', 1).then(database => {

// 		const query = {store:'record-store', index:'id', type:Record, range:args.id, limit: 0};

// 		switch(method)
// 		{
// 			case 'GET':
// 				return database.select(query)
// 				.one(r => JSON.stringify(r, null, 4))
// 				.then(r => r.result || JSON.stringify(null));
			
// 			case 'POST':
// 				return new Promise(accept => request.text()
// 					.then(t => database.insert('record-store', Record.from(JSON.parse(t))))
// 					.then(r => accept(JSON.stringify(r, null, 4)))
// 					.catch(error => {accept(error.target ? error.target.error : error)})
// 				);
			
// 			case 'PUT':
// 				return database.select(query)
// 				.one(r => database.delete('record-store', r))
// 				.then(() => request.text())
// 				.then(t => database.insert('record-store', Record.from(JSON.parse(t))))
// 				.then(r => JSON.stringify(r, null, 4));
			
// 			case 'PATCH':
// 				return database.select(query)
// 				.one(r => request.text().then(t => database.update('record-store', Object.assign(r, JSON.parse(t)))))
// 				.then(r => JSON.stringify(r.result, null, 4));
			
// 			case 'DELETE':
// 				return  database.select(query)
// 				.one(r => database.delete('record-store', r))
// 				.then(r => JSON.stringify(r.result && r.result, null, 4));

// 			default:
// 				return null;
// 		}
// 	});
// }});

// console.log('Initialized service');
