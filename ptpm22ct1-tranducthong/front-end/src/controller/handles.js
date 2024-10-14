import Account from '../componests/Login_Sigup_Account/Login.js';
import Home from '../componests/BASE/Home.js';
import Pages from '../componests/BASE/pages.js';
import BlogManage from '../componests/Blog/Blog.js';

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
    
    site = site.toUpperCase();
    // console.log(site);
    switch (site) {
      case "HOME":
        setContents(<Home />);
        todoAction.setActive("HOME"); 
        break;
      case "IT":
        setContents(<Pages />);
        todoAction.setActive(site);
      break;
      case "LOGIN":
        setContents(<Account />);
        todoAction.setActive(site);
        break;
      case "BLOG":
        setContents(<BlogManage />);
        todoAction.setActive(site);
        break;
      default:
        setContents("Default");
    }
}


export default changePages;