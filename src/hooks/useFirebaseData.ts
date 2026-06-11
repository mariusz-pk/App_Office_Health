import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../components/AuthProvider';
import { handleFirestoreError, OperationType } from '../firebaseErrors';

export function useFirebaseCollection<T extends { id?: string }>(collectionName: string) {
  const { user } = useAuth();
  
  const getLocal = (): T[] => {
    try {
      const item = window.localStorage.getItem(`corp_${collectionName}`);
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  };

  const [data, setData] = useState<T[]>(getLocal());

  useEffect(() => {
    if (!user) {
      setData(getLocal());
      return;
    }
    const path = `users/${user.uid}/${collectionName}`;
    const unsubscribe = onSnapshot(collection(db, path), (snapshot) => {
      const result: T[] = [];
      snapshot.forEach(docSnap => {
        result.push({ ...docSnap.data(), id: docSnap.id } as unknown as T);
      });
      setData(result);
      window.localStorage.setItem(`corp_${collectionName}`, JSON.stringify(result));
    }, (error) => handleFirestoreError(error, OperationType.LIST, path));
    
    return () => unsubscribe();
  }, [user, collectionName]);

  const addOrUpdateDoc = async (id: string, value: any) => {
    const updatedData = [...data];
    const index = updatedData.findIndex(item => item.id === id);
    if (index >= 0) {
      updatedData[index] = { ...value, id };
    } else {
      updatedData.push({ ...value, id });
    }
    setData(updatedData);
    window.localStorage.setItem(`corp_${collectionName}`, JSON.stringify(updatedData));

    if (user) {
      const path = `users/${user.uid}/${collectionName}`;
      try {
        await setDoc(doc(db, path, id), { ...value, userId: user.uid });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `${path}/${id}`);
      }
    }
  };

  const removeDoc = async (id: string) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
    window.localStorage.setItem(`corp_${collectionName}`, JSON.stringify(updatedData));

    if (user) {
      const path = `users/${user.uid}/${collectionName}`;
      try {
        await deleteDoc(doc(db, path, id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `${path}/${id}`);
      }
    }
  }

  return { data, addOrUpdateDoc, removeDoc };
}

export function useFirebaseDoc<T>(collectionName: string, docId: string, initialData: T) {
  const { user } = useAuth();
  
  const getLocal = (): T => {
    try {
      const item = window.localStorage.getItem(`corp_${collectionName}_${docId}`);
      return item ? JSON.parse(item) : initialData;
    } catch {
      return initialData;
    }
  };

  const [data, setData] = useState<T>(getLocal());

  useEffect(() => {
    if (!user) {
      setData(getLocal());
      return;
    }
    const path = `users/${user.uid}/${collectionName}`;
    const unsubscribe = onSnapshot(doc(db, path, docId), (docSnap) => {
      if (docSnap.exists()) {
        const newData = docSnap.data() as T;
        setData(newData);
        window.localStorage.setItem(`corp_${collectionName}_${docId}`, JSON.stringify(newData));
      } else {
        setData(initialData);
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, `${path}/${docId}`));
    return unsubscribe;
  }, [user, collectionName, docId]);

  const updateDoc = async (value: Partial<T>) => {
    const newData = { ...data, ...value };
    setData(newData);
    window.localStorage.setItem(`corp_${collectionName}_${docId}`, JSON.stringify(newData));

    if (user) {
      const path = `users/${user.uid}/${collectionName}`;
      try {
        await setDoc(doc(db, path, docId), { ...newData, userId: user.uid }, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `${path}/${docId}`);
      }
    }
  };

  return { data, updateDoc };
}
