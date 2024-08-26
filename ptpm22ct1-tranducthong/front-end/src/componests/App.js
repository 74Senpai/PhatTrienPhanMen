
import '../CSS/App.css';

function App() {
  return (
    <div className="app">
      <h1>Hello World!!!</h1>
    </div>
  );
}

// false
// const Home = {
//     menu(){
//       return(
//         <h1>This is Menu</h1>
//       );
//     },
//     home(){
//       return(
//         <h1>Hello This is Home</h1>
//       );
//     }
// }

function Home(){
  return(
      <div>Home</div>
  );  
}

export default App;

export {Home};