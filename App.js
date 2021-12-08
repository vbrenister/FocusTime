import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';

import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/TImer';
import { FocusHistory } from './src/features/focus/FocusHistory';

const STATUSES = {
  COMPLETED: 1,
  CANCELLED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (err) {
      console.error(err);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addFocusHistoryWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { key: String(focusHistory.length + 1), subject, status }]);
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistoryWithStatus(focusSubject, STATUSES.COMPLETED);
            setFocusSubject(null);
          }}
          clearSubjet={() => {
            addFocusHistoryWithStatus(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={styles.focusContainer}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory
            focusHistory={focusHistory}
            onClear={() => setFocusHistory([])}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.xxl,
    backgroundColor: colors.darkBlue,
  },
  focusContainer: {
    flex: 1
  }
});
