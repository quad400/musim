import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { fontSize, spacing } from '@/constants/sizes'
import { colors } from '@/constants/color'
import { defaultStyles } from '@/constants/styles'
import { fonts } from '@/constants/fonts'
import { usePlaylist } from '@/hooks/usePlaylist'
import { toast } from 'sonner-native';
import { router } from 'expo-router'

const NewPlaylist = () => {

  const { createPlaylist } = usePlaylist()

  const [value, setValue] = useState("")

  const handleSubmit = () => {
    if (value.trim() === "") {
      toast.error("Playlist name is required")
      return
    }
    createPlaylist(value)
    setValue("")
    router.back()
    toast.success("Playlist created successfully")
  }

  return (
    <View style={[defaultStyles.container, { padding: spacing.base }]}>
      <TextInput
        autoFocus
        selectionColor={colors.primary}
        autoCapitalize='words'
        autoCorrect={false}
        autoComplete='off'
        value={value}
        onChangeText={setValue}
        style={styles.input}
        placeholder='Playlist Name'
        clearButtonMode='while-editing'
      />
      <TouchableOpacity onPress={handleSubmit} activeOpacity={0.5} style={styles.headerRightContainer}>
        <Text style={styles.headerRightText}>Create Playlist</Text>
      </TouchableOpacity>
    </View>

  )
}

export default NewPlaylist

const styles = StyleSheet.create({

  input: {
    padding: spacing.sm,
    height: 45,
    backgroundColor: colors.backgroundAlt,
    borderRadius: spacing.xs,
    fontSize: fontSize.sm,
    color: colors.text
  },
  headerRightContainer: {
    marginTop: spacing.base,
    height: 45,
    paddingHorizontal: spacing.base,
    borderRadius: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
  },
  headerRightText: {
    color: colors.text,
    fontFamily: fonts.SoraMedium,
    fontSize: fontSize.sm
  }

})