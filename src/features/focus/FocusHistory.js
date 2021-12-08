import React from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.historySubject(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we've been focused on:</Text>
            <FlatList
              style={styles.history}
              contentContainerStyle={styles.historyItem}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton title="Clear" onPress={clearHistory} size={75} />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'center',
  },
  history: {
    flex: 1,
  },
  historyItem: {
    flex: 1,
    alignItems: 'center',
  },
  historySubject: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: fontSizes.md,
  }),
  title: {
    color: 'white',
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.lg
  },
});
