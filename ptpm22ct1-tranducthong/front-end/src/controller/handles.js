import Account, { SignUp, Login } from '../componests/Login.js';
import Home from '../componests/Home.js';
import Pages from '../componests/pages.js';

export const todoAction = {
  currentSite: "home",
  mainSite : "",
  setActive(id_Name, main = true) {
    const currentElement = document.getElementById(id_Name);
    if(currentElement){
      if (this.currentSite !== id_Name && this.currentSite !== "") {
        this.removeActive(); 
      }
      const classLst = document.getElementById(id_Name).classList;
      classLst.add("active");
      this.currentSite = id_Name;
      if(main){
        this.mainSite = id_Name;
      }
    }
    
  },

  removeActive() {
    const classLst = document.getElementById(this.currentSite).classList;
    classLst.remove("active");
  }
};


function changePages(site, setContents) {
    
    switch (site) {
      case "home":
        setContents(<Home />);
        todoAction.setActive(site); 
        break;
      case "IT":
        setContents(<Pages />);
        todoAction.setActive(site);
      break;
      case "signup":
        setContents(<SignUp />);
        todoAction.setActive(site);
        break;
      case "login-form":
        setContents(<Login />);
        todoAction.setActive(site);
        break;
      case "Login":
        setContents(<Account />);
        todoAction.setActive(site);
        break;
      default:
        setContents("Default");
    }
}


export default changePages;