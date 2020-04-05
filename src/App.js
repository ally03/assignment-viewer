import React from "react";
import { PageHeader } from 'antd';
import AssignmentList from "./pages/AssignmentList";
import "./App.css";

// const arr = [1, 2, 3]
function App() {
    return (
        <div className="App">
            <PageHeader
                className="site-page-header"
                ghost={false}
                title="Loin Heart Acedemy"
            />
            <AssignmentList />
        </div>
    );
}

export default App;
