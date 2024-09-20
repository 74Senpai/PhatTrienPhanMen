import { SignUp } from '../componests/Login.js';
import { Login } from '../componests/Login.js';
import InformationTechnology from '../componests/pages.js';
import Home from '../componests/Home.js';


function changePages(site, setContents) {
    switch (site) {
      case "home":
        setContents(<Home />);
        break;
      case "Hello":
        // setContents(<Hello />);
        break;
      case "IT":
        setContents(<InformationTechnology />);
        break;
      case "signup":
        setContents(<SignUp />);
        break;
      case "login-form":
        setContents(<Login />);
        break;
      default:
        setContents("Default");
    }
}



export default changePages;