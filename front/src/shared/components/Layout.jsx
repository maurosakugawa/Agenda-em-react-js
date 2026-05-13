// front/src/shared/components/Layout.jsx
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar.jsx';

export function Layout({ usuario, onLogout }) {
    return (
        <div className="app-layout">
            {/* ✅ Navbar sempre visível neste layout */}
            <Navbar usuario={usuario} onLogout={onLogout} />

            <main className="main-content">
                <div className="content-container">
                    {/* ✅ Outlet renderiza a página atual automaticamente */}
                    <Outlet />
                </div>
            </main>
        </div>
    );
}