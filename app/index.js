import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import { MiniAppsEnginesProvider } from '@htyf-mp/engines'
import App from './src';

const Root = () => {
  return <MiniAppsEnginesProvider>
    <App />
  </MiniAppsEnginesProvider>
}

AppRegistry.registerComponent(appName, () => Root)
