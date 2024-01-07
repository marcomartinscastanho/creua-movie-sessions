import { db } from "../../common/api/firebase/firebase";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { PersonDetails } from "../tmdb/tmdb";

type PooledDirector = {
  country: string;
  decade: number;
  name: string;
};

// Save director info
export const saveLastDirectorDetails = (director: PersonDetails) => {
  const lastDirectorDetails = {
    name: director.name,
    country: director.country,
    decade: director.decade,
    date: new Date(),
  };

  addDoc(collection(db, "directors-pooled"), lastDirectorDetails)
    .then((ref) => console.log("Status stored with ref: ", ref.id))
    .catch((e) => console.error("Error adding document: ", e));
};

// Retrieve director info
export const getLastDirectorDetails = async (): Promise<PooledDirector | undefined> => {
  return getDocs(query(collection(db, "directors-pooled"), orderBy("date", "desc"))).then((qs) => {
    if (qs.empty) {
      return undefined;
    }
    return qs.docs[0].data() as PooledDirector;
  });
};
