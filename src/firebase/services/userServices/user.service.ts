import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { User } from "@/store/userStore";
import { updateDailyActivity } from "@/firebase/services/analytics/dailyActivity.service";
import { updateUsersAnalytics } from "@/firebase/services/analytics/usersAnalytics.service";

// Create or update a user in Firestore
export const createUserInFirestore = async (user: User) => {
  try {
    const userRef = doc(db, "users", user.id);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // Create new user document in Firestore
      await setDoc(userRef, {
        name: user.name,
        email: user.email,
        photoURL: user.photoURL || "",
        joinedAt: serverTimestamp(),
        roles: user.roles || ["user"],
        location: user.location || "", // Default to empty string
        personalLinks: user.personalLinks || [], // Default to empty array
        noOfContributions: user.noOfContributions || 0, // Default to 0
        contributions: user.contributions || [], // Default to empty array
        bookmarks: user.bookmarks || [], // Default to empty array
      });
      console.log("User created successfully in Firestore.");

      // Log this action in daily activity
      await updateDailyActivity();
      await updateUsersAnalytics();
    } else {
      console.log("User already exists in Firestore.");
    }
  } catch (error) {
    console.error("Error creating user in Firestore:", error);
    throw error;
  }
};

// Fetch user data from Firestore
export const getUserFromFirestore = async (userId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      // Ensure the returned data is typed as User and include userId
      return { ...userDoc.data(), id: userId } as User & { id: string };
    } else {
      console.error("No user found with ID: ", userId);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data from Firestore: ", error);
    return null;
  }
};

