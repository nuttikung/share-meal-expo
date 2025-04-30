import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

// ----------------------------------------------------------------------

type UseAsyncStorageReturn<T> = {
  state: T;
  canReset: boolean;
  resetState: () => void;
  setState: (updateState: T | Partial<T>) => Promise<void>;
  setField: (name: keyof T, updateValue: T[keyof T]) => void;
};

// ----------------------------------------------------------------------

function useAsyncStorage<T>(
  key: string,
  initialState: T,
): UseAsyncStorageReturn<T> {
  const [state, set] = useState(initialState);
  const multiValue = initialState && typeof initialState === "object";
  // const canReset = !isEqual(state, initialState);
  const canReset = false;

  const setState = async (updateState: T | Partial<T>) => {
    try {
      if (multiValue) {
        set((prevValue) => ({ ...prevValue, ...updateState }));
        // update storage if possible
        await setStorage<T>(key, { ...state, ...updateState });
      } else {
        set(updateState as T);
        await setStorage<T>(key, updateState as T);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setField = async (name: keyof T, updateValue: T[keyof T]) => {
    if (multiValue) {
      await setState({ [name]: updateValue } as Partial<T>);
    }
  };

  const resetState = async () => {
    set(initialState);
    await removeStorage(key);
  };

  useEffect(() => {
    const restoreFromStorage = async () => {
      try {
        const restoredValue = await getStorage<T>(key);
        if (restoredValue === null) {
          return;
        }

        if (multiValue) {
          set((prevValue) => ({ ...prevValue, ...restoredValue }));
        } else {
          set(restoredValue);
        }
      } catch (error) {
        console.error(error);
      }
    };

    restoreFromStorage();
  }, [key, multiValue]);

  return {
    state,
    setState,
    setField,
    resetState,
    canReset,
  };
}

// ----------------------------------------------------------------------

async function getStorage<T>(key: string) {
  try {
    const result = await AsyncStorage.getItem(key);

    if (result) {
      return JSON.parse(result) as T;
    }
  } catch (error) {
    console.error("Error while getting from storage:", error);
  }

  return null;
}

async function setStorage<T>(key: string, value: T) {
  try {
    const serializedValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error while setting storage:", error);
  }
}

async function removeStorage(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error while removing from storage:", error);
  }
}

export { useAsyncStorage };
