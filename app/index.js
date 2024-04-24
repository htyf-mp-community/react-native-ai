import { AppRegistry } from 'react-native'
import { MiniAppsEnginesProvider } from '@htyf-mp/engines'
import App from './src';

const Root = () => {
  return <MiniAppsEnginesProvider>
    <App />
  </MiniAppsEnginesProvider>
}

AppRegistry.registerComponent('apps', () => Root)
