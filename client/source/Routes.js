import { ProductService } from './ProductService';
import { ProductDetail } from './product/ProductDetail';

export const Routes = {
	'': ({upc}) => {
		window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
			requestType: 'scan'
		}));
	}
	, 'cancel': ({upc}) => {
		window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
			requestType: 'scan-cancel'
		}));
	}
	, product: ({upc}) => {
		// const upc = '070600001844';
		// const upc = '052548701154';
		// const upc = '013409517680';
		// const upc = '048001213586';
		// const upc = '070847029090';
		return ProductService.getByUpc(upc)
		.then(product => new ProductDetail(product));
	}

	, cart: 'cart!'
	, list: 'list!'
	, account: 'account!'
	, help: 'help!'
};