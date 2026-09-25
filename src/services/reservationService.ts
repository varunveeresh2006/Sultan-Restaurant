import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreErrors';
import { StoredReservation } from '../types/auth';

const COLLECTION_NAME = 'reservations';

export interface PublicReservationInput {
  name: string;
  phone: string;
  people: number;
  date: string;
  time: string;
  type: 'dine-in' | 'bulk-party' | 'takeaway';
  specialRequests?: string;
}

/**
 * Public-facing submission: regular customers can securely insert reservations
 * into the database without requiring any login!
 */
export async function createPublicReservation(
  reservationId: string,
  input: PublicReservationInput
): Promise<void> {
  const path = `${COLLECTION_NAME}/${reservationId}`;
  try {
    const docRef = doc(db, COLLECTION_NAME, reservationId);
    await setDoc(docRef, {
      name: input.name.trim(),
      phone: input.phone.trim(),
      people: Number(input.people),
      date: input.date,
      time: input.time,
      type: input.type,
      status: 'pending',
      specialRequests: input.specialRequests ? input.specialRequests.trim() : '',
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Admin-only realtime subscription: Listens to all customer bookings.
 */
export function subscribeReservations(
  onData: (reservations: StoredReservation[]) => void,
  onError?: (err: Error) => void
): () => void {
  const path = COLLECTION_NAME;

  // Only subscribe if an authenticated user session is active
  if (!auth.currentUser) {
    const err = new Error('Admin session not active in Firebase Auth.');
    if (onError) onError(err);
    return () => {};
  }

  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));

    return onSnapshot(
      q,
      (snapshot) => {
        const list: StoredReservation[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          let createdAtStr = 'Just now';
          if (data.createdAt?.toDate) {
            createdAtStr = data.createdAt.toDate().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              month: 'short',
              day: 'numeric',
            });
          }
          list.push({
            id: docSnap.id,
            name: data.name || '',
            phone: data.phone || '',
            people: data.people || 1,
            date: data.date || '',
            time: data.time || '',
            type: data.type || 'dine-in',
            status: data.status || 'pending',
            specialRequests: data.specialRequests || '',
            createdAt: createdAtStr,
          });
        });
        onData(list);
      },
      (error) => {
        console.warn('Firestore subscription notice:', error.message);
        if (onError) onError(error);
      }
    );
  } catch (error) {
    console.warn('Firestore query setup notice:', error);
    if (onError && error instanceof Error) onError(error);
    return () => {};
  }
}

/**
 * Admin-only status update (pending -> confirmed -> completed -> cancelled)
 */
export async function updateReservationStatus(
  reservationId: string,
  newStatus: StoredReservation['status']
): Promise<void> {
  const path = `${COLLECTION_NAME}/${reservationId}`;
  try {
    const docRef = doc(db, COLLECTION_NAME, reservationId);
    await updateDoc(docRef, {
      status: newStatus,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Admin-only delete
 */
export async function deleteReservation(reservationId: string): Promise<void> {
  const path = `${COLLECTION_NAME}/${reservationId}`;
  try {
    const docRef = doc(db, COLLECTION_NAME, reservationId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
