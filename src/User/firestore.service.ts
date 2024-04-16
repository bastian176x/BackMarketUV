import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirestoreService {
  private firestore: admin.firestore.Firestore;

  constructor() {
    this.firestore = admin.firestore();
  }

  async getUser(userId: string): Promise<any> {
    const userRef = this.firestore.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return null;
    }
    return userDoc.data();
  }

  async createUser(userData: any): Promise<void> {
    const userRef = this.firestore.collection('users').doc();
    await userRef.set(userData);
  }

  // Agrega otras funciones según tus necesidades, como actualizar o eliminar documentos
}
