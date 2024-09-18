import { SignUp } from '../componests/Login.js';
import { Login } from '../componests/Login.js';
import InformationTechnology from '../componests/pages.js';


function changePages(site, setContents) {
    switch (site) {
      case "Home":
        // setContents(<Home />);
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
      case "login":
        setContents(<Login />);
        break;
      default:
        setContents("Default");
    }
}

export default changePages;