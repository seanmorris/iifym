import { Router } from 'curvature/base/Router';
import { View } from 'curvature/base/View';
import { Pie } from './chart/Pie';
import { ProductDetail } from './product/ProductDetail';

import { Routes } from './Routes';

// import { Service } from 'curvature/service/Service';
// import { RecordDatabase } from 'RecordDatabase';
// import { Uuid } from 'curvature/base/Uuid';

const defaultNav = {
	'/': 'scan-icon.svg'
	// '/cart': 'basket-icon.svg'
	// , '/list': 'list-icon.svg'
	
	// , '/account': 'account-icon.svg'
	// , '/help': 'help-icon.svg' 
};

const layout = View.from(require('./layout/layout.html'), {
	barMargin: 0, nav: defaultNav, defaultNav
});

document.addEventListener('cvRouteEnd', event => {
	requestAnimationFrame(() => {
		if(location.pathname == '/')
		{
			layout.args.nav = {'/cancel': 'x.svg'};
		}
		else
		{
			layout.args.nav = layout.args.defaultNav;
		}
	});
});

document.addEventListener('message', event => {
	const message = JSON.parse(event.data);
	switch(message.type)
	{
		case 'barMargin':
			layout.args.barMargin = message.value;
			break;
	}
});

document.addEventListener('DOMContentLoaded', () => {
	Router.listen(layout, Routes);
	layout.render(document.body);

	// console.log('Initialized app');

	// Service.pageHandlers.add({ handleInstall: event => console.log(event) });
	// Service.register('/service.js').then(() => console.log('registered'));

	// const v1 = View.from('<button cv-on = "click">GET</button>');
	// const v2 = View.from('<button cv-on = "click">POST</button>');
	// const v3 = View.from('<button cv-on = "click">PUT</button>');
	// const v4 = View.from('<button cv-on = "click">PATCH</button>');
	// const v5 = View.from('<button cv-on = "click">DELETE</button>');
	// const vOut = View.from('<pre cv-bind = "output">');

	// const formData = new FormData();

	// formData.append('abc', 123);
	// formData.append('def', 456);

	// const uuid = String(new Uuid);

	// const bodyFormat = id => JSON.stringify({id, created:Date.now()});
	// const urlFormat  = id => `/example?id=${id}`

	// const url = urlFormat(uuid);

	// v1.click = event => fetch(url, {method: 'GET'})
	// .then(r => r.text())
	// .then(t => vOut.args.output = t);
	
	// v2.click = event => fetch(url, {method: 'POST', body:bodyFormat(uuid)})
	// .then(r => r.text())
	// .then(t => vOut.args.output = t);
	
	// v3.click = event => fetch(url, {method: 'PUT', body:bodyFormat(uuid)})
	// .then(r => r.text())
	// .then(t => vOut.args.output = t);
	
	// v4.click = event => fetch(url, {method: 'PATCH', body:JSON.stringify({updated:Date.now()})})
	// .then(r => r.text())
	// .then(t => vOut.args.output = t);
	
	// v5.click = event => fetch(url, {method: 'DELETE'})
	// .then(r => r.text())
	// .then(t => vOut.args.output = t);

	// v1.render(document.body);
	// v2.render(document.body);
	// v3.render(document.body);
	// v4.render(document.body);
	// v5.render(document.body);

	// vOut.render(document.body);

});
