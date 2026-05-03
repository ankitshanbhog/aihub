import { db } from "./firebase";
import {
  collection, addDoc, getDocs, query,
  where, orderBy, serverTimestamp, updateDoc,
  doc, increment
} from "firebase/firestore";

export type Feedback = {
  toolId: string;
  toolName: string;
  userId: string;
  userName: string;
  rating: number;
  solvedProblem: boolean;
  useCase: string;
  whatWorked: string;
  whatFailed: string;
  createdAt: any;
};

export async function submitFeedback(feedback: Omit<Feedback, "createdAt">) {
  await addDoc(collection(db, "feedback"), {
    ...feedback,
    createdAt: serverTimestamp(),
  });
}

export async function getFeedbackForTool(toolId: string): Promise<Feedback[]> {
  const q = query(
    collection(db, "feedback"),
    where("toolId", "==", toolId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data() as Feedback);
}

export async function getAllFeedback(): Promise<Feedback[]> {
  const snap = await getDocs(collection(db, "feedback"));
  return snap.docs.map(d => d.data() as Feedback);
}