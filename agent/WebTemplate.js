import React from 'react';
import { View, Alert } from 'react-native';
import { StyleSheet  } from 'react-native';

import { WebView } from 'react-native-webview';

import { BarCodeScanner } from 'expo-barcode-scanner';

// WebView.setWebContentsDebuggingEnabled(true);

export default (parent, sourceState) => {
	return <View style={{ flex: 1, backgroundColor: 'black' }}>
		<WebView
			ref={r => parent.webView = r}
			source={sourceState}
			useWebKit={true}
			originWhitelist={['*']}
			mixedContentMode={'always'}
			domStorageEnabled={true}
			javaScriptEnabled={true}
			startInLoadingState={true}

			userAgent={'Web2Native'}

			bounces={false}
			scrollEnabled={false}
			scalesPageToFit={false}

			mediaPlaybackRequiresUserAction={false}
			automaticallyAdjustContentInsets={false}
			keyboardDisplayRequiresUserAction={true}
			webContentsDebuggingEnabled={true}

			style={{backgroundColor: 'transparent', flex: 1}}
			contentContainerStyle={{ flex: 1 }}

			renderError={event=>console.log(event)}
			onLoadStart={event=>parent.handleLoadStart(event)}
			onLoadEnd={event=>parent.handleLoadEnd(event)}
			onMessage={event=>parent.handleMessage(event)}
			/>
		{parent.state.willScan &&
		<BarCodeScanner
        	onBarCodeScanned={parent.scanned ? undefined : (...a) => parent.handleBarCodeScanned(...a)}
        	style={StyleSheet.absoluteFillObject}
      	/>}
		</View>
};
