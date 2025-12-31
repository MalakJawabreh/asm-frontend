import { Routes, Route } from "react-router-dom";
import Header from "./component/Header/Header.js";
import Hero from "./component/Hero/Hero.js";
import About from "./component/About/About.js";
import Footer from "./component/Footer/Footer.js";
import Services from "./component/Services/Services.js";
import Contact from "./component/Contact/Contact.js";
import PostsPage from "./component/PostsPage/PostsPage.js";
import Admin from "./component/Admin/Admin.js";
import CreatePost from "./component/CreatePost/CreatePost.js";
import Portfolio from "./component/Portfolio/Portfolio.js";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AdminPosts from "./component/Admin/AdminPosts.js";

function ScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      const el = document.getElementById(id);

      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Layout العام مع الهيدر والفوتر */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <ScrollToSection /> {/* مهم جدًا */}
              <Hero />
              <div id="about">
                <About />
              </div>
              <div id="services">
                <Services />
              </div>
              <div id="portfolio">
                <Portfolio />
              </div>
              <div id="contact">
                <Contact />
              </div>
              <Footer />
            </>
          }
        />

        <Route
          path="/posts"
          element={
            <>
              <Header />
              <PostsPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/admin/posts"
          element={
            <>
              <Header />
              <AdminPosts />
            </>
          }
        />

        <Route
          path="/admins"
          element={
            <>
              <Header />
              <Admin />
            </>
          }
        />

        <Route
          path="/create-post"
          element={
            <>
              <Header />
              <CreatePost />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
