import React, { useState } from "react";
import PropTypes from "prop-types";
import Content from "./components/layout/Content";
import Header from "./components/layout/Header";
import store from "./redux/store";
import { Provider } from "react-redux";

function App({ darkModeDefault = false }) {
  const [darkMode, setDarkMode] = useState(darkModeDefault);

  return (
    <Provider store={store}>
      <main
        data-testid="application"
        className={darkMode ? "darkmode" : undefined}
      >
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Content />
      </main>
    </Provider>
  );
}

App.propTypes = {
  darkModeDefault: PropTypes.bool,
};

export default App;
