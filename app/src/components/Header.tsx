import {
  StyleSheet, View, TouchableHighlight
} from 'react-native'
import { useContext } from 'react'
import { Icon } from './Icon'
import { ThemeContext, AppContext } from '../../src/context'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'

export function Header() {
  const { theme } = useContext(ThemeContext)
  const {
    handlePresentModalPress
  } = useContext(AppContext)
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <Icon size={34} fill={theme.textColor} />
      <TouchableHighlight
        style={styles.buttonContainer}
        underlayColor={'transparent'}
        activeOpacity={0.6}
        onPress={handlePresentModalPress}
      >
        <FontAwesome
          name="ellipsis-h"
          size={20}
          color={theme.textColor}
        />
      </TouchableHighlight>
    </View>
  )
}

function getStyles(theme:any) {
  return StyleSheet.create({
    buttonContainer: {
      position: 'absolute', 
      right: 105 + 15,
      padding: 15
    },
    container: {
      paddingLeft: 15,
      paddingVertical: 6,
      backgroundColor: theme.backgroundColor,
      justifyContent: 'center',
      alignItems: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor
    }
  })
}