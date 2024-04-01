// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// // Follow this pattern to import other Firebase services
// // import { } from 'firebase/<service>';

// // TODO: Replace the following with your app's Firebase project configuration

//     const firebaseConfig = {
//         apiKey: "AIzaSyDcyRBTe9VfBn1GhN2LlElNcBE_YqaaCGU",
//         authDomain: "good-flower-e1b9c.firebaseapp.com",
//         projectId: "good-flower-e1b9c",
//         storageBucket: "good-flower-e1b9c.appspot.com",
//         messagingSenderId: "769775312922",
//         appId: "1:769775312922:web:b5fb340f4af21ed7e4b1a3",
//         measurementId: "G-BSV8MK70ZT"
//       };
    


// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }